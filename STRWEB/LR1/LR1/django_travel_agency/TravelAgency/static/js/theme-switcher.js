class ThemeSwitcher {
    constructor() {
        //use localStorage
        this.themeKey = 'theme-preference';
        this.currentTheme = this.getSavedTheme() || 'light';
        this.init();
    }

    init() {
        // Применяем сохраненную тему
        this.applyTheme(this.currentTheme);

        // Создаем переключатель, если его еще нет
        this.createSwitcher();
    }

    getSavedTheme() {
        try {
            return localStorage.getItem(this.themeKey);
        } catch (e) {
            return null;
        }
    }

    saveTheme(theme) {
        try {
            localStorage.setItem(this.themeKey, theme);
        } catch (e) {
            console.error('Failed to save theme:', e);
        }
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        this.saveTheme(theme);

        // Обновляем переключатель, если он существует
        if (this.switcher) {
            this.updateSwitcher();
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    createSwitcher() {
        // Проверяем, есть ли уже переключатель
        if (document.querySelector('.theme-switcher')) {
            this.switcher = document.querySelector('.theme-switcher');
            this.updateSwitcher();
            return;
        }

        // Создаем переключатель
        const switcher = document.createElement('div');
        switcher.className = 'theme-switcher';
        switcher.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 1000;
            background: white;
            border-radius: 25px;
            padding: 5px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            cursor: pointer;
            transition: all 0.3s ease;
        `;

        const button = document.createElement('button');
        button.className = 'theme-toggle-btn';
        button.innerHTML = this.currentTheme === 'light' ? '🌙' : '☀️';
        button.style.cssText = `
            background: transparent;
            border: none;
            font-size: 24px;
            cursor: pointer;
            padding: 5px 10px;
            transition: transform 0.3s ease;
        `;

        button.addEventListener('click', () => {
            this.toggleTheme();
            button.innerHTML = this.currentTheme === 'light' ? '🌙' : '☀️';
            button.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                button.style.transform = 'rotate(0deg)';
            }, 300);
        });

        switcher.appendChild(button);
        document.body.appendChild(switcher);
        this.switcher = switcher;
    }

    updateSwitcher() {
        if (this.switcher) {
            const button = this.switcher.querySelector('.theme-toggle-btn');
            if (button) {
                button.innerHTML = this.currentTheme === 'light' ? '🌙' : '☀️';
            }
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.themeSwitcher = new ThemeSwitcher();
});

// Добавляем CSS для темной темы
const darkThemeStyles = `
    [data-theme="dark"] {
        --text: #e5e7eb;
        --muted: #9ca3af;
        --bg-primary: #1f2937;
        --bg-secondary: #111827;
        --border-color: #374151;
    }

    [data-theme="dark"] body {
        background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
        color: var(--text);
    }

    [data-theme="dark"] .content-section,
    [data-theme="dark"] .card,
    [data-theme="dark"] .employee-card {
        background: #1f2937;
        color: var(--text);
        border-color: var(--border-color);
    }

    [data-theme="dark"] table {
        background: #1f2937;
        color: var(--text);
    }

    [data-theme="dark"] th {
        background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
    }

    [data-theme="dark"] tr:hover td {
        background: #374151;
    }

    [data-theme="dark"] .site-nav {
        background: rgba(31, 41, 55, 0.95);
        border-bottom-color: var(--border-color);
    }

    [data-theme="dark"] .navbar-nav .nav-link {
        color: var(--text);
    }

    [data-theme="dark"] .theme-switcher {
        background: #1f2937;
        border: 1px solid var(--border-color);
    }
`;

// Добавляем стили в head
const styleSheet = document.createElement('style');
styleSheet.textContent = darkThemeStyles;
document.head.appendChild(styleSheet);