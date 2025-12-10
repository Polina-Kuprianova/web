// ============================================
// ФАЙЛ: js/certificates.js
// Функции для работы с сертификатами
// ============================================

// Функция для открытия сертификатов Stepik
function openStepikCert(certId) {
    console.log(`Открываю сертификат Stepik ID: ${certId}`);

    // Создаем красивое окно загрузки
    const newWindow = window.open('', '_blank');

    // HTML для окна загрузки
    newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Загрузка сертификата</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
                    color: #ffffff;
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                }
                
                .loader-container {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    padding: 50px 40px;
                    text-align: center;
                    max-width: 500px;
                    width: 100%;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                }
                
                .loader-icon {
                    font-size: 50px;
                    color: #4a4a4a;
                    margin-bottom: 25px;
                    animation: pulse 1.5s infinite;
                }
                
                @keyframes pulse {
                    0% { opacity: 0.7; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.1); }
                    100% { opacity: 0.7; transform: scale(1); }
                }
                
                h1 {
                    font-size: 24px;
                    margin-bottom: 15px;
                    font-weight: 600;
                    color: #ffffff;
                }
                
                .progress-text {
                    color: #b0b0b0;
                    margin-bottom: 25px;
                    line-height: 1.5;
                    font-size: 16px;
                }
                
                .progress-bar {
                    height: 6px;
                    background: #2a2a2a;
                    border-radius: 3px;
                    overflow: hidden;
                    margin-bottom: 30px;
                }
                
                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #4a4a4a, #666666);
                    width: 0;
                    animation: progress 2s ease-in-out forwards;
                    border-radius: 3px;
                }
                
                @keyframes progress {
                    to { width: 100%; }
                }
                
                .direct-link {
                    display: inline-block;
                    background: linear-gradient(135deg, #4a4a4a 0%, #333333 100%);
                    color: white;
                    text-decoration: none;
                    padding: 12px 30px;
                    border-radius: 8px;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    border: none;
                    cursor: pointer;
                    font-size: 16px;
                }
                
                .direct-link:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(74, 74, 74, 0.3);
                }
                
                .direct-link i {
                    margin-right: 8px;
                }
                
                .info-note {
                    margin-top: 25px;
                    font-size: 14px;
                    color: #808080;
                    padding-top: 20px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
            </style>
        </head>
        <body>
            <div class="loader-container">
                <div class="loader-icon">
                    <i class="fas fa-certificate"></i>
                </div>
                
                <h1>Загрузка сертификата</h1>
                
                <div class="progress-text">
                    Пожалуйста, подождите. Вы будете перенаправлены 
                    на страницу вашего сертификата.
                </div>
                
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                
                <button class="direct-link" onclick="window.location.href='https://stepik.org/cert/${certId}'">
                    <i class="fas fa-external-link-alt"></i> Перейти сейчас
                </button>
                
                <div class="info-note">
                    <p>Если перенаправление не произошло автоматически,<br>
                    нажмите кнопку выше или обновите страницу.</p>
                </div>
            </div>
            
            <script>
                // Автоматическое перенаправление через 2 секунды
                setTimeout(() => {
                    window.location.href = "https://stepik.org/cert/${certId}";
                }, 2000);
            </script>
        </body>
        </html>
    `);

    // Фокусируем окно
    newWindow.focus();
}

// Функция для открытия обычных сертификатов (Coursera, Udemy и т.д.)
function openCertificate(url) {
    console.log(`Открываю сертификат: ${url}`);

    // Открываем в новом окне с безопасными атрибутами
    window.open(
        url,
        '_blank',
        'noopener,noreferrer,width=1200,height=700,scrollbars=yes'
    );
}

// Функция для предпросмотра сертификата в модальном окне
function previewCertificate(imageSrc, title) {
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'certificate-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeModal()"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal()">
                <i class="fas fa-times"></i>
            </button>
            <h3>${title}</h3>
            <img src="${imageSrc}" alt="${title}">
            <div class="modal-actions">
                <button onclick="downloadImage('${imageSrc}', '${title}')">
                    <i class="fas fa-download"></i> Скачать
                </button>
                <button onclick="openCertificateFull('${imageSrc}')">
                    <i class="fas fa-expand"></i> Открыть полностью
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// Вспомогательные функции
function closeModal() {
    const modal = document.querySelector('.certificate-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

function downloadImage(src, filename) {
    const link = document.createElement('a');
    link.href = src;
    link.download = filename || 'certificate.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function openCertificateFull(src) {
    window.open(src, '_blank', 'noopener,noreferrer');
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    console.log('Модуль сертификатов загружен');

    // Добавляем стили для модального окна
    const modalStyles = `
        <style>
            .certificate-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: relative;
                background: #1a1a1a;
                border-radius: 15px;
                padding: 30px;
                max-width: 90%;
                max-height: 90%;
                z-index: 10001;
                border: 1px solid #2a2a2a;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
            }
            
            .modal-close {
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                color: #ffffff;
                font-size: 24px;
                cursor: pointer;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.3s;
            }
            
            .modal-close:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            
            .modal-content h3 {
                color: #ffffff;
                margin-bottom: 20px;
                text-align: center;
            }
            
            .modal-content img {
                max-width: 100%;
                max-height: 500px;
                border-radius: 10px;
                margin-bottom: 20px;
            }
            
            .modal-actions {
                display: flex;
                gap: 15px;
                justify-content: center;
            }
            
            .modal-actions button {
                background: #4a4a4a;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 6px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: background 0.3s;
            }
            
            .modal-actions button:hover {
                background: #666666;
            }
        </style>
    `;

    // Добавляем стили в head
    if (!document.querySelector('#modal-styles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'modal-styles';
        styleEl.textContent = modalStyles;
        document.head.appendChild(styleEl);
    }
});

// Функция открытия модального окна с увеличенным изображением
function openCertificateModal(imageSrc, title) {
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'certificate-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeCertificateModal()"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closeCertificateModal()">
                <i class="fas fa-times"></i>
            </button>
            <h3>${title}</h3>
            <div class="modal-image-container">
                <img src="${imageSrc}" alt="${title}" class="modal-image">
                <div class="zoom-controls">
                    <button class="zoom-btn" onclick="zoomIn()">
                        <i class="fas fa-search-plus"></i>
                    </button>
                    <button class="zoom-btn" onclick="zoomOut()">
                        <i class="fas fa-search-minus"></i>
                    </button>
                    <button class="zoom-btn" onclick="resetZoom()">
                        <i class="fas fa-sync-alt"></i>
                    </button>
                </div>
            </div>
            <div class="modal-actions">
                <button onclick="downloadCertificate('${imageSrc}', '${title}')">
                    <i class="fas fa-download"></i> Скачать
                </button>
                <button onclick="openFullScreen('${imageSrc}')">
                    <i class="fas fa-expand"></i> На весь экран
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Инициализация зума
    let currentZoom = 1;
    const modalImage = modal.querySelector('.modal-image');

    // Функции зума
    window.zoomIn = function () {
        currentZoom += 0.2;
        modalImage.style.transform = `scale(${currentZoom})`;
    };

    window.zoomOut = function () {
        if (currentZoom > 0.3) {
            currentZoom -= 0.2;
            modalImage.style.transform = `scale(${currentZoom})`;
        }
    };

    window.resetZoom = function () {
        currentZoom = 1;
        modalImage.style.transform = 'scale(1)';
    };
}

// Закрытие модального окна
function closeCertificateModal() {
    const modal = document.querySelector('.certificate-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Загрузка изображения
function downloadCertificate(src, filename) {
    const link = document.createElement('a');
    link.href = src;
    link.download = filename.replace(/\s+/g, '_') + '.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Полноэкранный режим
function openFullScreen(src) {
    const fullScreenDiv = document.createElement('div');
    fullScreenDiv.className = 'fullscreen-image';
    fullScreenDiv.innerHTML = `
        <img src="${src}" alt="Сертификат">
        <button class="fullscreen-close" onclick="closeFullScreen()">
            <i class="fas fa-times"></i>
        </button>
    `;
    document.body.appendChild(fullScreenDiv);
    document.body.style.overflow = 'hidden';
}

function closeFullScreen() {
    const fs = document.querySelector('.fullscreen-image');
    if (fs) {
        fs.remove();
        document.body.style.overflow = '';
    }
}

// Закрытие по Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeCertificateModal();
        closeFullScreen();
    }
});

// ============================================
// ФАЙЛ: js/scroll-to-top.js
// Кнопка "Наверх" с плавной прокруткой
// ============================================

(function () {
    'use strict';

    // Создаем кнопку динамически
    function createBackToTopButton() {
        const button = document.createElement('button');
        button.id = 'backToTop';
        button.className = 'back-to-top';
        button.setAttribute('aria-label', 'Прокрутить наверх');
        button.setAttribute('title', 'Наверх');
        button.innerHTML = '<i class="fas fa-chevron-up"></i>';

        // Добавляем на страницу
        document.body.appendChild(button);

        return button;
    }

    // Создаем стили для кнопки
    function addButtonStyles() {
        const styleId = 'back-to-top-styles';

        // Проверяем, не добавлены ли стили уже
        if (document.getElementById(styleId)) return;

        const styles = `
            .back-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: #4a4a4a;
                color: #ffffff;
                border: none;
                border-radius: 50%;
                font-size: 1.2rem;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 999;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 15px rgba(74, 74, 74, 0.3);
            }
            
            .back-to-top.show {
                opacity: 1;
                visibility: visible;
            }
            
            .back-to-top:hover {
                background: #666666;
                transform: translateY(-3px);
                box-shadow: 0 6px 20px rgba(74, 74, 74, 0.4);
            }
            
            .back-to-top:active {
                transform: translateY(-1px);
            }
            
            .back-to-top.clicking {
                animation: bounce 0.5s ease;
            }
            
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            
            @media (max-width: 768px) {
                .back-to-top {
                    bottom: 20px;
                    right: 20px;
                    width: 45px;
                    height: 45px;
                    font-size: 1rem;
                }
            }
            
            @media (max-width: 480px) {
                .back-to-top {
                    bottom: 15px;
                    right: 15px;
                    width: 40px;
                    height: 40px;
                }
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.id = styleId;
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }

    // Показывать/скрывать кнопку при прокрутке
    function toggleButtonVisibility(button) {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollPosition > 300) {
            button.classList.add('show');

            // Опционально: изменение прозрачности
            const maxScroll = 1000;
            const opacity = Math.min(0.9, 0.5 + (scrollPosition / maxScroll) * 0.5);
            button.style.opacity = opacity;
        } else {
            button.classList.remove('show');
        }
    }

    // Плавная прокрутка наверх
    function smoothScrollToTop(button) {
        // Добавляем анимацию клика
        button.classList.add('clicking');
        setTimeout(() => button.classList.remove('clicking'), 500);

        // Вариант 1: Используем нативный smooth scroll (рекомендуется)
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        // Вариант 2: Полифилл для старых браузеров
        const startPosition = window.pageYOffset;
        const startTime = performance.now();
        const duration = 800;

        function animateScroll(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            // Easing функция для плавности
            const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

            window.scrollTo(0, startPosition * (1 - easeOutCubic(progress)));

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
    }

    // Добавляем плавную прокрутку для всех якорных ссылок
    function addSmoothScrollToAnchors() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                // Пропускаем пустые ссылки и ссылки наверх
                if (href === '#' || href === '#top') return;

                e.preventDefault();

                const targetElement = document.querySelector(href);
                if (!targetElement) return;

                // Учитываем высоту фиксированной шапки (если есть)
                const header = document.querySelector('header, .navbar, .header');
                const headerHeight = header ? header.offsetHeight : 0;

                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Обновляем URL без перезагрузки
                history.pushState(null, null, href);
            });
        });
    }

    // Основная функция инициализации
    function initScrollToTop() {
        console.log('Инициализация кнопки "Наверх"...');

        // Добавляем стили
        addButtonStyles();

        // Создаем кнопку
        const backToTopButton = createBackToTopButton();

        // Обработчик прокрутки
        window.addEventListener('scroll', function () {
            toggleButtonVisibility(backToTopButton);
        });

        // Обработчик клика
        backToTopButton.addEventListener('click', function (e) {
            e.preventDefault();
            smoothScrollToTop(backToTopButton);
        });

        // Добавляем плавную прокрутку для якорных ссылок
        addSmoothScrollToAnchors();

        // Проверяем начальную позицию
        setTimeout(() => toggleButtonVisibility(backToTopButton), 100);

        console.log('Кнопка "Наверх" инициализирована');
    }

    // Инициализируем когда DOM загружен
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollToTop);
    } else {
        initScrollToTop();
    }

    // Экспортируем функции (для использования в других модулях)
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            initScrollToTop,
            smoothScrollToTop,
            addSmoothScrollToAnchors
        };
    }

    // Добавляем в глобальную область видимости (если нужно)
    window.ScrollToTop = {
        init: initScrollToTop,
        scrollToTop: smoothScrollToTop,
        scrollToElement: function (selector) {
            const element = document.querySelector(selector);
            if (element) {
                window.scrollTo({
                    top: element.offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    };

})();


function handleFormSubmit(event) {
    event.preventDefault();

    // Отправляем форму
    fetch(event.target.action, {
        method: 'POST',
        body: new FormData(event.target)
    })
        .then(response => {
            if (response.ok) {
                // Сохраняем флаг успешной отправки
                localStorage.setItem('showSuccessMessage', 'true');

                // ПЕРЕНАПРАВЛЯЕМ САМИ НА СЕБЯ - это очистит форму
                window.location.href = window.location.pathname + '?submitted=true#contact';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

    return false;
}

// При загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    // Проверяем параметр в URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submitted') === 'true') {
        // Показываем сообщение об успехе
        showSuccessMessage();

        // Убираем параметр из URL
        history.replaceState(null, '', window.location.pathname + '#contact');
    }

    // Всегда очищаем форму при загрузке
    const form = document.getElementById('contactForm');
    if (form) {
        form.reset();

        // Явная очистка каждого поля
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = false;
            } else if (input.type !== 'hidden') {
                input.value = '';
            }
        });
    }
});

