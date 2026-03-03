// ============================================
// PRODUCTOS PAGE - Interactive JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando página Productos...');

    // Inicializar todas las funciones
    initFilters();
    initScrollAnimations();
    initSmoothScroll();
    initCarousel(); // Carrusel (ahora soporta múltiples)

    console.log('Página Productos inicializada correctamente');
});

// ============================================
// SISTEMA DE CARRUSEL AUTOMÁTICO (MULTI-CARRUSEL)
// ============================================

function initCarousel() {
    console.log('Intentando inicializar carruseles...');

    // ✅ AHORA: selecciona TODOS los carruseles
    const carousels = document.querySelectorAll('.producto-carousel');

    if (carousels.length === 0) {
        console.log('No se encontró .producto-carousel en la página');
        return;
    }

    console.log(`Se encontraron ${carousels.length} carrusel(es). Inicializando...`);

    // ✅ Inicializar cada carrusel por separado (estado independiente)
    carousels.forEach((carousel, carouselIndex) => {
        console.log(`Inicializando carrusel #${carouselIndex + 1}`, carousel);

        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const indicators = carousel.querySelectorAll('.indicator');
        const prevBtn = carousel.querySelector('.carousel-control.prev');
        const nextBtn = carousel.querySelector('.carousel-control.next');

        console.log('Elementos encontrados:');
        console.log('- Track:', track);
        console.log('- Slides:', slides.length);
        console.log('- Indicators:', indicators.length);
        console.log('- Prev button:', prevBtn);
        console.log('- Next button:', nextBtn);

        if (slides.length === 0) {
            console.log('No hay slides en este carrusel');
            return;
        }

        // ✅ Opcional: si no hay indicadores, no rompemos nada
        // (pero si quieres círculos, deben estar en el HTML)
        if (indicators.length > 0 && indicators.length !== slides.length) {
            console.warn(
                `⚠️ Carrusel #${carouselIndex + 1}: slides (${slides.length}) != indicators (${indicators.length}). ` +
                `Asegúrate de agregar un <span class="indicator"> por cada slide.`
            );
        }

        let currentSlide = 0;
        let autoplayInterval;

        // ✅ Aquí cambias los segundos (en milisegundos)
        // 3000 = 3s, 5000 = 5s, etc.
        const AUTOPLAY_DELAY = 3000;

        // Mostrar un slide específico
        function showSlide(index) {
            if (index >= slides.length) currentSlide = 0;
            else if (index < 0) currentSlide = slides.length - 1;
            else currentSlide = index;

            slides.forEach(slide => slide.classList.remove('active'));
            slides[currentSlide].classList.add('active');

            // indicadores (si existen)
            if (indicators.length > 0) {
                indicators.forEach(indicator => indicator.classList.remove('active'));
                if (indicators[currentSlide]) indicators[currentSlide].classList.add('active');
            }

            console.log(`Carrusel #${carouselIndex + 1}: mostrando slide ${currentSlide + 1} de ${slides.length}`);
        }

        function nextSlide() { showSlide(currentSlide + 1); }
        function prevSlide() { showSlide(currentSlide - 1); }

        function startAutoplay() {
            stopAutoplay();
            autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
            console.log(`Carrusel #${carouselIndex + 1}: autoplay iniciado (${AUTOPLAY_DELAY}ms)`);
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
                console.log(`Carrusel #${carouselIndex + 1}: autoplay detenido`);
            }
        }

        // Controles (si existen)
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoplay();
                setTimeout(startAutoplay, 8000);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoplay();
                setTimeout(startAutoplay, 8000);
            });
        }

        // Indicadores (si existen)
        if (indicators.length > 0) {
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    showSlide(index);
                    stopAutoplay();
                    setTimeout(startAutoplay, 8000);
                });
            });
        }

        // Hover pause/reanudar
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        // Gestos táctiles (móvil)
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoplay();
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            setTimeout(startAutoplay, 8000);
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) nextSlide(); // izquierda
                else prevSlide();          // derecha
            }
        }

        // Teclado (solo si el mouse está encima del carrusel actual)
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

        // Pestaña visible/invisible (aplica a todos, pero no rompe)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stopAutoplay();
            else startAutoplay();
        });

        // Iniciar carrusel
        showSlide(0);
        startAutoplay();
    });
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
                categories.forEach(category => {
                    const categoryId = category.getAttribute('id');
                    if (categoryId === filter) category.style.display = 'block';
                    else category.style.display = 'none';
                });

                productCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filter) {
                        card.classList.remove('hidden');
                        animateCard(card);
                    } else {
                        card.classList.add('hidden');
                    }
                });

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

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) scrollBtn.style.display = 'flex';
        else scrollBtn.style.display = 'none';
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

window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd -
                     window.performance.timing.navigationStart;
    console.log(`⚡ Página cargada en ${loadTime}ms`);
});

// ============================================
// UTILIDADES
// ============================================

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