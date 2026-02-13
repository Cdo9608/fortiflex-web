// ============================================
// NOSOTROS PAGE - Interactive JavaScript
// ============================================

// Animación de números (contador animado)
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000; // 2 segundos
                const increment = target / (duration / 16); // 60fps
                let current = 0;

                const updateNumber = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = Math.floor(current);
                        requestAnimationFrame(updateNumber);
                    } else {
                        entry.target.textContent = target;
                    }
                };

                updateNumber();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(number => {
        observer.observe(number);
    });
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.animate-fade-up, .animate-fade-right, .animate-fade-left, .animate-scale, .animate-float'
    );

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Sistema de Modales
function initModals() {
    const modalButtons = document.querySelectorAll('.btn-politica');
    const modals = document.querySelectorAll('.modal-overlay');
    const closeButtons = document.querySelectorAll('.modal-close');

    // Abrir modales
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(`modal-${modalId}`);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevenir scroll del body
            }
        });
    });

    // Cerrar modales
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    // Cerrar al hacer click fuera del contenido
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    closeModal(modal);
                }
            });
        }
    });
}

// Efecto parallax suave en el video hero
function initParallax() {
    const hero = document.querySelector('.nosotros-hero');
    const heroVideo = document.querySelector('.hero-video');
    
    if (hero && heroVideo) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < hero.offsetHeight) {
                heroVideo.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
}

// Smooth scroll para enlaces internos
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Efecto hover en las tarjetas de certificación
function initCertCardEffects() {
    const certCards = document.querySelectorAll('.cert-card');
    
    certCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.setProperty('--hover-scale', '1.05');
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Animación de entrada para las tarjetas de Misión y Visión
function initMVCardAnimations() {
    const mvCards = document.querySelectorAll('.mv-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    mvCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });
}

// Preload de imágenes del modal para carga rápida
function preloadModalImages() {
    const modalImages = [
        'images/politica-calidad.jpg',
        'images/seguridad-salud.jpg'
    ];

    modalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Tracking de eventos (para analytics)
function initEventTracking() {
    // Track clicks en botones de políticas
    const politicaButtons = document.querySelectorAll('.btn-politica');
    politicaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalType = button.getAttribute('data-modal');
            console.log(`Modal abierto: ${modalType}`);
            // Aquí puedes agregar tu código de Google Analytics o similar
        });
    });

    // Track tiempo en la página
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        console.log(`Tiempo en página Nosotros: ${timeSpent} segundos`);
    });
}

// Efecto de video: pausar cuando no está visible
function initVideoVisibility() {
    const video = document.querySelector('.hero-video');
    
    if (video) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(video);
    }
}

// Inicializar todas las funciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Página Nosotros cargada - FORTIFLEX PERÚ');
    
    // Inicializar todas las funcionalidades
    animateNumbers();
    initScrollAnimations();
    initModals();
    initParallax();
    initSmoothScroll();
    initCertCardEffects();
    initMVCardAnimations();
    preloadModalImages();
    initEventTracking();
    initVideoVisibility();
    
    // Marcar navegación activa
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'nosotros.html') {
            link.classList.add('active');
        }
    });
});

// Lazy loading para el video (carga diferida en móviles)
if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                if (video.dataset.src) {
                    video.src = video.dataset.src;
                    video.load();
                    videoObserver.unobserve(video);
                }
            }
        });
    });

    const lazyVideos = document.querySelectorAll('video[data-src]');
    lazyVideos.forEach(video => videoObserver.observe(video));
}

// Performance: detectar si el usuario está en un dispositivo móvil
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Ajustar calidad del video en móviles
if (isMobile()) {
    const video = document.querySelector('.hero-video');
    if (video) {
        // En móviles, usar poster image en lugar de autoplay
        video.removeAttribute('autoplay');
        video.setAttribute('poster', 'images/video-poster.jpg');
    }
}

// Mensaje de consola
console.log('%c✅ Página Nosotros inicializada correctamente', 'color: #6DB33F; font-weight: bold; font-size: 14px;');
console.log('%c📱 Contáctanos: +51 905 447 656', 'color: #003B5C; font-size: 12px;');
