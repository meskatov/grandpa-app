// ===== УТИЛИТА: ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ =====
function switchScreen(screenId) {
    // Скрываем все экраны
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    
    // Показываем нужный
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add('active');
        target.scrollTop = 0;
    }
}

// ===== ЭКРАН АКТИВАЦИИ → ПРИВЕТСТВИЕ =====
document.getElementById('btn-activate').addEventListener('click', function() {
    switchScreen('screen-greeting');
    createParticles();
    
    // Кнопка "Продолжить" появляется после анимаций текста
    setTimeout(() => {
        const btnContinue = document.getElementById('btn-continue');
        btnContinue.style.opacity = '1';
        btnContinue.style.transform = 'translateY(0)';
    }, 5000);
});

// ===== КНОПКА "ПРОДОЛЖИТЬ" НА ЭКРАНЕ ПРИВЕТСТВИЯ =====
document.getElementById('btn-continue').addEventListener('click', function() {
    switchScreen('screen-childhood');
});

// ===== ГЕНЕРАЦИЯ ЧАСТИЦ ДЛЯ ЭКРАНА ПРИВЕТСТВИЯ =====
function createParticles() {
    const container = document.getElementById('particles');
    container.innerHTML = '';
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = (100 + Math.random() * 40) + '%';
        particle.style.setProperty('--drift', (Math.random() - 0.5) * 250 + 'px');
        
        const size = 2 + Math.random() * 6;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particle.style.animationDuration = (3 + Math.random() * 8) + 's';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.opacity = (0.3 + Math.random() * 0.7);
        
        container.appendChild(particle);
    }
}

// ===== НАВИГАЦИЯ ПО ВСЕМ ЭТАПАМ =====
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const nextScreen = this.getAttribute('data-next');
        if (nextScreen) {
            switchScreen(nextScreen);
            
            // Если перешли на финал — создаём листья
            if (nextScreen === 'screen-final') {
                setTimeout(() => {
                    createLeaves();
                }, 400);
            }
        }
    });
});

// ===== ВИДЕО: ПОКАЗ КНОПКИ ПОСЛЕ ПРОСМОТРА =====
const video = document.getElementById('greeting-video');
const btnAfterVideo = document.getElementById('btn-after-video');

if (video && btnAfterVideo) {
    // Изначально кнопка скрыта
    btnAfterVideo.style.display = 'none';
    
    // Функция показа кнопки
    function showVideoButton() {
        btnAfterVideo.style.display = 'inline-block';
        btnAfterVideo.style.opacity = '0';
        btnAfterVideo.style.transform = 'translateY(20px)';
        
        // Запускаем анимацию через кадр
        requestAnimationFrame(() => {
            btnAfterVideo.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            btnAfterVideo.style.opacity = '1';
            btnAfterVideo.style.transform = 'translateY(0)';
        });
    }
    
    // Показываем, когда видео закончилось
    video.addEventListener('ended', showVideoButton);
    
    // Или когда досмотрели до 95%
    video.addEventListener('timeupdate', function() {
        if (video.duration > 0 && video.currentTime / video.duration >= 0.95) {
            showVideoButton();
        }
    });
    
    // Кнопка ведёт на финал
    btnAfterVideo.addEventListener('click', function() {
        video.pause();
        switchScreen('screen-final');
        setTimeout(() => {
            createLeaves();
        }, 400);
    });
}

// ===== ЛИСТЬЯ ДЕРЕВА (ФИНАЛ) =====
function createLeaves() {
    const container = document.getElementById('tree-leaves');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < 35; i++) {
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        leaf.style.left = (Math.random() * 240 - 20) + 'px';
        leaf.style.top = (-Math.random() * 40) + 'px';
        leaf.style.setProperty('--drift', (Math.random() - 0.5) * 180 + 'px');
        leaf.style.setProperty('--spin', (Math.random() * 720 - 360) + 'deg');
        leaf.style.animationDuration = (3 + Math.random() * 6) + 's';
        leaf.style.animationDelay = Math.random() * 5 + 's';
        
        const size = 4 + Math.random() * 10;
        leaf.style.width = size + 'px';
        leaf.style.height = size + 'px';
        
        container.appendChild(leaf);
        
        // Циклическое повторение анимации
        setInterval(() => {
            leaf.style.animation = 'none';
            leaf.offsetHeight; // reflow
            leaf.style.animation = `leafFall ${3 + Math.random() * 6}s linear forwards`;
            leaf.style.animationDelay = Math.random() * 2 + 's';
        }, 7000 + Math.random() * 5000);
    }
}

// ===== КНОПКА "ОБНЯТЬ ДЕДУШКУ" =====
document.getElementById('btn-hug').addEventListener('click', function() {
    createHearts();
    
    // Вибрация (если поддерживается)
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 200]);
    }
    
    // Меняем текст
    const originalHTML = this.innerHTML;
    this.innerHTML = '<span>🤍 Крепко обнимаю!</span><span class="btn-shine"></span>';
    
    setTimeout(() => {
        this.innerHTML = originalHTML;
    }, 2500);
});

// ===== ГЕНЕРАЦИЯ СЕРДЕЧЕК =====
function createHearts() {
    const container = document.getElementById('hearts-container');
    if (!container) return;
    
    const hearts = ['🤍', '✨', '💛', '🌟', '💝', '🕊️', '💫'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = (15 + Math.random() * 70) + '%';
            heart.style.bottom = '5%';
            heart.style.setProperty('--drift', (Math.random() - 0.5) * 250 + 'px');
            heart.style.animationDuration = (2 + Math.random() * 5) + 's';
            heart.style.fontSize = (20 + Math.random() * 40) + 'px';
            
            container.appendChild(heart);
            
            // Удаление после завершения анимации
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, 6000);
        }, i * 50);
    }
}

// ===== SERVICE WORKER (PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => console.log('✅ Service Worker зарегистрирован'))
            .catch(err => console.log('⚠️ Ошибка Service Worker:', err));
    });
}

// ===== ПРЕДОТВРАЩЕНИЕ ЗУМА НА ДВОЙНОЙ ТАП =====
document.addEventListener('dblclick', function(e) {
    e.preventDefault();
}, { passive: false });

// ===== БЛОКИРОВКА ЖЕСТОВ НАЗАД В БРАУЗЕРЕ =====
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});