// Файл: js/form-modal.js
// Обработка формы и модального окна

document.addEventListener('DOMContentLoaded', function() {
    // Обновляем год в футере
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Инициализация формы
    initContactForm();
    
    // Инициализация модального окна
    initModal();
});

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!contactForm || !submitBtn) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Сохраняем оригинальный текст кнопки
        const originalBtnText = submitBtn.innerHTML;
        
        // Показываем индикатор загрузки
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        submitBtn.disabled = true;
        
        // Скрываем предыдущие сообщения
        const formMessage = document.getElementById('formMessage');
        if (formMessage) {
            formMessage.style.display = 'none';
            formMessage.textContent = '';
        }
        
        // Отправляем форму через Fetch API
        fetch(this.action, {
            method: 'POST',
            body: new FormData(this),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Успешная отправка
                handleFormSuccess(contactForm);
            } else {
                // Ошибка отправки
                showFormMessage('error', '❌ Ошибка при отправке. Пожалуйста, попробуйте еще раз.');
            }
        })
        .catch(error => {
            // Сетевая ошибка
            console.error('Form submission error:', error);
            showFormMessage('error', '⚠️ Сетевая ошибка. Проверьте подключение к интернету.');
        })
        .finally(() => {
            // Восстанавливаем кнопку
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}

function handleFormSuccess(form) {
    // Очищаем форму
    form.reset();
    
    // Сбрасываем чекбокс
    const privacyCheckbox = document.getElementById('privacy');
    if (privacyCheckbox) {
        privacyCheckbox.checked = false;
    }
    
    // Показываем модальное окно
    showSuccessModal();
}

function showFormMessage(type, text) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        
        // Автоматическое скрытие через 5 секунд (только для ошибок)
        if (type === 'error') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
}

