/**
 * Проверка даты рождения и возраста
 */
class BirthdateChecker {
    constructor() {
        this.init();
    }

    init() {
        this.createForm();
    }

    createForm() {
        const container = document.getElementById('birthdateCheckerContainer');
        if (!container) return;

        const formDiv = document.createElement('div');
        formDiv.className = 'birthdate-checker';
        formDiv.style.cssText = 'max-width: 500px; margin: 20px auto; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);';

        formDiv.innerHTML = `
            <h2 style="text-align: center; color: #667eea; margin-bottom: 20px;">Проверка возраста</h2>
            <form id="birthdateForm">
                <div style="margin-bottom: 15px;">
                    <label for="birthdate" style="display: block; margin-bottom: 5px; font-weight: bold;">Дата рождения:</label>
                    <input type="date" id="birthdate" name="birthdate" required 
                           style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px;">
                </div>
                <button type="submit" 
                        style="width: 100%; padding: 12px; background: #667eea; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; font-weight: bold;">
                    Проверить
                </button>
            </form>
            <div id="result" style="margin-top: 20px; padding: 15px; border-radius: 4px; display: none;"></div>
        `;

        container.appendChild(formDiv);

        const form = formDiv.querySelector('#birthdateForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.checkAge(form);
        });
    }

    checkAge(form) {
        const birthdateInput = form.querySelector('#birthdate');
        const resultDiv = document.getElementById('result');
        
        const birthdate = new Date(birthdateInput.value);
        const today = new Date();
        
        // Вычисляем возраст
        let age = today.getFullYear() - birthdate.getFullYear();
        const monthDiff = today.getMonth() - birthdate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }

        // Получаем день недели
        const daysOfWeek = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
        const dayOfWeek = daysOfWeek[birthdate.getDay()];

        resultDiv.style.display = 'block';

        if (age >= 18) {
            // Совершеннолетний
            resultDiv.style.background = '#d1fae5';
            resultDiv.style.border = '2px solid #10b981';
            resultDiv.style.color = '#065f46';
            resultDiv.innerHTML = `
                <h3 style="margin-top: 0; color: #10b981;">✓ Вы совершеннолетний</h3>
                <p><strong>Ваш возраст:</strong> ${age} ${this.getAgeWord(age)}</p>
                <p><strong>Дата рождения:</strong> ${birthdate.toLocaleDateString('ru-RU')}</p>
                <p><strong>День недели:</strong> ${dayOfWeek}</p>
                <p style="margin-bottom: 0;">Вы можете использовать сайт без ограничений.</p>
            `;
        } else {
            // Несовершеннолетний
            resultDiv.style.background = '#fee2e2';
            resultDiv.style.border = '2px solid #ef4444';
            resultDiv.style.color = '#991b1b';
            resultDiv.innerHTML = `
                <h3 style="margin-top: 0; color: #ef4444;">⚠ Вы несовершеннолетний</h3>
                <p><strong>Ваш возраст:</strong> ${age} ${this.getAgeWord(age)}</p>
                <p><strong>Дата рождения:</strong> ${birthdate.toLocaleDateString('ru-RU')}</p>
                <p><strong>День недели:</strong> ${dayOfWeek}</p>
            `;
            
            // Показываем алерт
            alert('ВНИМАНИЕ! Вы несовершеннолетний. Для использования сайта необходимо разрешение родителей или законных представителей.');
        }
    }

    getAgeWord(age) {
        const lastDigit = age % 10;
        const lastTwoDigits = age % 100;
        
        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            return 'лет';
        }
        if (lastDigit === 1) {
            return 'год';
        }
        if (lastDigit >= 2 && lastDigit <= 4) {
            return 'года';
        }
        return 'лет';
    }
}

// Инициализация будет выполнена из основного скрипта страницы

