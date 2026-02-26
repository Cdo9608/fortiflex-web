// ============================================
// PRODUCTOS PAGE - Interactive JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando página Productos...');
    
    // Inicializar todas las funciones
    initFilters();
    initScrollAnimations();
    initSmoothScroll();
    initCarousel(); // Nueva función para el carrusel
    
    console.log('✅ Página Productos inicializada correctamente');
});

// ============================================
// SISTEMA DE CARRUSEL AUTOMÁTICO
// ============================================

function initCarousel() {
    console.log('🎠 Intentando inicializar carrusel...');
    
    const carousel = document.querySelector('.producto-carousel');
    if (!carousel) {
        console.log('⚠️ No se encontró .producto-carousel en la página');
        return;
    }
    console.log('✅ Carrusel encontrado:', carousel);

    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = carousel.querySelectorAll('.indicator');
    const prevBtn = carousel.querySelector('.carousel-control.prev');
    const nextBtn = carousel.querySelector('.carousel-control.next');

    console.log('📊 Elementos encontrados:');
    console.log('- Track:', track);
    console.log('- Slides:', slides.length);
    console.log('- Indicators:', indicators.length);
    console.log('- Prev button:', prevBtn);
    console.log('- Next button:', nextBtn);

    if (slides.length === 0) {
        console.log('⚠️ No hay slides en el carrusel');
        return;
    }

    console.log(`🎠 Carrusel inicializado correctamente con ${slides.length} slides`);

    let currentSlide = 0;
    let autoplayInterval;
    const AUTOPLAY_DELAY = 3000; // 4 segundos entre cambios

    // Función para mostrar un slide específico
    function showSlide(index) {
        // Normalizar el índice
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Remover clase active de todos los slides e indicadores
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Agregar clase active al slide e indicador actual
        slides[currentSlide].classList.add('active');
        if (indicators[currentSlide]) {
            indicators[currentSlide].classList.add('active');
        }

        console.log(`📍 Mostrando slide ${currentSlide + 1} de ${slides.length}`);
    }

    // Función para ir al siguiente slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Función para ir al slide anterior
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Iniciar autoplay
    function startAutoplay() {
        stopAutoplay(); // Detener cualquier autoplay existente
        autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
        console.log('▶️ Autoplay iniciado');
    }

    // Detener autoplay
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            console.log('⏸️ Autoplay detenido');
        }
    }

    // Event listeners para los controles
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoplay();
            setTimeout(startAutoplay, 8000); // Reiniciar autoplay después de 8s
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoplay();
            setTimeout(startAutoplay, 8000); // Reiniciar autoplay después de 8s
        });
    }

    // Event listeners para los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopAutoplay();
            setTimeout(startAutoplay, 8000); // Reiniciar autoplay después de 8s
        });
    });

    // Pausar autoplay cuando el mouse está sobre el carrusel
    carousel.addEventListener('mouseenter', () => {
        stopAutoplay();
    });

    // Reanudar autoplay cuando el mouse sale del carrusel
    carousel.addEventListener('mouseleave', () => {
        startAutoplay();
    });

    // Pausar autoplay cuando la pestaña no está visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    // Soporte para gestos táctiles (móviles)
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        setTimeout(startAutoplay, 8000);
    });

    function handleSwipe() {
        const swipeThreshold = 50; // Píxeles mínimos para considerar un swipe
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe izquierda - siguiente
                nextSlide();
            } else {
                // Swipe derecha - anterior
                prevSlide();
            }
        }
    }

    // Soporte para teclado
    document.addEventListener('keydown', (e) => {
        if (!carousel.matches(':hover')) return;

        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoplay();
            setTimeout(startAutoplay, 8000);
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoplay();
            setTimeout(startAutoplay, 8000);
        }
    });

    // Iniciar el carrusel
    showSlide(0);
    startAutoplay();
}

// ============================================
// SISTEMA DE FILTROS
// ============================================

