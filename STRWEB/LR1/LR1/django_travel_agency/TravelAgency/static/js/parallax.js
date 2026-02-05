if (window.ParallaxCardsInitialized) {
    console.warn('ParallaxCards уже инициализирован');
} else {
    window.ParallaxCardsInitialized = true;
    console.log("parallax.js подключён");

    class ParallaxCards {
        constructor() {
            this.cards = [];
            this.isInitialized = false;
            this.init();
        }

        init() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initializeCards());
            } else {
                setTimeout(() => this.initializeCards(), 0);
            }
        }

        initializeCards() {
            if (this.isInitialized) {
                console.warn('ParallaxCards уже инициализирован');
                return;
            }

            this.cards = document.querySelectorAll('.tour-card');
            console.log('ParallaxCards initialized with', this.cards.length, 'cards');

            if (this.cards.length === 0) {
                console.warn('ParallaxCards: No .tour-card elements found. Проверьте, что элементы с классом .tour-card существуют на странице.');
                return;
            }

            this.cards.forEach((card, index) => {
                this.setupCard(card, index);
            });

            this.isInitialized = true;
            console.log('ParallaxCards успешно настроен для', this.cards.length, 'карточек');
        }

        setupCard(card, index) {
            if (card.dataset.parallaxSetup === 'true') {
                console.warn(`Карточка ${index} уже настроена`);
                return;
            }

            card.style.willChange = 'transform';
            card.style.cursor = 'pointer';

            const image = card.querySelector('.tour-image');
            if (image) {
                image.style.willChange = 'transform';
                image.style.transformOrigin = 'center center';
                console.log(`Карточка ${index}: изображение найдено (${image.tagName})`);
            } else {
                console.warn(`Карточка ${index}: изображение не найдено`);
            }

            this.addEventListeners(card);

            card.dataset.parallaxSetup = 'true';
        }

        addEventListeners(card) {
            card.addEventListener('mousemove', (e) => this.onMouseMove(e, card), { passive: true });
            card.addEventListener('mouseleave', () => this.onMouseLeave(card), { passive: true });
            card.addEventListener('mouseenter', () => this.onMouseEnter(card), { passive: true });
        }

        onMouseMove(e, card) {

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((centerY - y) / centerY) * 8; // Максимум 8 градусов
            const rotateY = ((x - centerX) / centerX) * 8; // Максимум 8 градусов

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
            card.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';

            const image = card.querySelector('.tour-image');
            if (image) {
                const moveX = ((centerX - x) / centerX) * 20; // Максимум 20px
                const moveY = ((centerY - y) / centerY) * 20; // Максимум 20px

                if (image.tagName === 'IMG') {
                    image.style.transform = `scale(1.15) translateX(${moveX}px) translateY(${moveY}px)`;
                } else {
                    const bgX = 50 + (moveX / rect.width) * 100;
                    const bgY = 50 + (moveY / rect.height) * 100;
                    image.style.backgroundPosition = `${bgX}% ${bgY}%`;
                    image.style.transform = `scale(1.1)`;
                }
            }
        }

        onMouseLeave(card) {
            card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';

            const image = card.querySelector('.tour-image');
            if (image) {
                image.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), background-position 0.6s cubic-bezier(0.23, 1, 0.32, 1)';

                if (image.tagName === 'IMG') {
                    image.style.transform = 'scale(1) translateX(0) translateY(0)';
                } else {
                    image.style.backgroundPosition = '50% 50%';
                    image.style.transform = 'scale(1)';
                }
            }

            setTimeout(() => {
                card.style.transition = '';
                if (image) {
                    image.style.transition = '';
                }
            }, 600);
        }

        onMouseEnter(card) {
            card.style.transition = 'none';

            const image = card.querySelector('.tour-image');
            if (image) {
                image.style.transition = 'none';
            }
        }
    }

    function initParallax() {
        if (window.parallaxInstance) {
            console.warn('ParallaxCards уже создан');
            return;
        }

        const cards = document.querySelectorAll('.tour-card');
        if (cards.length === 0) {
            console.warn('ParallaxCards: Элементы .tour-card не найдены, повторная попытка через 500ms');
            setTimeout(initParallax, 500);
            return;
        }

        window.parallaxInstance = new ParallaxCards();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initParallax);
        window.addEventListener('load', () => {
            if (!window.parallaxInstance) {
                console.warn('ParallaxCards: Инициализация через window.load');
                initParallax();
            }
        });
    } else {
        setTimeout(initParallax, 100);
    }
}