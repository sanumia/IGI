class ContactsTable {
    constructor(containerId, data = []) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`Container with id "${containerId}" not found`);
        }

        this.data = data;
        this.filteredData = [...data];
        this.sortedColumn = null;
        this.sortDirection = 'asc';
        this.currentPage = 1;
        this.itemsPerPage = 3;
        this.selectedEmployees = new Set();

        this.init();
    }

    init() {
        this.createTable();
        this.createControls();
        this.renderTable();
    }

    createControls() {
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'table-controls';
        controlsDiv.style.cssText = 'margin-bottom: 20px; display: flex; gap: 15px; flex-wrap: wrap; align-items: center;';

        // Кнопка "Добавить"
        const addBtn = document.createElement('button');
        addBtn.textContent = 'Добавить';
        addBtn.className = 'btn-add';
        addBtn.style.cssText = 'padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;';
        addBtn.addEventListener('click', () => this.showAddForm());
        controlsDiv.appendChild(addBtn);

        // Кнопка "Премировать"
        const bonusBtn = document.createElement('button');
        bonusBtn.textContent = 'Премировать';
        bonusBtn.className = 'btn-bonus';
        bonusBtn.style.cssText = 'padding: 10px 20px; background: #10b981; color: white; border: none; border-radius: 5px; cursor: pointer;';
        bonusBtn.addEventListener('click', () => this.showBonusMessage());
        controlsDiv.appendChild(bonusBtn);

        // Поле поиска
        const searchDiv = document.createElement('div');
        searchDiv.style.cssText = 'flex: 1; min-width: 200px;';
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Поиск...';
        searchInput.className = 'search-input';
        searchInput.style.cssText = 'width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 5px;';
        const searchBtn = document.createElement('button');
        searchBtn.textContent = 'Найти';
        searchBtn.className = 'btn-search';
        searchBtn.style.cssText = 'margin-left: 10px; padding: 8px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;';
        searchBtn.addEventListener('click', () => {
            this.filterData(searchInput.value);
        });
        searchDiv.appendChild(searchInput);
        searchDiv.appendChild(searchBtn);
        controlsDiv.appendChild(searchDiv);

        this.container.insertBefore(controlsDiv, this.container.firstChild);
    }

    createTable() {
        const tableWrapper = document.createElement('div');
        tableWrapper.className = 'table-wrapper';
        tableWrapper.style.cssText = 'overflow-x: auto; margin-bottom: 20px;';

        const table = document.createElement('table');
        table.className = 'contacts-table';
        table.style.cssText = 'width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;';

        // Заголовки таблицы
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = ['Выбор', 'ФИО', 'Фото', 'Описание', 'Телефон', 'Email'];

        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            th.style.cssText = 'padding: 12px; background: #667eea; color: white; text-align: left; cursor: pointer; user-select: none;';
            if (header !== 'Выбор' && header !== 'Фото') {
                th.addEventListener('click', () => this.sortBy(header));
            }
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        tbody.className = 'table-body';
        table.appendChild(tbody);

        tableWrapper.appendChild(table);
        this.container.appendChild(tableWrapper);
        this.tableBody = tbody;
    }

    renderTable() {
        if (!this.tableBody) return;

        // Очищаем таблицу
        this.tableBody.innerHTML = '';

        // Получаем данные для текущей страницы
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageData = this.filteredData.slice(startIndex, endIndex);

        // Создаем строки
        pageData.forEach((employee, index) => {
            const row = document.createElement('tr');
            row.style.cssText = 'border-bottom: 1px solid #e5e7eb; cursor: pointer;';
            row.addEventListener('click', () => this.showEmployeeDetails(employee));

            // Чекбокс
            const checkboxCell = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = this.selectedEmployees.has(employee.id);
            checkbox.addEventListener('click', (e) => {
                e.stopPropagation();
                if (checkbox.checked) {
                    this.selectedEmployees.add(employee.id);
                } else {
                    this.selectedEmployees.delete(employee.id);
                }
            });
            checkboxCell.appendChild(checkbox);
            checkboxCell.style.cssText = 'padding: 12px;';
            row.appendChild(checkboxCell);

            // ФИО
            const nameCell = document.createElement('td');
            nameCell.textContent = employee.name || '';
            nameCell.style.cssText = 'padding: 12px;';
            row.appendChild(nameCell);

            // Фото
            const photoCell = document.createElement('td');
            if (employee.photo) {
                const img = document.createElement('img');
                img.src = employee.photo;
                img.alt = employee.name;
                img.style.cssText = 'width: 60px; height: 60px; object-fit: cover; border-radius: 50%;';
                photoCell.appendChild(img);
            } else {
                photoCell.textContent = '—';
            }
            photoCell.style.cssText = 'padding: 12px;';
            row.appendChild(photoCell);

            // Описание
            const descCell = document.createElement('td');
            descCell.textContent = employee.bio || '';
            descCell.style.cssText = 'padding: 12px; max-width: 300px; overflow: hidden; text-overflow: ellipsis;';
            row.appendChild(descCell);

            // Телефон
            const phoneCell = document.createElement('td');
            phoneCell.textContent = employee.phone || '';
            phoneCell.style.cssText = 'padding: 12px;';
            row.appendChild(phoneCell);

            // Email
            const emailCell = document.createElement('td');
            emailCell.textContent = employee.email || '';
            emailCell.style.cssText = 'padding: 12px;';
            row.appendChild(emailCell);

            this.tableBody.appendChild(row);
        });

        // Обновляем пагинацию
        this.updatePagination();
    }

    sortBy(column) {
        if (this.sortedColumn === column) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortedColumn = column;
            this.sortDirection = 'asc';
        }

        this.filteredData.sort((a, b) => {
            let aVal = a[this.getColumnKey(column)] || '';
            let bVal = b[this.getColumnKey(column)] || '';

            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }

            if (this.sortDirection === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });

        this.currentPage = 1;
        this.renderTable();
        this.updateSortIndicators();
    }

    getColumnKey(column) {
        const mapping = {
            'ФИО': 'name',
            'Описание': 'bio',
            'Телефон': 'phone',
            'Email': 'email'
        };
        return mapping[column] || column.toLowerCase();
    }

    updateSortIndicators() {
        const headers = this.container.querySelectorAll('th');
        headers.forEach(th => {
            const text = th.textContent.trim();
            if (text === this.sortedColumn) {
                th.textContent = `${text} ${this.sortDirection === 'asc' ? '↑' : '↓'}`;
            } else if (text !== 'Выбор' && text !== 'Фото') {
                th.textContent = text.replace(/[↑↓]/g, '').trim();
            }
        });
    }

    filterData(searchText) {
        if (!searchText.trim()) {
            this.filteredData = [...this.data];
        } else {
            const searchLower = searchText.toLowerCase();
            this.filteredData = this.data.filter(employee => {
                return (
                    (employee.name && employee.name.toLowerCase().includes(searchLower)) ||
                    (employee.bio && employee.bio.toLowerCase().includes(searchLower)) ||
                    (employee.phone && employee.phone.includes(searchText)) ||
                    (employee.email && employee.email.toLowerCase().includes(searchLower))
                );
            });
        }
        this.currentPage = 1;
        this.renderTable();
    }

    updatePagination() {
        // Удаляем старую пагинацию
        const oldPagination = this.container.querySelector('.pagination');
        if (oldPagination) {
            oldPagination.remove();
        }

        const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        if (totalPages <= 1) return;

        const pagination = document.createElement('div');
        pagination.className = 'pagination';
        pagination.style.cssText = 'display: flex; justify-content: center; gap: 10px; margin-top: 20px;';

        // Кнопка "Предыдущая"
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '←';
        prevBtn.disabled = this.currentPage === 1;
        prevBtn.style.cssText = 'padding: 8px 15px; border: 1px solid #ddd; background: white; cursor: pointer; border-radius: 5px;';
        prevBtn.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderTable();
            }
        });
        pagination.appendChild(prevBtn);

        // Номера страниц
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.style.cssText = `padding: 8px 15px; border: 1px solid #ddd; background: ${i === this.currentPage ? '#667eea' : 'white'}; color: ${i === this.currentPage ? 'white' : 'black'}; cursor: pointer; border-radius: 5px;`;
            pageBtn.addEventListener('click', () => {
                this.currentPage = i;
                this.renderTable();
            });
            pagination.appendChild(pageBtn);
        }

        // Кнопка "Следующая"
        const nextBtn = document.createElement('button');
        nextBtn.textContent = '→';
        nextBtn.disabled = this.currentPage === totalPages;
        nextBtn.style.cssText = 'padding: 8px 15px; border: 1px solid #ddd; background: white; cursor: pointer; border-radius: 5px;';
        nextBtn.addEventListener('click', () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderTable();
            }
        });
        pagination.appendChild(nextBtn);

        this.container.appendChild(pagination);
    }

    showEmployeeDetails(employee) {
            // Удаляем старый блок деталей
            const oldDetails = this.container.querySelector('.employee-details');
            if (oldDetails) {
                oldDetails.remove();
            }

            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'employee-details';
            detailsDiv.style.cssText = 'margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #667eea;';

            detailsDiv.innerHTML = `
            <h3>Детали сотрудника</h3>
            <p><strong>ФИО:</strong> ${employee.name || '—'}</p>
            <p><strong>Описание:</strong> ${employee.bio || '—'}</p>
            <p><strong>Телефон:</strong> ${employee.phone || '—'}</p>
            <p><strong>Email:</strong> ${employee.email || '—'}</p>
            ${employee.photo ? `<p><strong>Фото:</strong><br><img src="${employee.photo}" alt="${employee.name}" style="max-width: 200px; margin-top: 10px;"></p>` : ''}
        `;

        this.container.appendChild(detailsDiv);
    }

    showAddForm() {
        // Удаляем старую форму, если есть
        const oldForm = this.container.querySelector('.add-employee-form');
        if (oldForm) {
            oldForm.remove();
            return;
        }

        const formDiv = document.createElement('div');
        formDiv.className = 'add-employee-form';
        formDiv.style.cssText = 'margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 2px solid #667eea;';

        formDiv.innerHTML = `
            <h3>Добавить сотрудника</h3>
            <form id="addEmployeeForm">
                <div style="margin-bottom: 15px;">
                    <label>ФИО: <input type="text" name="name" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;"></label>
                </div>
                <div style="margin-bottom: 15px;">
                    <label>URL фото: <input type="text" name="photo" id="photoUrl" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;"></label>
                    <div id="photoUrlError" style="color: red; font-size: 12px; margin-top: 5px;"></div>
                </div>
                <div style="margin-bottom: 15px;">
                    <label>Описание: <textarea name="bio" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; min-height: 80px;"></textarea></label>
                </div>
                <div style="margin-bottom: 15px;">
                    <label>Телефон: <input type="text" name="phone" id="phoneInput" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;"></label>
                    <div id="phoneError" style="color: red; font-size: 12px; margin-top: 5px;"></div>
                </div>
                <div style="margin-bottom: 15px;">
                    <label>Email: <input type="email" name="email" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;"></label>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button type="submit" id="addEmployeeBtn" disabled style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Добавить в таблицу</button>
                    <button type="button" class="cancel-form-btn" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer;">Отмена</button>
                </div>
            </form>
        `;

        this.container.appendChild(formDiv);

        // Валидация URL
        const photoUrlInput = formDiv.querySelector('#photoUrl');
        const photoUrlError = formDiv.querySelector('#photoUrlError');
        photoUrlInput.addEventListener('blur', () => {
            const url = photoUrlInput.value.trim();
            if (url && !this.validateURL(url)) {
                photoUrlInput.style.borderColor = 'red';
                photoUrlInput.style.background = '#ffe6e6';
                photoUrlError.textContent = 'URL должен начинаться с http:// или https:// и заканчиваться .html';
            } else {
                photoUrlInput.style.borderColor = '#ddd';
                photoUrlInput.style.background = 'white';
                photoUrlError.textContent = '';
            }
            this.checkFormValidity();
        });

        // Валидация телефона
        const phoneInput = formDiv.querySelector('#phoneInput');
        const phoneError = formDiv.querySelector('#phoneError');
        phoneInput.addEventListener('blur', () => {
            const phone = phoneInput.value.trim();
            if (phone && !this.validatePhone(phone)) {
                phoneInput.style.borderColor = 'red';
                phoneInput.style.background = '#ffe6e6';
                phoneError.textContent = 'Неверный формат телефона. Примеры: 80291112233, 8 (029) 1112233, +375 (29) 111-22-33';
            } else {
                phoneInput.style.borderColor = '#ddd';
                phoneInput.style.background = 'white';
                phoneError.textContent = '';
            }
            this.checkFormValidity();
        });

        // Отслеживание изменений в форме
        const form = formDiv.querySelector('#addEmployeeForm');
        form.addEventListener('input', () => this.checkFormValidity());

        // Обработка отправки формы
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addEmployee(form);
        });

        // Кнопка отмены
        formDiv.querySelector('.cancel-form-btn').addEventListener('click', () => {
            formDiv.remove();
        });
    }

    validateURL(url) {
        // URL должен начинаться с http:// или https:// и заканчиваться на .php или .html
        const urlPattern = /^(https?:\/\/).+\.(php|html)$/i;
        return urlPattern.test(url);
    }

    validatePhone(phone) {
        // Телефон может начинаться с +375 или 8, код оператора может быть в скобках и без, с пробелами
        // Оставшаяся часть может быть с дефисами и пробелами
        // Примеры: 80291112233, 8 (029) 1112233, +375 (29) 111-22-33, +375 (29) 111 22 33
        const cleaned = phone.replace(/[\s\-\(\)]/g, '');
        // Проверяем, что начинается с +375 или 8, и содержит достаточно цифр
        if (cleaned.startsWith('+375')) {
            return /^\+375\d{9}$/.test(cleaned);
        } else if (cleaned.startsWith('8')) {
            return /^8\d{10}$/.test(cleaned);
        }
        return false;
    }

    checkFormValidity() {
        const form = document.getElementById('addEmployeeForm');
        if (!form) return;

        const formData = new FormData(form);
        const name = formData.get('name');
        const bio = formData.get('bio');
        const phone = formData.get('phone');
        const email = formData.get('email');
        const photoUrl = formData.get('photo');

        const photoUrlInput = form.querySelector('#photoUrl');
        const phoneInput = form.querySelector('#phoneInput');

        const isPhotoValid = !photoUrl || this.validateURL(photoUrl);
        const isPhoneValid = phone && this.validatePhone(phone);

        const isValid = name && bio && phone && email && isPhotoValid && isPhoneValid;

        const addBtn = form.querySelector('#addEmployeeBtn');
        if (addBtn) {
            addBtn.disabled = !isValid;
        }
    }

    addEmployee(form) {
        const formData = new FormData(form);
        const newEmployee = {
            id: Date.now(), // Временный ID
            name: formData.get('name'),
            photo: formData.get('photo') || null,
            bio: formData.get('bio'),
            phone: formData.get('phone'),
            email: formData.get('email')
        };

        this.data.push(newEmployee);
        this.filteredData = [...this.data];
        this.renderTable();

        // Удаляем форму
        form.closest('.add-employee-form').remove();
    }

    showBonusMessage() {
        if (this.selectedEmployees.size === 0) {
            alert('Выберите сотрудников для премирования');
            return;
        }

        const selectedNames = this.data
            .filter(emp => this.selectedEmployees.has(emp.id))
            .map(emp => {
                const lastName = emp.name.split(' ')[0]; // Берем фамилию (первое слово)
                return lastName;
            });

        // Удаляем старое сообщение
        const oldMessage = this.container.querySelector('.bonus-message');
        if (oldMessage) {
            oldMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = 'bonus-message';
        messageDiv.style.cssText = 'margin-top: 20px; padding: 20px; background: #d1fae5; border-radius: 8px; border-left: 4px solid #10b981;';

        const message = `Поздравляем! Сотрудники ${selectedNames.join(', ')} получают премию за отличную работу!`;
        messageDiv.innerHTML = `<h3>Премирование</h3><p>${message}</p>`;

        this.container.appendChild(messageDiv);

        // Очищаем выбор
        this.selectedEmployees.clear();
        this.renderTable();
    }
}