function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.producto-card');
    const productCardsLarge = document.querySelectorAll('.producto-card-large');
    const categories = document.querySelectorAll('.productos-category');

    if (filterButtons.length === 0) {
        console.log('⚠️ No se encontraron botones de filtro');
        return;
    }

    console.log(`🔍 Inicializado sistema de filtros con ${filterButtons.length} botones`);

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Remover active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar active al botón clickeado
            this.classList.add('active');
            
            console.log(`🔍 Filtrando por: ${filter}`);
            
            // Filtrar productos
            if (filter === 'all') {
                // Mostrar todas las categorías
                categories.forEach(category => {
                    category.style.display = 'block';
                });
                productCards.forEach(card => {
                    card.classList.remove('hidden');
                    animateCard(card);
                });
                productCardsLarge.forEach(card => {
                    card.classList.remove('hidden');
                    animateCard(card);
                });
            } else {
                // Mostrar solo la categoría seleccionada
                categories.forEach(category => {
                    const categoryId = category.getAttribute('id');
                    if (categoryId === filter) {
                        category.style.display = 'block';
                    } else {
                        category.style.display = 'none';
                    }
                });
                
                // Filtrar tarjetas normales
                productCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (cardCategory === filter) {
                        card.classList.remove('hidden');
                        animateCard(card);
                    } else {
                        card.classList.add('hidden');
                    }
                });
                
                // Filtrar tarjetas grandes
                productCardsLarge.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (cardCategory === filter) {
                        card.classList.remove('hidden');
                        animateCard(card);
                    } else {
                        card.classList.add('hidden');
                    }
                });
            }
            
            // Scroll suave a la sección de productos
            const productosSection = document.querySelector('.productos-section');
            if (productosSection) {
                const offsetTop = productosSection.offsetTop - 150;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animar entrada de tarjetas
function animateCard(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
}

// ============================================
// ANIMACIONES AL HACER SCROLL
// ============================================

function initScrollAnimations() {
    const elements = document.querySelectorAll('.producto-card, .producto-card-large, .category-header');
    
    if (elements.length === 0) {
        console.log('⚠️ No se encontraron elementos para animar');
        return;
    }

    console.log(`🎬 Inicializadas animaciones de scroll para ${elements.length} elementos`);

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// ============================================
// SCROLL SUAVE PARA NAVEGACIÓN
// ============================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    if (links.length === 0) {
        console.log('ℹ️ No se encontraron enlaces de anclaje');
        return;
    }

    console.log(`🔗 Inicializado scroll suave para ${links.length} enlaces`);

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const offsetTop = targetElement.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                console.log(`📍 Scroll a: ${targetId}`);
            }
        });
    });
}

// ============================================
// FUNCIÓN DE COTIZACIÓN (VÍA WHATSAPP)
// ============================================

function cotizarProducto(nombreProducto) {
    const telefono = '51905447656';
    const mensaje = `Hola, estoy interesado en obtener una cotización para: ${nombreProducto}`;
    const url = `https://api.whatsapp.com/send?phone=${telefono}&text=${encodeURIComponent(mensaje)}`;
    
    console.log(`💬 Abriendo WhatsApp para cotizar: ${nombreProducto}`);
    
    window.open(url, '_blank');
}

// ============================================
// SCROLL TO TOP
// ============================================

// Crear botón scroll to top si no existe
function createScrollToTopButton() {
    const existingBtn = document.getElementById('scrollToTop');
    if (existingBtn) return;

    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scrollToTop';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px rgba(0, 102, 161, 0.4);
        z-index: 1000;
        transition: all 0.3s ease;
    `;

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-5px)';
        scrollBtn.style.boxShadow = '0 6px 20px rgba(0, 102, 161, 0.5)';
    });

    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.boxShadow = '0 4px 15px rgba(0, 102, 161, 0.4)';
    });

    document.body.appendChild(scrollBtn);

    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    console.log('⬆️ Botón scroll to top creado');
}

// Inicializar botón scroll to top
createScrollToTopButton();

// ============================================
// LAZY LOADING DE IMÁGENES
// ============================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) {
        console.log('ℹ️ No hay imágenes con lazy loading');
        return;
    }

    console.log(`🖼️ Inicializado lazy loading para ${images.length} imágenes`);

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

initLazyLoading();

// ============================================
// PERFORMANCE MONITORING
// ============================================

// Log de tiempo de carga
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                     window.performance.timing.navigationStart;
    console.log(`⚡ Página cargada en ${loadTime}ms`);
});

// ============================================
// UTILIDADES
// ============================================

// Detectar dispositivo móvil
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobile()) {
    console.log('📱 Dispositivo móvil detectado');
    document.body.classList.add('is-mobile');
} else {
    console.log('💻 Dispositivo de escritorio detectado');
    document.body.classList.add('is-desktop');
}

// Exportar funciones para uso global
window.cotizarProducto = cotizarProducto;