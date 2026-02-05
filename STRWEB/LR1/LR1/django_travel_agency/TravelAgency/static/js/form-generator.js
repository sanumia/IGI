class FormElementGenerator {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`Container with id "${containerId}" not found`);
        }

        this.generatedElements = [];
        this.loadFromStorage();

        this.init();
    }

    init() {
        this.createControls();
        this.renderElements();
    }

    createControls() {
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'form-generator-controls';
        controlsDiv.style.cssText = 'margin-bottom: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px;';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'enableGenerator';
        checkbox.style.cssText = 'margin-right: 10px;';

        const label = document.createElement('label');
        label.htmlFor = 'enableGenerator';
        label.textContent = 'Включить генератор элементов формы';
        label.style.cssText = 'font-weight: bold; cursor: pointer;';

        controlsDiv.appendChild(checkbox);
        controlsDiv.appendChild(label);

        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                this.showGeneratorForm();
            } else {
                this.hideGeneratorForm();
            }
        });

        this.container.appendChild(controlsDiv);
    }

    showGeneratorForm() {
        const oldForm = this.container.querySelector('.generator-form');
        if (oldForm) {
            oldForm.remove();
        }

        const formDiv = document.createElement('div');
        formDiv.className = 'generator-form';
        formDiv.style.cssText = 'margin-bottom: 20px; padding: 20px; background: white; border: 2px solid #667eea; border-radius: 8px;';

        formDiv.innerHTML = `
            <h3>Генератор элементов формы</h3>
            <form id="elementGeneratorForm">
                <div style="margin-bottom: 15px;">
                    <label>Тип элемента:
                        <select name="elementType" id="elementType" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                            <option value="input">Input</option>
                            <option value="input-range">Input Range (Слайдер)</option>
                            <option value="textarea">Textarea</option>
                            <option value="select">Select</option>
                            <option value="button">Button</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="radio">Radio</option>
                        </select>
                    </label>
                </div>
                <div id="attributesContainer"></div>
                <div style="display: flex; gap: 10px; margin-top: 15px;">
                    <button type="submit" style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Добавить элемент</button>
                    <button type="button" id="addAttributeBtn" style="padding: 10px 20px; background: #10b981; color: white; border: none; border-radius: 5px; cursor: pointer;">Добавить атрибут</button>
                </div>
            </form>
        `;

        this.container.appendChild(formDiv);

        const elementTypeSelect = formDiv.querySelector('#elementType');
        elementTypeSelect.addEventListener('change', () => {
            this.updateAttributesForm(elementTypeSelect.value);
        });

        this.updateAttributesForm(elementTypeSelect.value);

        formDiv.querySelector('#addAttributeBtn').addEventListener('click', () => {
            this.addAttributeField();
        });

        formDiv.querySelector('#elementGeneratorForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.generateElement(formDiv.querySelector('#elementGeneratorForm'));
        });
    }

    updateAttributesForm(elementType) {
        const container = document.getElementById('attributesContainer');
        container.innerHTML = '';

        const baseAttributes = [
            { name: 'id', label: 'ID', type: 'text' },
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'class', label: 'Class', type: 'text' },
            { name: 'placeholder', label: 'Placeholder', type: 'text' },
            { name: 'value', label: 'Value', type: 'text' }
        ];

        const typeSpecificAttributes = {
            input: [
                { name: 'type', label: 'Type', type: 'select', options: ['text', 'email', 'password', 'number', 'date', 'file'] },
                { name: 'required', label: 'Required', type: 'checkbox' },
                { name: 'disabled', label: 'Disabled', type: 'checkbox' },
                { name: 'readonly', label: 'Readonly', type: 'checkbox' },
                { name: 'min', label: 'Min', type: 'number' },
                { name: 'max', label: 'Max', type: 'number' }
            ],
            'input-range': [
                { name: 'name', label: 'Name', type: 'text', required: true },
                { name: 'min', label: 'Min', type: 'number', required: true },
                { name: 'max', label: 'Max', type: 'number', required: true },
                { name: 'step', label: 'Step', type: 'number' },
                { name: 'value', label: 'Value', type: 'number' },
                { name: 'list', label: 'List (ID datalist)', type: 'text' },
                { name: 'disabled', label: 'Disabled', type: 'checkbox' }
            ],
            textarea: [
                { name: 'rows', label: 'Rows', type: 'number' },
                { name: 'cols', label: 'Cols', type: 'number' },
                { name: 'required', label: 'Required', type: 'checkbox' },
                { name: 'disabled', label: 'Disabled', type: 'checkbox' },
                { name: 'readonly', label: 'Readonly', type: 'checkbox' }
            ],
            select: [
                { name: 'required', label: 'Required', type: 'checkbox' },
                { name: 'disabled', label: 'Disabled', type: 'checkbox' },
                { name: 'multiple', label: 'Multiple', type: 'checkbox' }
            ],
            button: [
                { name: 'type', label: 'Type', type: 'select', options: ['button', 'submit', 'reset'] },
                { name: 'disabled', label: 'Disabled', type: 'checkbox' }
            ],
            checkbox: [
                { name: 'checked', label: 'Checked', type: 'checkbox' },
                { name: 'disabled', label: 'Disabled', type: 'checkbox' }
            ],
            radio: [
                { name: 'checked', label: 'Checked', type: 'checkbox' },
                { name: 'disabled', label: 'Disabled', type: 'checkbox' }
            ]
        };

        const allAttributes = [...baseAttributes, ...(typeSpecificAttributes[elementType] || [])];

        allAttributes.forEach(attr => {
            const attrDiv = this.createAttributeField(attr);
            container.appendChild(attrDiv);
        });
    }

    createAttributeField(attr) {
        const div = document.createElement('div');
        div.className = 'attribute-field';
        div.style.cssText = 'margin-bottom: 10px; display: flex; align-items: center; gap: 10px;';

        const label = document.createElement('label');
        label.textContent = `${attr.label}:`;
        label.style.cssText = 'min-width: 120px;';

        let input;
        if (attr.type === 'checkbox') {
            input = document.createElement('input');
            input.type = 'checkbox';
            input.name = `attr_${attr.name}`;
            input.value = 'true';
        } else if (attr.type === 'select') {
            input = document.createElement('select');
            input.name = `attr_${attr.name}`;
            input.style.cssText = 'flex: 1; padding: 5px; border: 1px solid #ddd; border-radius: 4px;';
            attr.options.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option;
                opt.textContent = option;
                input.appendChild(opt);
            });
        } else {
            input = document.createElement('input');
            input.type = attr.type || 'text';
            input.name = `attr_${attr.name}`;
            input.style.cssText = 'flex: 1; padding: 5px; border: 1px solid #ddd; border-radius: 4px;';
        }

        div.appendChild(label);
        div.appendChild(input);

        return div;
    }

    addAttributeField() {
        const container = document.getElementById('attributesContainer');
        const div = document.createElement('div');
        div.className = 'attribute-field custom-attr';
        div.style.cssText = 'margin-bottom: 10px; display: flex; align-items: center; gap: 10px;';

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Имя атрибута';
        nameInput.style.cssText = 'flex: 1; padding: 5px; border: 1px solid #ddd; border-radius: 4px;';

        const valueInput = document.createElement('input');
        valueInput.type = 'text';
        valueInput.placeholder = 'Значение';
        valueInput.style.cssText = 'flex: 1; padding: 5px; border: 1px solid #ddd; border-radius: 4px;';

        const removeBtn = document.createElement('button');
        removeBtn.textContent = '×';
        removeBtn.type = 'button';
        removeBtn.style.cssText = 'padding: 5px 10px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;';
        removeBtn.addEventListener('click', () => div.remove());

        div.appendChild(nameInput);
        div.appendChild(valueInput);
        div.appendChild(removeBtn);
        container.appendChild(div);
    }

    generateElement(form) {
        const formData = new FormData(form);
        let elementType = formData.get('elementType');

        // Создаем элемент
        let element;
        if (elementType === 'input-range') {
            element = document.createElement('input');
            element.type = 'range';
        } else {
            element = document.createElement(elementType);
        }

        // Собираем атрибуты
        const attributes = {};
        for (const [key, value] of formData.entries()) {
            if (key.startsWith('attr_')) {
                const attrName = key.replace('attr_', '');
                if (value && value !== 'false') {
                    attributes[attrName] = value === 'true' ? true : value;
                }
            }
        }

        // Обрабатываем кастомные атрибуты
        const customAttrs = form.querySelectorAll('.custom-attr');
        customAttrs.forEach(customAttr => {
            const nameInput = customAttr.querySelector('input[placeholder="Имя атрибута"]');
            const valueInput = customAttr.querySelector('input[placeholder="Значение"]');
            if (nameInput.value && valueInput.value) {
                attributes[nameInput.value] = valueInput.value;
            }
        });

        // Устанавливаем атрибуты
        Object.entries(attributes).forEach(([name, value]) => {
            if (value === true) {
                element.setAttribute(name, '');
            } else if (value !== false && value !== '') {
                element.setAttribute(name, value);
            }
        });

        // Для select добавляем опции
        if (elementType === 'select') {
            const option1 = document.createElement('option');
            option1.value = 'option1';
            option1.textContent = 'Опция 1';
            element.appendChild(option1);
            const option2 = document.createElement('option');
            option2.value = 'option2';
            option2.textContent = 'Опция 2';
            element.appendChild(option2);
        }

        // Для button устанавливаем текст
        if (elementType === 'button') {
            element.textContent = attributes.value || 'Кнопка';
        }

        // Для checkbox и radio добавляем label
        let finalElement = element;

        // Для input-range создаем слайдер с отображением значения
        if (elementType === 'input-range') {
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'margin-bottom: 10px;';

            const label = document.createElement('label');
            if (attributes.name) {
                label.textContent = attributes.name + ': ';
                label.style.cssText = 'display: block; margin-bottom: 5px; font-weight: bold;';
                wrapper.appendChild(label);
            }

            const sliderContainer = document.createElement('div');
            sliderContainer.style.cssText = 'display: flex; align-items: center; gap: 10px;';

            element.style.cssText = 'flex: 1;';
            sliderContainer.appendChild(element);

            const valueDisplay = document.createElement('span');
            valueDisplay.className = 'range-value';
            valueDisplay.textContent = attributes.value || attributes.min || '0';
            valueDisplay.style.cssText = 'min-width: 50px; text-align: center; font-weight: bold;';
            sliderContainer.appendChild(valueDisplay);

            // Обновление значения при изменении
            element.addEventListener('input', (e) => {
                valueDisplay.textContent = e.target.value;
            });

            wrapper.appendChild(sliderContainer);

            // Если указан list, создаем datalist
            if (attributes.list) {
                let datalist = document.getElementById(attributes.list);
                if (!datalist) {
                    datalist = document.createElement('datalist');
                    datalist.id = attributes.list;
                    // Добавляем опции в datalist на основе min, max, step
                    const min = parseInt(attributes.min) || 0;
                    const max = parseInt(attributes.max) || 100;
                    const step = parseInt(attributes.step) || 1;
                    for (let i = min; i <= max; i += step) {
                        const option = document.createElement('option');
                        option.value = i;
                        datalist.appendChild(option);
                    }
                    document.body.appendChild(datalist);
                }
                element.setAttribute('list', attributes.list);
            }

            finalElement = wrapper;
        } else if (elementType === 'checkbox' || elementType === 'radio') {
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'margin-bottom: 10px; display: flex; align-items: center; gap: 10px;';
            wrapper.appendChild(element);
            const label = document.createElement('label');
            label.textContent = attributes.name || 'Элемент';
            label.style.cssText = 'cursor: pointer;';
            wrapper.appendChild(label);
            finalElement = wrapper;
        }

        const container = document.createElement('div');
        container.className = 'generated-element';
        container.style.cssText = 'position: relative; margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-radius: 8px; border: 1px solid #ddd;';

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Удалить';
        removeBtn.className = 'remove-element-btn';
        removeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; padding: 5px 10px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;';
        removeBtn.addEventListener('click', () => {
            container.remove();
            this.saveToStorage();
        });

        container.appendChild(finalElement);
        container.appendChild(removeBtn);

        // Добавляем в контейнер для сгенерированных элементов
        let elementsContainer = this.container.querySelector('.generated-elements-container');
        if (!elementsContainer) {
            elementsContainer = document.createElement('div');
            elementsContainer.className = 'generated-elements-container';
            elementsContainer.style.cssText = 'margin-top: 20px;';
            this.container.appendChild(elementsContainer);
        }

        elementsContainer.appendChild(container);

        // Сохраняем элемент (сохраняем после добавления в DOM)
        const elementData = {
            type: elementType === 'input-range' ? 'input-range' : elementType,
            attributes: attributes,
            html: container.innerHTML
        };
        this.generatedElements.push(elementData);
        this.saveToStorage();

        // Очищаем форму
        form.reset();
        this.updateAttributesForm(elementType);
    }

    renderElements() {
        if (this.generatedElements.length === 0) return;

        let elementsContainer = this.container.querySelector('.generated-elements-container');
        if (!elementsContainer) {
            elementsContainer = document.createElement('div');
            elementsContainer.className = 'generated-elements-container';
            elementsContainer.style.cssText = 'margin-top: 20px;';
            this.container.appendChild(elementsContainer);
        }

        this.generatedElements.forEach((elementData, index) => {
            const container = document.createElement('div');
            container.className = 'generated-element';
            container.style.cssText = 'position: relative; margin-bottom: 15px; padding: 15px; background: #f8f9fa; border-radius: 8px; border: 1px solid #ddd;';
            container.innerHTML = elementData.html;

            // Восстанавливаем обработчики событий для input-range
            if (elementData.type === 'input-range') {
                const rangeInput = container.querySelector('input[type="range"]');
                const valueDisplay = container.querySelector('.range-value');
                if (rangeInput && valueDisplay) {
                    rangeInput.addEventListener('input', (e) => {
                        valueDisplay.textContent = e.target.value;
                    });
                }
            }

            const removeBtn = container.querySelector('.remove-element-btn');
            if (removeBtn) {
                removeBtn.addEventListener('click', () => {
                    container.remove();
                    const idx = this.generatedElements.indexOf(elementData);
                    if (idx > -1) {
                        this.generatedElements.splice(idx, 1);
                        this.saveToStorage();
                    }
                });
            }

            elementsContainer.appendChild(container);
        });
    }

    saveToStorage() {
        try {
            localStorage.setItem('formGeneratedElements', JSON.stringify(this.generatedElements));
        } catch (e) {
            console.error('Failed to save elements:', e);
        }
    }

    loadFromStorage() {
        try {
            const saved = localStorage.getItem('formGeneratedElements');
            if (saved) {
                this.generatedElements = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Failed to load elements:', e);
            this.generatedElements = []; //save my forms in array
        }
    }

    hideGeneratorForm() {
        const form = this.container.querySelector('.generator-form');
        if (form) {
            form.remove();
        }
    }
}