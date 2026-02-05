//base prototype class
function BaseExportGoods(name, country, volume) {
    this.name = name;
    this.country = country;
    this.volume = volume;
    this.id = Date.now() + Math.random();
}


BaseExportGoods.prototype.getName = function() {
    return this.name;
};

BaseExportGoods.prototype.setName = function(name) {
    this.name = name;
};

BaseExportGoods.prototype.getCountry = function() {
    return this.country;
};

BaseExportGoods.prototype.setCountry = function(country) {
    this.country = country;
};

BaseExportGoods.prototype.getVolume = function() {
    return this.volume;
};

BaseExportGoods.prototype.setVolume = function(volume) {
    this.volume = volume;
};

// Метод добавления объекта через форму
BaseExportGoods.prototype.addFromForm = function(formData) {
    this.name = formData.get('name') || '';
    this.country = formData.get('country') || '';
    this.volume = parseInt(formData.get('volume')) || 0;
};

// Метод вывода на страницу
BaseExportGoods.prototype.display = function(container) {
    const div = document.createElement('div');
    div.className = 'export-goods-item';
    div.style.cssText = 'padding: 15px; margin: 10px 0; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #667eea;';
    div.innerHTML = `
        <p><strong>Товар:</strong> ${this.name}</p>
        <p><strong>Страна:</strong> ${this.country}</p>
        <p><strong>Объем:</strong> ${this.volume} шт.</p>
    `;
    container.appendChild(div);
};

// Метод вывода результата
BaseExportGoods.prototype.getResult = function() {
    return {
        name: this.name,
        country: this.country,
        volume: this.volume
    };
};

// child class prototype inheritance
function ExtendedExportGoods(name, country, volume, price, currency) {
    // call constructor of base class
    BaseExportGoods.call(this, name, country, volume);
    this.price = price || 0;
    this.currency = currency || 'USD';
}

// Наследование прототипа
ExtendedExportGoods.prototype = Object.create(BaseExportGoods.prototype);
ExtendedExportGoods.prototype.constructor = ExtendedExportGoods;

// Дополнительные методы
ExtendedExportGoods.prototype.getPrice = function() {
    return this.price;
};

ExtendedExportGoods.prototype.setPrice = function(price) {
    this.price = price;
};

ExtendedExportGoods.prototype.getCurrency = function() {
    return this.currency;
};

ExtendedExportGoods.prototype.setCurrency = function(currency) {
    this.currency = currency;
};

// Переопределяем метод добавления из формы
ExtendedExportGoods.prototype.addFromForm = function(formData) {
    BaseExportGoods.prototype.addFromForm.call(this, formData);
    this.price = parseFloat(formData.get('price')) || 0;
    this.currency = formData.get('currency') || 'USD';
};

// Переопределяем метод вывода
ExtendedExportGoods.prototype.display = function(container) {
    const div = document.createElement('div');
    div.className = 'export-goods-item extended';
    div.style.cssText = 'padding: 15px; margin: 10px 0; background: #e0f2fe; border-radius: 8px; border-left: 4px solid #0ea5e9;';
    div.innerHTML = `
        <p><strong>Товар:</strong> ${this.name}</p>
        <p><strong>Страна:</strong> ${this.country}</p>
        <p><strong>Объем:</strong> ${this.volume} шт.</p>
        <p><strong>Цена:</strong> ${this.price} ${this.currency}</p>
        <p><strong>Общая стоимость:</strong> ${(this.volume * this.price).toFixed(2)} ${this.currency}</p>
    `;
    container.appendChild(div);
};

// Переопределяем метод результата
ExtendedExportGoods.prototype.getResult = function() {
    const baseResult = BaseExportGoods.prototype.getResult.call(this);
    return {
        ...baseResult,
        price: this.price,
        currency: this.currency,
        totalCost: this.volume * this.price
    };
};

//es6 parent class
class BaseExportGoodsClass {
    constructor(name, country, volume) {
        this.name = name;
        this.country = country;
        this.volume = volume;
        this.id = Date.now() + Math.random();
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getCountry() {
        return this.country;
    }

    setCountry(country) {
        this.country = country;
    }

    getVolume() {
        return this.volume;
    }

    setVolume(volume) {
        this.volume = volume;
    }

    addFromForm(formData) {
        this.name = formData.get('name') || '';
        this.country = formData.get('country') || '';
        this.volume = parseInt(formData.get('volume')) || 0;
    }

    display(container) {
        const div = document.createElement('div');
        div.className = 'export-goods-item';
        div.style.cssText = 'padding: 15px; margin: 10px 0; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #667eea;';
        div.innerHTML = `
            <p><strong>Товар:</strong> ${this.name}</p>
            <p><strong>Страна:</strong> ${this.country}</p>
            <p><strong>Объем:</strong> ${this.volume} шт.</p>
        `;
        container.appendChild(div);
    }

    getResult() {
        return {
            name: this.name,
            country: this.country,
            volume: this.volume
        };
    }
}
//es6 child class
class ExtendedExportGoodsClass extends BaseExportGoodsClass {
    constructor(name, country, volume, price, currency) {
        super(name, country, volume);
        this.price = price || 0;
        this.currency = currency || 'USD';
    }

    getPrice() {
        return this.price;
    }

    setPrice(price) {
        this.price = price;
    }

    getCurrency() {
        return this.currency;
    }

    setCurrency(currency) {
        this.currency = currency;
    }

    addFromForm(formData) {
        super.addFromForm(formData);
        this.price = parseFloat(formData.get('price')) || 0;
        this.currency = formData.get('currency') || 'USD';
    }