function initModal() {
    const modal = document.getElementById('successModal');
    if (!modal) return;
    
    // Изначально скрываем модальное окно
    modal.style.display = 'none';
    
    // Закрытие по клику на крестик
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSuccessModal);
    }
    
    // Закрытие по клику на кнопку "Понятно"
    const closeBtn2 = modal.querySelector('.modal-close-btn');
    if (closeBtn2) {
        closeBtn2.addEventListener('click', closeSuccessModal);
    }
    
    // Закрытие по клику на overlay
    const overlay = modal.querySelector('.modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeSuccessModal);
    }
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSuccessModal();
        }
    });
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку
        
        // Автоматическое закрытие через 10 секунд
        setTimeout(() => {
            if (modal.style.display === 'flex') {
                closeSuccessModal();
            }
        }, 10000);
    }
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Разблокируем прокрутку
    }
}

// Файл: js/mobile-menu.js
document.addEventListener('DOMContentLoaded', function() {
    // Элементы меню
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const overlay = document.createElement('div');
    
    // Создаем overlay для затемнения фона
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // Переключение меню
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    // Закрытие меню
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Открытие/закрытие по клику на гамбургер
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    
    // Закрытие по клику на overlay
    overlay.addEventListener('click', closeMenu);
    
    // Закрытие по клику на ссылки в меню
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Если ссылка ведет на якорь на этой же странице
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Закрываем меню
                    closeMenu();
                    
                    // Плавная прокрутка к цели
                    setTimeout(() => {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            } else {
                // Если ссылка ведет на другую страницу, просто закрываем меню
                closeMenu();
            }
        });
    });
    
    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Автоматическое закрытие меню при изменении размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Активный пункт меню при прокрутке
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // Инициализация при загрузке
    console.log('Мобильное меню инициализировано');
});

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Функция фильтрации проектов
    function filterProjects(filterValue) {
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                // Показываем элемент
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                // Скрываем элемент с анимацией
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Обработчик кликов для кнопок фильтра
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            // Получаем значение фильтра
            const filterValue = this.getAttribute('data-filter');
            
            // Применяем фильтр
            filterProjects(filterValue);
        });
    });
    
    // Инициализация: показываем все проекты
    portfolioItems.forEach(item => {
        item.style.display = 'block';
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
        item.style.transition = 'all 0.3s ease';
    });
    
    // Добавляем эффект при наведении на карточки
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
});