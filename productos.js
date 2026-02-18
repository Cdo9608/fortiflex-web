// ============================================
// PRODUCTOS PAGE - Interactive JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando página Productos...');
    
    // Inicializar todas las funciones
    initFilters();
    initScrollAnimations();
    initSmoothScroll();
    
    console.log('✅ Página Productos inicializada correctamente');
});

// ============================================
// SISTEMA DE FILTROS
// ============================================

function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.producto-card');
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
                
                // Filtrar tarjetas
                productCards.forEach(card => {
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
// FUNCIÓN DE COTIZACIÓN POR WHATSAPP
// ============================================

function cotizarProducto(nombreProducto) {
    console.log(`📱 Cotizando producto: ${nombreProducto}`);
    
    // Preparar mensaje para WhatsApp
    const mensaje = `🔷 *SOLICITUD DE COTIZACIÓN - FORTIFLEX*

📦 *Producto:* ${nombreProducto}

👤 *Nombre:* [Por favor ingresa tu nombre]
🏢 *Empresa:* [Nombre de tu empresa]
📧 *Email:* [Tu correo electrónico]
📞 *Teléfono:* [Tu número de contacto]

💬 *Consulta:*
[Describe tu proyecto o necesidad]

---
_Enviado desde www.fortiflex.com.pe/productos_`;

    // Número de WhatsApp de FORTIFLEX
    const whatsappNumber = '51905447656';
    
    // Crear URL de WhatsApp
    const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(mensaje)}`;
    
    // Abrir WhatsApp en nueva pestaña
    window.open(whatsappURL, '_blank');
    
    // Tracking de evento (opcional - para analytics)
    trackEvent('Cotización', 'Click', nombreProducto);
}

// ============================================
// ANIMACIONES AL HACER SCROLL
// ============================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.producto-card, .category-header'
    );

    if (animatedElements.length === 0) {
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(element);
    });
}

// ============================================
// SMOOTH SCROLL PARA ENLACES INTERNOS
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 150;
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

// ============================================
// TRACKING DE EVENTOS (Para Analytics)
// ============================================

function trackEvent(category, action, label) {
    console.log(`📊 Evento: ${category} - ${action} - ${label}`);
    
    // Integración con Google Analytics (descomentar si usas GA)
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
    
    // Integración con Facebook Pixel (descomentar si usas FB Pixel)
    // if (typeof fbq !== 'undefined') {
    //     fbq('track', 'ViewContent', {
    //         content_name: label,
    //         content_category: category
    //     });
    // }
}

// ============================================
// MANEJO DE HASH EN URL
// ============================================

// Al cargar la página, verificar si hay un hash en la URL
window.addEventListener('load', function() {
    if (window.location.hash) {
        const hash = window.location.hash.substring(1); // Remover el #
        
        // Si el hash es una categoría, activar el filtro correspondiente
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            if (button.getAttribute('data-filter') === hash) {
                setTimeout(() => {
                    button.click();
                }, 500);
            }
        });
    }
});

// ============================================
// DETECCIÓN DE DISPOSITIVO MÓVIL
// ============================================

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobile()) {
    console.log('📱 Dispositivo móvil detectado');
    
    // Optimizaciones para móvil
    const productCards = document.querySelectorAll('.producto-card');
    productCards.forEach(card => {
        // Mejorar tap targets en móvil
        card.style.minHeight = '44px';
    });
}

// ============================================
// LAZY LOADING DE IMÁGENES
// ============================================

function initLazyLoading() {
    const images = document.querySelectorAll('.producto-image img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Inicializar lazy loading si hay imágenes con data-src
if (document.querySelector('img[data-src]')) {
    initLazyLoading();
}

// ============================================
// CONTADOR DE PRODUCTOS
// ============================================

function updateProductCount() {
    const visibleProducts = document.querySelectorAll('.producto-card:not(.hidden)');
    console.log(`📦 Mostrando ${visibleProducts.length} productos`);
}

// ============================================
// BÚSQUEDA RÁPIDA (Opcional - para implementación futura)
// ============================================

function initQuickSearch() {
    const searchInput = document.getElementById('productSearch');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const productCards = document.querySelectorAll('.producto-card');
        
        productCards.forEach(card => {
            const title = card.querySelector('.producto-title').textContent.toLowerCase();
            const description = card.querySelector('.producto-description').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase()).join(' ');
            
            const searchContent = `${title} ${description} ${tags}`;
            
            if (searchContent.includes(searchTerm)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
        
        updateProductCount();
    });
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'scroll-to-top';
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
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 102, 161, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

initScrollToTop();

// ============================================
// MANEJO DE ERRORES DE IMÁGENES
// ============================================

document.querySelectorAll('.producto-image img').forEach(img => {
    img.addEventListener('error', function() {
        console.error('❌ Error al cargar imagen:', this.src);
        // Imagen placeholder
        this.src = 'images/placeholder-producto.png';
        this.alt = 'Imagen no disponible';
    });
});

// ============================================
// PERFORMANCE: Intersection Observer para animaciones
// ============================================

if ('IntersectionObserver' in window) {
    console.log('✅ IntersectionObserver disponible');
} else {
    console.warn('⚠️ IntersectionObserver no disponible - usando fallback');
    // Fallback para navegadores antiguos
    document.querySelectorAll('.producto-card').forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
}

// ============================================
// MENSAJES DE CONSOLA
// ============================================

console.log('%c✅ JavaScript de Productos cargado', 'color: #6DB33F; font-weight: bold; font-size: 14px;');
console.log('%c📦 20 productos disponibles en catálogo', 'color: #003B5C; font-size: 12px;');
console.log('%c📱 Contáctanos: +51 905 447 656', 'color: #003B5C; font-size: 12px;');
console.log('%c💼 ¿Necesitas cotizar? Click en cualquier botón "Cotizar"', 'color: #25D366; font-size: 12px;');

// ============================================
// PREVENIR SCROLL HORIZONTAL
// ============================================

document.body.style.overflowX = 'hidden';

// ============================================
// COMPATIBILIDAD CON NAVEGADORES ANTIGUOS
// ============================================

// Polyfill para forEach en NodeList (IE11)
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

// ============================================
// EXPORTAR FUNCIÓN PARA USO GLOBAL
// ============================================

// Hacer la función cotizarProducto disponible globalmente
window.cotizarProducto = cotizarProducto;

// ============================================
// DETECCIÓN DE BLOQUEADORES DE ANUNCIOS
// ============================================

// Opcional: detectar si hay bloqueador de anuncios que podría afectar tracking
window.addEventListener('load', function() {
    // Verificar si scripts de analytics se cargaron
    if (typeof gtag === 'undefined' && typeof fbq === 'undefined') {
        console.log('ℹ️ Scripts de analytics no detectados (puede ser por bloqueador de anuncios)');
    }
});