    display(container) {
        const div = document.createElement('div');
        div.className = 'export-goods-item extended';
        div.style.cssText = 'padding: 15px; margin: 10px 0; background: #e0f2fe; border-radius: 8px; border-left: 4px solid #0ea5e9;';
        div.innerHTML = `
            <p><strong>Товар:</strong> ${this.name}</p>
            <p><strong>Страна:</strong> ${this.country}</p>
            <p><strong>Объем:</strong> ${this.volume} шт.</p>
            <p><strong>Цена:</strong> ${this.price} ${this.currency}</p>
            <p><strong>Общая стоимость:</strong> ${(this.volume * this.price).toFixed(2)} ${this.currency}</p>
        `;
        container.appendChild(div);
    }

    getResult() {
        const baseResult = super.getResult();
        return {
            ...baseResult,
            price: this.price,
            currency: this.currency,
            totalCost: this.volume * this.price
        };
    }
}


class ExportGoodsManager {
    constructor(containerId, useClassSyntax = false) {
        this.container = document.getElementById(containerId);
        this.goods = [];
        this.useClassSyntax = useClassSyntax;
        this.init();
    }

    init() {
        this.createForm();
        this.createResultsSection();
    }

    createForm() {
        const formDiv = document.createElement('div');
        formDiv.className = 'export-goods-form';
        formDiv.style.cssText = 'margin-bottom: 30px; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);';

        formDiv.innerHTML = `
            <h3 style="margin-top: 0;">Добавить товар</h3>
            <form id="exportGoodsForm">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">Наименование товара:</label>
                    <input type="text" name="name" required 
                           style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">Страна:</label>
                    <input type="text" name="country" required 
                           style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">Объем (шт.):</label>
                    <input type="number" name="volume" required min="1"
                           style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">Цена (опционально):</label>
                    <input type="number" name="price" min="0" step="0.01"
                           style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">Валюта:</label>
                    <select name="currency" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="RUB">RUB</option>
                        <option value="BYN">BYN</option>
                    </select>
                </div>
                <div style="margin-bottom: 15px;">
                    <label>
                        <input type="checkbox" name="useExtended" id="useExtended">
                        Использовать расширенный класс
                    </label>
                </div>
                <button type="submit" 
                        style="width: 100%; padding: 12px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                    Добавить товар
                </button>
            </form>
        `;

        this.container.appendChild(formDiv);

        const form = formDiv.querySelector('#exportGoodsForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addGood(form);
        });
    }

    addGood(form) {
        const formData = new FormData(form);
        const useExtended = formData.get('useExtended') === 'on';
        const hasPrice = formData.get('price') && parseFloat(formData.get('price')) > 0;

        let good;
        if (this.useClassSyntax) {
            // Используем классы ES6
            if (useExtended || hasPrice) {
                good = new ExtendedExportGoodsClass(
                    formData.get('name'),
                    formData.get('country'),
                    parseInt(formData.get('volume')),
                    parseFloat(formData.get('price')) || 0,
                    formData.get('currency') || 'USD'
                );
            } else {
                good = new BaseExportGoodsClass(
                    formData.get('name'),
                    formData.get('country'),
                    parseInt(formData.get('volume'))
                );
            }
        } else {
            // Используем прототипное наследование
            if (useExtended || hasPrice) {
                good = new ExtendedExportGoods(
                    formData.get('name'),
                    formData.get('country'),
                    parseInt(formData.get('volume')),
                    parseFloat(formData.get('price')) || 0,
                    formData.get('currency') || 'USD'
                );
            } else {
                good = new BaseExportGoods(
                    formData.get('name'),
                    formData.get('country'),
                    parseInt(formData.get('volume'))
                );
            }
        }

        this.goods.push(good);
        this.displayAll();
        this.calculateResults();
        form.reset();
    }

    displayAll() {
        const displayContainer = this.container.querySelector('.goods-display');
        if (!displayContainer) return;

        displayContainer.innerHTML = '<h3>Все товары:</h3>';
        this.goods.forEach(good => {
            good.display(displayContainer);
        });
    }

    calculateResults() {
        const resultsContainer = this.container.querySelector('.results-display');
        if (!resultsContainer) return;

        // Группируем по товарам
        const goodsByName = {};
        this.goods.forEach(good => {
            const name = good.getName();
            if (!goodsByName[name]) {
                goodsByName[name] = {
                    name: name,
                    countries: new Set(),
                    totalVolume: 0
                };
            }
            goodsByName[name].countries.add(good.getCountry());
            goodsByName[name].totalVolume += good.getVolume();
        });

        resultsContainer.innerHTML = '<h3>Результаты анализа:</h3>';
        Object.values(goodsByName).forEach(data => {
            const div = document.createElement('div');
            div.style.cssText = 'padding: 15px; margin: 10px 0; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;';
            div.innerHTML = `
                <p><strong>Товар:</strong> ${data.name}</p>
                <p><strong>Страны экспорта:</strong> ${Array.from(data.countries).join(', ')}</p>
                <p><strong>Общий объем экспорта:</strong> ${data.totalVolume} шт.</p>
            `;
            resultsContainer.appendChild(div);
        });
    }

    createResultsSection() {
        const displayDiv = document.createElement('div');
        displayDiv.className = 'goods-display';
        displayDiv.style.cssText = 'margin-bottom: 30px; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);';
        this.container.appendChild(displayDiv);

        const resultsDiv = document.createElement('div');
        resultsDiv.className = 'results-display';
        resultsDiv.style.cssText = 'padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);';
        this.container.appendChild(resultsDiv);
    }
}