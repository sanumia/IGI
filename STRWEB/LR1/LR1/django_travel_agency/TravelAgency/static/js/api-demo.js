
class APIDemo {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        this.init();
    }

    init() {
        this.createSections();
    }

    createSections() {
        // Геолокация
        this.createGeolocationSection();
        
        // Синтез речи
        this.createSpeechSynthesisSection();
        
        // Батарея
        this.createBatterySection();

    }

    createGeolocationSection() {
        const section = document.createElement('div');
        section.className = 'api-section';
        section.style.cssText = 'margin-bottom: 30px; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);';

        section.innerHTML = `
            <h3 style="margin-top: 0; color: #667eea;"> Геолокация API</h3>
            <p>Получить ваше текущее местоположение</p>
            <button id="getLocationBtn" 
                    style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">
                Получить местоположение
            </button>
            <div id="locationResult" style="margin-top: 15px; padding: 15px; background: #f8f9fa; border-radius: 4px; display: none;"></div>
        `;

        this.container.appendChild(section);

        const btn = section.querySelector('#getLocationBtn');
        const resultDiv = section.querySelector('#locationResult');

        btn.addEventListener('click', () => {
            if (navigator.geolocation) {
                btn.disabled = true;
                btn.textContent = 'Загрузка...';
                resultDiv.style.display = 'block';
                resultDiv.innerHTML = '<p>Определение местоположения...</p>';

                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        const accuracy = position.coords.accuracy;

                        resultDiv.innerHTML = `
                            <h4>Ваше местоположение:</h4>
                            <p><strong>Широта:</strong> ${lat.toFixed(6)}°</p>
                            <p><strong>Долгота:</strong> ${lon.toFixed(6)}°</p>
                            <p><strong>Точность:</strong> ±${Math.round(accuracy)} метров</p>
                            <p><a href="https://www.google.com/maps?q=${lat},${lon}" target="_blank" 
                                  style="color: #667eea; text-decoration: underline;">
                                Открыть в Google Maps
                            </a></p>
                        `;
                        btn.disabled = false;
                        btn.textContent = 'Получить местоположение';
                    },
                    (error) => {
                        resultDiv.innerHTML = `
                            <p style="color: #ef4444;">Ошибка: ${this.getGeolocationError(error)}</p>
                        `;
                        btn.disabled = false;
                        btn.textContent = 'Получить местоположение';
                    }
                );
            } else {
                resultDiv.style.display = 'block';
                resultDiv.innerHTML = '<p style="color: #ef4444;">Геолокация не поддерживается вашим браузером</p>';
            }
        });
    }

    getGeolocationError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                return "Пользователь отклонил запрос на геолокацию";
            case error.POSITION_UNAVAILABLE:
                return "Информация о местоположении недоступна";
            case error.TIMEOUT:
                return "Время ожидания запроса истекло";
            default:
                return "Произошла неизвестная ошибка";
        }
    }

    createSpeechSynthesisSection() {
        const section = document.createElement('div');
        section.className = 'api-section';
        section.style.cssText = 'margin-bottom: 30px; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);';

        section.innerHTML = `
            <h3 style="margin-top: 0; color: #667eea;"> Синтез речи API</h3>
            <p>Преобразование текста в речь</p>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Текст для озвучивания:</label>
                <textarea id="speechText" rows="3" 
                          style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;"
                          placeholder="Введите текст...">Добро пожаловать на сайт TravelDream!</textarea>
            </div>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Голос:</label>
                <select id="voiceSelect" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;"></select>
            </div>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Скорость:</label>
                <input type="range" id="rateRange" min="0.5" max="2" step="0.1" value="1" 
                       style="width: 100%;">
                <span id="rateValue">1.0</span>
            </div>
            <button id="speakBtn" 
                    style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">
                Озвучить
            </button>
            <button id="stopSpeakBtn" 
                    style="padding: 10px 20px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Остановить
            </button>
        `;

        this.container.appendChild(section);

        // Заполняем список голосов
        this.populateVoices(section.querySelector('#voiceSelect'));

        const speakBtn = section.querySelector('#speakBtn');
        const stopBtn = section.querySelector('#stopSpeakBtn');
        const rateRange = section.querySelector('#rateRange');
        const rateValue = section.querySelector('#rateValue');

        rateRange.addEventListener('input', (e) => {
            rateValue.textContent = e.target.value;
        });

        speakBtn.addEventListener('click', () => {
            const text = section.querySelector('#speechText').value;
            const voiceSelect = section.querySelector('#voiceSelect');
            const selectedVoice = voiceSelect.options[voiceSelect.selectedIndex].value;
            const rate = parseFloat(rateRange.value);

            if (text && 'speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(text);
                const voices = speechSynthesis.getVoices();
                const voice = voices.find(v => v.name === selectedVoice);
                if (voice) {
                    utterance.voice = voice;
                }
                utterance.rate = rate;
                utterance.lang = 'ru-RU';

                speechSynthesis.speak(utterance);
            } else {
                alert('Синтез речи не поддерживается вашим браузером');
            }
        });

        stopBtn.addEventListener('click', () => {
            if ('speechSynthesis' in window) {
                speechSynthesis.cancel();
            }
        });
    }

    populateVoices(select) {
        if ('speechSynthesis' in window) {
            const populate = () => {
                const voices = speechSynthesis.getVoices();
                select.innerHTML = '';
                voices.forEach(voice => {
                    const option = document.createElement('option');
                    option.value = voice.name;
                    option.textContent = `${voice.name} (${voice.lang})`;
                    select.appendChild(option);
                });
            };

            populate();
            speechSynthesis.onvoiceschanged = populate;
        }
    }

    createBatterySection() {
        const section = document.createElement('div');
        section.className = 'api-section';
        section.style.cssText = 'margin-bottom: 30px; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);';

        section.innerHTML = `
            <h3 style="margin-top: 0; color: #667eea;"> Battery API</h3>
            <p>Информация о батарее устройства</p>
            <button id="getBatteryBtn" 
                    style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Получить информацию о батарее
            </button>
            <div id="batteryResult" style="margin-top: 15px; padding: 15px; background: #f8f9fa; border-radius: 4px; display: none;"></div>
        `;

        this.container.appendChild(section);

        const btn = section.querySelector('#getBatteryBtn');
        const resultDiv = section.querySelector('#batteryResult');

        btn.addEventListener('click', async () => {
            if ('getBattery' in navigator || 'battery' in navigator) {
                try {
                    const battery = await (navigator.getBattery ? navigator.getBattery() : navigator.battery);
                    
                    const level = (battery.level * 100).toFixed(1);
                    const charging = battery.charging ? 'Да' : 'Нет';
                    const chargingTime = battery.chargingTime === Infinity ? 'Неизвестно' : `${Math.round(battery.chargingTime / 60)} минут`;
                    const dischargingTime = battery.dischargingTime === Infinity ? 'Неизвестно' : `${Math.round(battery.dischargingTime / 60)} минут`;

                    resultDiv.style.display = 'block';
                    resultDiv.innerHTML = `
                        <h4>Информация о батарее:</h4>
                        <p><strong>Уровень заряда:</strong> ${level}%</p>
                        <div style="width: 100%; background: #e5e7eb; border-radius: 4px; height: 20px; margin: 10px 0;">
                            <div style="width: ${level}%; background: ${level > 50 ? '#10b981' : level > 20 ? '#f59e0b' : '#ef4444'}; height: 100%; border-radius: 4px; transition: width 0.3s;"></div>
                        </div>
                        <p><strong>Заряжается:</strong> ${charging}</p>
                        <p><strong>Время до полной зарядки:</strong> ${chargingTime}</p>
                        <p><strong>Время до разрядки:</strong> ${dischargingTime}</p>
                    `;

                    // Обновляем информацию при изменении
                    battery.addEventListener('chargingchange', () => {
                        btn.click();
                    });
                    battery.addEventListener('levelchange', () => {
                        btn.click();
                    });
                } catch (error) {
                    resultDiv.style.display = 'block';
                    resultDiv.innerHTML = `<p style="color: #ef4444;">Ошибка: ${error.message}</p>`;
                }
            } else {
                resultDiv.style.display = 'block';
                resultDiv.innerHTML = '<p style="color: #ef4444;">Battery API не поддерживается вашим браузером</p>';
            }
        });
    }

}

