// ============================================
// NOSOTROS PAGE - Interactive JavaScript
// ============================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando página Nosotros...');
    
    // Inicializar todas las funciones
    initAnimateNumbers();
    initModals();
    initScrollAnimations();
    initParallax();
    initSmoothScroll();
    initTeamCarousel();
    
    console.log('✅ Página Nosotros inicializada correctamente');
});

// Animación de números (contador animado)
function initAnimateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) {
        console.log('⚠️ No se encontraron elementos .stat-number');
        return;
    }
    
    console.log(`📊 Encontrados ${statNumbers.length} contadores`);
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-target'));
                
                if (isNaN(target)) {
                    console.error('❌ data-target no es un número válido:', element);
                    return;
                }
                
                console.log(`🎯 Animando contador a: ${target}`);
                
                const duration = 2000; // 2 segundos
                const increment = target / (duration / 16); // 60fps
                let current = 0;

                const updateNumber = () => {
                    current += increment;
                    if (current < target) {
                        element.textContent = Math.floor(current);
                        requestAnimationFrame(updateNumber);
                    } else {
                        element.textContent = target;
                    }
                };

                updateNumber();
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    statNumbers.forEach(number => {
        observer.observe(number);
    });
}

// Sistema de Modales
function initModals() {
    const modalButtons = document.querySelectorAll('.btn-politica');
    const certCards = document.querySelectorAll('.cert-card[data-cert]');
    const modals = document.querySelectorAll('.modal-overlay');
    const closeButtons = document.querySelectorAll('.modal-close');

    if (modalButtons.length === 0) {
        console.log('⚠️ No se encontraron botones .btn-politica');
    } else {
        console.log(`🪟 Encontrados ${modalButtons.length} botones de modal`);
    }

    if (certCards.length > 0) {
        console.log(`🏆 Encontradas ${certCards.length} tarjetas de certificación clicables`);
    }

    // Abrir modales de políticas
    modalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(`modal-${modalId}`);
            
            if (modal) {
                console.log(`📂 Abriendo modal: ${modalId}`);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                console.error(`❌ No se encontró el modal: modal-${modalId}`);
            }
        });
    });

    // Abrir modales de certificaciones
    certCards.forEach(card => {
        card.addEventListener('click', function() {
            const certId = this.getAttribute('data-cert');
            const modal = document.getElementById(`modal-cert-${certId}`);
            
            if (modal) {
                console.log(`🏆 Abriendo certificado: ${certId}`);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                console.error(`❌ No se encontró el modal: modal-cert-${certId}`);
            }
        });
    });

    // Manejar descarga forzada de PDFs
    initPDFDownloads();

    // Cerrar modales
    function closeModal(modal) {
        if (modal) {
            console.log('❌ Cerrando modal');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    // Cerrar al hacer click fuera del contenido
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    closeModal(modal);
                }
            });
        }
    });
}

// Función para forzar descarga de PDFs
function initPDFDownloads() {
    const downloadButtons = document.querySelectorAll('.btn-download-pdf-large');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const pdfUrl = this.getAttribute('href');
            const fileName = this.getAttribute('download');
            
            console.log(`📥 Descargando: ${fileName}`);
            
            // Forzar descarga usando fetch y blob
            fetch(pdfUrl)
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                    console.log(`✅ Descarga iniciada: ${fileName}`);
                })
                .catch(error => {
                    console.error('❌ Error al descargar:', error);
                    // Si fetch falla, abrir en nueva pestaña como fallback
                    window.open(pdfUrl, '_blank');
                });
        });
    });
    
    console.log(`📥 Configurados ${downloadButtons.length} botones de descarga de PDF`);
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.animate-fade-up, .animate-fade-right, .animate-fade-left, .animate-scale, .animate-float'
    );

    if (animatedElements.length === 0) {
        return;
    }

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

// Efecto parallax suave en el video hero
function initParallax() {
    const hero = document.querySelector('.nosotros-hero');
    const heroVideo = document.querySelector('.hero-video');
    
    if (hero && heroVideo) {
        window.addEventListener('scroll', function() {
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

// Detectar si el usuario está en un dispositivo móvil
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Ajustar video en móviles
if (isMobile()) {
    const video = document.querySelector('.hero-video');
    if (video) {
        video.removeAttribute('autoplay');
        video.setAttribute('poster', 'images/video-poster.jpg');
    }
}

// Carrusel del Equipo
function initTeamCarousel() {
    const slides = document.querySelectorAll('.team-slide');
    const dots = document.querySelectorAll('.team-carousel-dot');
    const prevBtn = document.querySelector('.team-carousel-prev');
    const nextBtn = document.querySelector('.team-carousel-next');
    
    if (slides.length === 0) {
        console.log('⚠️ No se encontró el carrusel del equipo');
        return;
    }
    
    console.log(`👥 Carrusel del equipo inicializado con ${slides.length} slides`);
    
    let currentSlide = 0;
    const slideInterval = 5000; // 5 segundos
    let carouselTimer;

    function showSlide(n) {
        // Remover clase active de todos
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Calcular índice correcto
        currentSlide = (n + slides.length) % slides.length;
        
        // Añadir clase active
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        console.log(`👥 Mostrando slide ${currentSlide + 1}/${slides.length}`);
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Auto-advance
    function startAutoPlay() {
        carouselTimer = setInterval(nextSlide, slideInterval);
    }

    function stopAutoPlay() {
        clearInterval(carouselTimer);
    }

    // Iniciar autoplay
    startAutoPlay();

    // Navegación con flechas
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }

    // Navegación con dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // Pausar al hacer hover
    const carouselContainer = document.querySelector('.team-carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }

    // Soporte para gestos táctiles en móvil
    let touchStartX = 0;
    let touchEndX = 0;

    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swipe izquierda - siguiente
                nextSlide();
                stopAutoPlay();
                startAutoPlay();
            }
            if (touchEndX > touchStartX + 50) {
                // Swipe derecha - anterior
                prevSlide();
                stopAutoPlay();
                startAutoPlay();
            }
        }
    }
}

// Mensajes de consola
console.log('%c✅ JavaScript de Nosotros cargado', 'color: #6DB33F; font-weight: bold; font-size: 14px;');
console.log('%c📱 Contáctanos: +51 905 447 656', 'color: #003B5C; font-size: 12px;');