/**
 * Анимации при скроллинге
 */
class ScrollAnimations {
    constructor() {
        this.animatedElements = [];
        this.init();
    }

    init() {
        this.createAnimationContainer();

        this.setupScrollListener();

        this.createAirplaneGlobeAnimation();

        this.createAdditionalAnimations();
    }

    createAnimationContainer() {
        const container = document.getElementById('scrollAnimationsContainer');
        if (!container) return;

        const imagesSection = document.createElement('div');
        imagesSection.className = 'scroll-images-section';
        imagesSection.style.cssText = 'margin: 40px 0; padding: 40px 0;';

        const baseUrl = window.location.origin;

        imagesSection.innerHTML = `
            <h3 style="text-align: center; color: #667eea; margin-bottom: 30px;">Изображения с анимацией при скроллинге</h3>
            
            <div class="scroll-image-item" data-scroll-animation="fadeInUp">
                <img src="${baseUrl}/static/vendor/img/slides/slide-1.jpg" alt="Изображение 1" 
                     onerror="this.src='https://via.placeholder.com/600x300/667eea/ffffff?text=Изображение+1'"
                     style="width: 100%; max-width: 600px; height: 300px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); display: block; margin: 0 auto;">
                <p style="text-align: center; margin-top: 15px; font-size: 1.1rem;">Изображение 1 - Появление снизу</p>
            </div>

            <div class="scroll-image-item" data-scroll-animation="fadeInLeft" style="margin-top: 50px;">
                <img src="${baseUrl}/static/vendor/img/slides/slide-2.jpg" alt="Изображение 2" 
                     onerror="this.src='https://via.placeholder.com/600x300/764ba2/ffffff?text=Изображение+2'"
                     style="width: 100%; max-width: 600px; height: 300px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); display: block; margin: 0 auto;">
                <p style="text-align: center; margin-top: 15px; font-size: 1.1rem;">Изображение 2 - Появление слева</p>
            </div>

            <div class="scroll-image-item" data-scroll-animation="fadeInRight" style="margin-top: 50px;">
                <img src="${baseUrl}/static/vendor/img/slides/slide-3.jpg" alt="Изображение 3" 
                     onerror="this.src='https://via.placeholder.com/600x300/10b981/ffffff?text=Изображение+3'"
                     style="width: 100%; max-width: 600px; height: 300px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); display: block; margin: 0 auto;">
                <p style="text-align: center; margin-top: 15px; font-size: 1.1rem;">Изображение 3 - Появление справа</p>
            </div>

            <div class="scroll-image-item" data-scroll-animation="scaleIn" style="margin-top: 50px;">
                <img src="${baseUrl}/static/vendor/img/banner1.jpg" alt="Изображение 4" 
                     onerror="this.src='https://via.placeholder.com/600x300/f59e0b/ffffff?text=Изображение+4'"
                     style="width: 100%; max-width: 600px; height: 300px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); display: block; margin: 0 auto;">
                <p style="text-align: center; margin-top: 15px; font-size: 1.1rem;">Изображение 4 - Масштабирование</p>
            </div>

            <div class="scroll-image-item" data-scroll-animation="rotateIn" style="margin-top: 50px;">
                <img src="${baseUrl}/static/vendor/img/slides/slide-1.jpg" alt="Изображение 5" 
                     onerror="this.src='https://via.placeholder.com/600x300/ef4444/ffffff?text=Изображение+5'"
                     style="width: 100%; max-width: 600px; height: 300px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); display: block; margin: 0 auto;">
                <p style="text-align: center; margin-top: 15px; font-size: 1.1rem;">Изображение 5 - Вращение</p>
            </div>
        `;

        container.appendChild(imagesSection);

        // Добавляем стили для анимаций
        this.addAnimationStyles();
    }

    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .scroll-image-item {
                opacity: 0;
                transition: all 0.8s ease-out;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .scroll-image-item.animated {
                opacity: 1;
            }

            .scroll-image-item[data-scroll-animation="fadeInUp"].animated {
                animation: fadeInUp 0.8s ease-out forwards;
            }

            .scroll-image-item[data-scroll-animation="fadeInLeft"].animated {
                animation: fadeInLeft 0.8s ease-out forwards;
            }

            .scroll-image-item[data-scroll-animation="fadeInRight"].animated {
                animation: fadeInRight 0.8s ease-out forwards;
            }

            .scroll-image-item[data-scroll-animation="scaleIn"].animated {
                animation: scaleIn 0.8s ease-out forwards;
            }

            .scroll-image-item[data-scroll-animation="rotateIn"].animated {
                animation: rotateIn 0.8s ease-out forwards;
            }

            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes fadeInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes fadeInRight {
                from {
                    opacity: 0;
                    transform: translateX(50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes scaleIn {
                from {
                    opacity: 0;
                    transform: scale(0.5);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            @keyframes rotateIn {
                from {
                    opacity: 0;
                    transform: rotate(-180deg) scale(0.5);
                }
                to {
                    opacity: 1;
                    transform: rotate(0deg) scale(1);
                }
            }

            /* Анимация самолета вокруг земного шара */
            .globe-container {
                position: relative;
                width: 500px;
                height: 500px;
                margin: 50px auto;
                perspective: 1200px;
            }

            .globe-stage {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 100%;
                height: 100%;
                transform: translate(-50%, -50%) rotateX(8deg);
                transform-style: preserve-3d;
            }

            .globe {
                width: 360px;
                height: 360px;
                border-radius: 50%;
                margin: 70px auto;
                position: relative;
                filter: drop-shadow(0 25px 35px rgba(3, 7, 18, 0.45));
                transform-style: preserve-3d;
                animation: rotateGlobe 50s linear infinite;
            }

            .globe::before {
                content: '';
                position: absolute;
                inset: -25px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(96, 165, 250, 0.25), transparent 70%);
                z-index: 0;
            }

            .globe::after {
                content: '';
                position: absolute;
                inset: 14%;
                border-radius: 50%;
                border: 2px solid rgba(255, 255, 255, 0.4);
                border-left-color: transparent;
                border-right-color: transparent;
                transform: rotateX(65deg);
                opacity: 0.7;
                z-index: 2;
            }

            .globe-core {
                position: absolute;
                inset: 0;
                border-radius: 50%;
                overflow: hidden;
                background: radial-gradient(circle at 35% 30%, #0ea5e9, #0f172a 80%);
                box-shadow:
                    inset -30px -35px 60px rgba(0, 0, 0, 0.55),
                    inset 15px 20px 40px rgba(255, 255, 255, 0.12);
                z-index: 1;
            }

            .globe-map {
                position: absolute;
                inset: -5%;
                border-radius: 50%;
                background-image: url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20800%20400'%3E%3Crect%20width='800'%20height='400'%20fill='%2302568b'/%3E%3Cpath%20fill='%2386efac'%20d='M84%20233C53%20190%20113%20108%20188%20136c57%2021%2088%2095%2052%20144-39%2054-120%2055-156-47z'/%3E%3Cpath%20fill='%2386efac'%20d='M250%20130c35-40%20103-62%20180-53s149%2053%20197%2078c48%2026%2062%2045%2055%2072-8%2030-55%2055-118%2058-84%203-154-32-200-64-54-38-62-74-14-91z'/%3E%3Cpath%20fill='%2386efac'%20d='M342%20254c42-25%2089-13%20118%2014%2028%2027%2040%2068%209%20102-32%2034-103%2043-147%2030-41-13-57-50-31-86%2012-17%2032-35%2051-60z'/%3E%3Cpath%20fill='%2386efac'%20d='M540%20290c26-8%2057%2015%2074%2035%2017%2020%2022%2040%206%2054-17%2014-54%2017-78%2012-26-6-39-20-37-38%203-22%2023-56%2035-63z'/%3E%3C/svg%3E");
                background-size: 250% 100%;
                background-position: 0% 50%;
                mix-blend-mode: screen;
                animation: panMap 32s linear infinite;
                opacity: 0.85;
            }

            .globe-clouds {
                position: absolute;
                inset: -2%;
                border-radius: 50%;
                background-image:
                    radial-gradient(circle, rgba(255, 255, 255, 0.9) 15%, transparent 55%),
                    radial-gradient(circle, rgba(255, 255, 255, 0.45) 20%, transparent 65%);
                filter: blur(6px);
                opacity: 0.35;
                mix-blend-mode: screen;
                animation: driftClouds 18s ease-in-out infinite;
            }

            .globe-highlight {
                position: absolute;
                inset: 0;
                border-radius: 50%;
                background: radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.45), transparent 60%);
                pointer-events: none;
                z-index: 3;
            }

            .orbit-path {
                position: absolute;
                top: 50%;
                left: 50%;
                border-radius: 50%;
                pointer-events: none;
                transform: translate(-50%, -50%);
            }

            .orbit-path--primary {
                width: 420px;
                height: 420px;
                border: 2px dashed rgba(255, 255, 255, 0.5);
                transform: translate(-50%, -50%) rotateX(12deg);
                box-shadow: 0 0 30px rgba(59, 130, 246, 0.25);
            }

            .orbit-path--secondary {
                width: 380px;
                height: 380px;
                border-style: solid;
                border-color: rgba(14, 165, 233, 0.25);
                border-width: 1px;
                transform: translate(-50%, -50%) rotateX(35deg) rotateZ(25deg);
            }

            .globe-caption {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                margin-top: 10px;
                font-size: 1rem;
                color: rgba(255, 255, 255, 0.9);
                letter-spacing: 0.05em;
            }

            .airplane {
                position: absolute;
                width: 80px;
                height: 50px;
                top: 50%;
                left: 50%;
                transform-origin: 0 0;
                animation: orbitGlobe 18s linear infinite;
                z-index: 10;
            }

            .airplane-body {
                width: 65px;
                height: 18px;
                background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #e0e0e0 100%);
                border-radius: 12px 25px 25px 12px;
                position: relative;
                box-shadow: 
                    0 3px 8px rgba(0, 0, 0, 0.4),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8);
            }

            .airplane-body::before {
                content: '';
                position: absolute;
                right: -10px;
                top: 3px;
                width: 0;
                height: 0;
                border-left: 15px solid #ffffff;
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;
                filter: drop-shadow(2px 0 2px rgba(0, 0, 0, 0.2));
            }

            .airplane-wing {
                position: absolute;
                width: 40px;
                height: 10px;
                background: linear-gradient(135deg, #ffffff, #d0d0d0);
                border-radius: 0 0 8px 8px;
                top: 10px;
                left: 20px;
                transform: rotate(-8deg);
                box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
            }

            .airplane-wing::after {
                content: '';
                position: absolute;
                width: 15px;
                height: 6px;
                background: linear-gradient(135deg, #ffffff, #e0e0e0);
                border-radius: 0 0 4px 4px;
                top: 8px;
                left: 25px;
                transform: rotate(5deg);
            }

            .airplane-tail {
                position: absolute;
                width: 15px;
                height: 15px;
                background: linear-gradient(135deg, #ffffff, #d0d0d0);
                border-radius: 3px;
                top: -6px;
                left: 8px;
                transform: rotate(45deg);
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }

            .airplane-window {
                position: absolute;
                width: 8px;
                height: 8px;
                background: #4a90e2;
                border-radius: 50%;
                top: 5px;
                left: 25px;
                box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
            }

            @keyframes rotateGlobe {
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }

            @keyframes panMap {
                from {
                    background-position: 0% 50%;
                }
                to {
                    background-position: -200% 50%;
                }
            }

            @keyframes driftClouds {
                0% {
                    transform: rotate(0deg) scale(1);
                }
                50% {
                    transform: rotate(10deg) scale(1.03);
                }
                100% {
                    transform: rotate(360deg) scale(1);
                }
            }

            @keyframes orbitGlobe {
                from {
                    transform: rotate(0deg) translateX(175px) rotate(0deg);
                }
                to {
                    transform: rotate(360deg) translateX(175px) rotate(-360deg);
                }
            }

            @media (max-width: 768px) {
                .globe-container {
                    width: 350px;
                    height: 350px;
                }

                .globe {
                    width: 250px;
                    height: 250px;
                    margin: 50px auto;
                }

                .airplane {
                    width: 60px;
                    height: 40px;
                }

                @keyframes orbitGlobe {
                    from {
                        transform: rotate(0deg) translateX(125px) rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg) translateX(125px) rotate(-360deg);
                    }
                }
            }

            /* Дополнительные анимации */
            .floating-element {
                animation: float 3s ease-in-out infinite;
            }

            @keyframes float {
                0%, 100% {
                    transform: translateY(0px);
                }
                50% {
                    transform: translateY(-20px);
                }
            }

            .pulse-element {
                animation: pulse 2s ease-in-out infinite;
            }

            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                    opacity: 1;
                }
                50% {
                    transform: scale(1.05);
                    opacity: 0.8;
                }
            }

            .shimmer-element {
                position: relative;
                overflow: hidden;
            }

            .shimmer-element::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                animation: shimmer 3s infinite;
            }

            @keyframes shimmer {
                0% {
                    left: -100%;
                }
                100% {
                    left: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupScrollListener() {
        const items = document.querySelectorAll('.scroll-image-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {

                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, 100);
                } else {

                    entry.target.classList.remove('animated');
                }
            });
        }, {
            threshold: 0.2, //when it seems for 20% - start animation
            rootMargin: '50px' // change margin for activation zone 
        });

        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(item);
        });
    }

    createAirplaneGlobeAnimation() {
        const container = document.getElementById('scrollAnimationsContainer');
        if (!container) return;

        const globeSection = document.createElement('div');
        globeSection.className = 'globe-section';
        globeSection.style.cssText = 'margin: 60px 0; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; text-align: center;';

        globeSection.innerHTML = `
            <h2 style="color: white; margin-bottom: 30px;">✈️ Самолет, летающий вокруг земного шара</h2>
            <div class="globe-container">
                <div class="globe-stage">
                    <div class="globe">
                        <div class="globe-core">
                            <div class="globe-map"></div>
                            <div class="globe-clouds"></div>
                        </div>
                        <div class="globe-highlight"></div>
                    </div>
                    <div class="orbit-path orbit-path--primary"></div>
                    <div class="orbit-path orbit-path--secondary"></div>
                </div>
                <div class="airplane">
                    <div class="airplane-body">
                        <div class="airplane-wing"></div>
                        <div class="airplane-tail"></div>
                        <div class="airplane-window"></div>
                    </div>
                </div>
            </div>
            <p class="globe-caption">🌍 Земля • орбита полёта</p>
            <p style="color: white; margin-top: 12px; font-size: 1.1rem;">Анимация вращения земного шара и орбиты самолета</p>
            <p style="color: rgba(255, 255, 255, 0.8); margin-top: 10px; font-size: 0.9rem;">Земной шар вращается, а самолет летит по орбитальному маршруту вокруг него</p>
        `;

        container.appendChild(globeSection);
    }

    createAdditionalAnimations() {
        const container = document.getElementById('scrollAnimationsContainer');
        if (!container) return;

        const additionalSection = document.createElement('div');
        additionalSection.className = 'additional-animations';
        additionalSection.style.cssText = 'margin: 60px 0; padding: 40px; background: white; border-radius: 20px;';

        additionalSection.innerHTML = `
            <h2 style="text-align: center; color: #667eea; margin-bottom: 30px;">Дополнительные анимации</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-top: 30px;">
                <div class="floating-element" style="padding: 30px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 15px; color: white; text-align: center;">
                    <h3 style="margin-top: 0;">Плавающий элемент</h3>
                    <p>Плавное движение вверх-вниз</p>
                </div>

                <div class="pulse-element" style="padding: 30px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 15px; color: white; text-align: center;">
                    <h3 style="margin-top: 0;">Пульсирующий элемент</h3>
                    <p>Ритмичное изменение размера</p>
                </div>

                <div class="shimmer-element" style="padding: 30px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 15px; color: white; text-align: center; position: relative;">
                    <h3 style="margin-top: 0;">Блестящий элемент</h3>
                    <p>Эффект блика при наведении</p>
                </div>
            </div>

            <div style="margin-top: 40px; padding: 30px; background: #f8f9fa; border-radius: 15px;">
                <h3 style="text-align: center; color: #667eea;">Анимация при наведении</h3>
                <div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px; flex-wrap: wrap;">
                    <div class="hover-scale" style="width: 150px; height: 150px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 15px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; cursor: pointer; transition: transform 0.3s ease;">
                        Масштаб
                    </div>
                    <div class="hover-rotate" style="width: 150px; height: 150px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 15px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; cursor: pointer; transition: transform 0.3s ease;">
                        Вращение
                    </div>
                    <div class="hover-tilt" style="width: 150px; height: 150px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 15px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; cursor: pointer; transition: transform 0.3s ease;">
                        Наклон
                    </div>
                </div>
            </div>
        `;

        container.appendChild(additionalSection);

        const hoverStyle = document.createElement('style');
        hoverStyle.textContent = `
            .hover-scale:hover {
                transform: scale(1.1);
            }

            .hover-rotate:hover {
                transform: rotate(10deg) scale(1.05);
            }

            .hover-tilt:hover {
                transform: perspective(1000px) rotateX(10deg) rotateY(10deg);
            }
        `;
        document.head.appendChild(hoverStyle);
    }
}