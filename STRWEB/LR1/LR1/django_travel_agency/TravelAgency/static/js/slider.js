class Slider {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        if (!this.container) {
            throw new Error('Slider container not found');
        }

        // default
        this.options = {
            loop: options.loop !== undefined ? options.loop : true,
            navs: options.navs !== undefined ? options.navs : true,
            pags: options.pags !== undefined ? options.pags : true,
            auto: options.auto !== undefined ? options.auto : true,
            stopMouseHover: options.stopMouseHover !== undefined ? options.stopMouseHover : true,
            delay: options.delay || 5000,
            ...options
        };

        this.slides = Array.from(this.container.querySelectorAll('.slide'));
        if (this.slides.length === 0) {
            throw new Error('No slides found');
        }

        this.currentIndex = 0;
        this.autoInterval = null;
        this.isPaused = false;

        // Инициализация
        this.init();
    }

    init() {
        //create slider
        this.createStructure();

        // show the first slide
        this.showSlide(0);


        if (this.options.auto) {
            this.startAutoPlay();
        }


        this.attachEventListeners();
    }

    createStructure() {
        const slidesArray = Array.from(this.slides);

        this.slidesWrapper = document.createElement('div');
        this.slidesWrapper.className = 'slider-wrapper';
        this.slidesWrapper.style.cssText = 'position: relative; width: 100%; overflow: hidden;';

        slidesArray.forEach((slide, index) => {
            slide.style.cssText = 'display: none; width: 100%; position: relative;';
            this.slidesWrapper.appendChild(slide);
        });

        this.container.innerHTML = '';
        this.container.appendChild(this.slidesWrapper);

        this.slides = Array.from(this.slidesWrapper.querySelectorAll('.slide'));

        if (this.options.navs) {
            this.createNavigation();
        }

        if (this.options.pags) {
            this.createPagination();
        }

        this.createCounter();

        this.createAdminSettings();
    }

    createNavigation() {
        const navContainer = document.createElement('div');
        navContainer.className = 'slider-nav';
        navContainer.style.cssText = 'position: absolute; top: 50%; transform: translateY(-50%); width: 100%; display: flex; justify-content: space-between; padding: 0 20px; z-index: 10; pointer-events: none;';

        // Кнопка "Назад"
        this.prevBtn = document.createElement('button');
        this.prevBtn.className = 'slider-btn slider-btn-prev';
        this.prevBtn.innerHTML = '❮';
        this.prevBtn.style.cssText = 'background: rgba(255,255,255,0.8); border: none; padding: 15px 20px; border-radius: 50%; cursor: pointer; font-size: 24px; pointer-events: all; transition: all 0.3s;';
        this.prevBtn.addEventListener('mouseenter', () => {
            this.prevBtn.style.background = 'rgba(255,255,255,1)';
            this.prevBtn.style.transform = 'scale(1.1)';
        });
        this.prevBtn.addEventListener('mouseleave', () => {
            this.prevBtn.style.background = 'rgba(255,255,255,0.8)';
            this.prevBtn.style.transform = 'scale(1)';
        });

        // Кнопка "Вперед"
        this.nextBtn = document.createElement('button');
        this.nextBtn.className = 'slider-btn slider-btn-next';
        this.nextBtn.innerHTML = '❯';
        this.nextBtn.style.cssText = 'background: rgba(255,255,255,0.8); border: none; padding: 15px 20px; border-radius: 50%; cursor: pointer; font-size: 24px; pointer-events: all; transition: all 0.3s;';
        this.nextBtn.addEventListener('mouseenter', () => {
            this.nextBtn.style.background = 'rgba(255,255,255,1)';
            this.nextBtn.style.transform = 'scale(1.1)';
        });
        this.nextBtn.addEventListener('mouseleave', () => {
            this.nextBtn.style.background = 'rgba(255,255,255,0.8)';
            this.nextBtn.style.transform = 'scale(1)';
        });

        navContainer.appendChild(this.prevBtn);
        navContainer.appendChild(this.nextBtn);
        this.slidesWrapper.appendChild(navContainer);
    }

    createPagination() {
        const pagContainer = document.createElement('div');
        pagContainer.className = 'slider-pagination';
        pagContainer.style.cssText = 'display: flex; justify-content: center; gap: 10px; margin-top: 20px;';

        this.paginationDots = [];
        this.slides.forEach((slide, index) => {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            dot.setAttribute('data-slide', index);
            dot.style.cssText = 'width: 12px; height: 12px; border-radius: 50%; border: none; background: #ccc; cursor: pointer; transition: all 0.3s;';
            dot.addEventListener('click', () => this.goToSlide(index));
            pagContainer.appendChild(dot);
            this.paginationDots.push(dot);
        });

        this.container.appendChild(pagContainer);
    }

    createCounter() {
        const counter = document.createElement('div');
        counter.className = 'slider-counter';
        counter.style.cssText = 'text-align: center; margin-top: 10px; font-size: 14px; color: #666;';
        this.counterElement = counter;
        this.updateCounter();
        this.container.appendChild(counter);
    }

    createAdminSettings() {
        const settingsContainer = document.createElement('div');
        settingsContainer.className = 'slider-admin-settings';
        settingsContainer.style.cssText = 'margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;';

        const label = document.createElement('label');
        label.textContent = 'Интервал переключения (секунды): ';
        label.style.cssText = 'margin-right: 10px;';

        const input = document.createElement('input');
        input.type = 'number';
        input.min = '1';
        input.value = this.options.delay / 1000;
        input.style.cssText = 'padding: 5px 10px; border: 1px solid #ddd; border-radius: 4px; width: 80px;';
        input.addEventListener('change', (e) => {
            const newDelay = parseInt(e.target.value) * 1000;
            if (newDelay >= 1000) {
                this.options.delay = newDelay;
                if (this.options.auto) {
                    this.stopAutoPlay();
                    this.startAutoPlay();
                }
            }
        });

        settingsContainer.appendChild(label);
        settingsContainer.appendChild(input);
        this.container.appendChild(settingsContainer);
    }

    showSlide(index) {
        // hide all slides
        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });

        // show current slide
        if (this.slides[index]) {
            this.slides[index].style.display = 'block';
            this.currentIndex = index;
        }

        if (this.options.pags) {
            this.updatePagination();
        }

        this.updateCounter();
    }

    updatePagination() {
        this.paginationDots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.style.background = '#667eea';
                dot.style.transform = 'scale(1.2)';
            } else {
                dot.style.background = '#ccc';
                dot.style.transform = 'scale(1)';
            }
        });
    }

    updateCounter() {
        if (this.counterElement) {
            this.counterElement.textContent = `${this.currentIndex + 1}/${this.slides.length}`;
        }
    }

    nextSlide() {
        let nextIndex = this.currentIndex + 1;
        if (nextIndex >= this.slides.length) {
            nextIndex = this.options.loop ? 0 : this.slides.length - 1;
        }
        this.showSlide(nextIndex);
    }

    prevSlide() {
        let prevIndex = this.currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = this.options.loop ? this.slides.length - 1 : 0;
        }
        this.showSlide(prevIndex);
    }

    goToSlide(index) {
        if (index >= 0 && index < this.slides.length) {
            this.showSlide(index);
        }
    }

    startAutoPlay() {
        if (this.autoInterval) {
            clearInterval(this.autoInterval);
        }
        this.autoInterval = setInterval(() => {
            if (!this.isPaused) {
                this.nextSlide();
            }
        }, this.options.delay);
    }

    stopAutoPlay() {
        if (this.autoInterval) {
            clearInterval(this.autoInterval);
            this.autoInterval = null;
        }
    }

    attachEventListeners() {
        // nav buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                if (this.options.auto) {
                    this.stopAutoPlay();
                    this.startAutoPlay();
                }
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                if (this.options.auto) {
                    this.stopAutoPlay();
                    this.startAutoPlay();
                }
            });
        }

        // stop when mouse enter
        if (this.options.auto && this.options.stopMouseHover) {
            this.slidesWrapper.addEventListener('mouseenter', () => {
                this.isPaused = true;
            });

            this.slidesWrapper.addEventListener('mouseleave', () => {
                this.isPaused = false;
            });
        }
    }

    destroy() {
        this.stopAutoPlay();
        if (this.prevBtn) this.prevBtn.removeEventListener('click', this.prevSlide);
        if (this.nextBtn) this.nextBtn.removeEventListener('click', this.nextSlide);
    }
}

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Slider;
}