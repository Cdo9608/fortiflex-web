// ===================================
// FORTIFLEX PERÚ - JAVASCRIPT
// ===================================

// ===================================
// CAROUSEL FUNCTIONALITY
// ===================================
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
let currentSlide = 0;
const slideInterval = 5000; // 5 segundos

/**
 * Muestra el slide especificado
 * @param {number} n - Índice del slide a mostrar
 */
function showSlide(n) {
    // Remover clase active de todos los slides y dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Calcular el índice correcto (loop circular)
    currentSlide = (n + slides.length) % slides.length;
    
    // Activar el slide y dot correspondiente
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

/**
 * Avanza al siguiente slide
 */
function nextSlide() {
    showSlide(currentSlide + 1);
}

/**
 * Retrocede al slide anterior
 */
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Auto-advance carousel
let carouselTimer = setInterval(nextSlide, slideInterval);

// ===================================
// DOTS CLICK FUNCTIONALITY
// ===================================
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        // Reiniciar el timer cuando se hace clic manual
        clearInterval(carouselTimer);
        carouselTimer = setInterval(nextSlide, slideInterval);
    });
});

// ===================================
// PAUSE CAROUSEL ON HOVER
// ===================================
const carousel = document.querySelector('.hero-carousel');

carousel.addEventListener('mouseenter', () => {
    clearInterval(carouselTimer);
});

carousel.addEventListener('mouseleave', () => {
    carouselTimer = setInterval(nextSlide, slideInterval);
});

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// FADE-IN ANIMATION ON SCROLL
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            // Opcional: dejar de observar después de animar
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todas las tarjetas de sectores
document.querySelectorAll('.sector-card').forEach(card => {
    observer.observe(card);
});

// ===================================
// NAVEGACIÓN ACTIVA
// ===================================
/**
 * Marca el link de navegación activo según la sección visible
 */
function setActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
}

// Ejecutar al hacer scroll
window.addEventListener('scroll', setActiveNav);

// ===================================
// LAZY LOADING DE IMÁGENES
// ===================================
/**
 * Lazy loading para mejorar performance
 */
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            
            // Si la imagen tiene data-src, cargarla
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            
            observer.unobserve(img);
        }
    });
});

// Observar todas las imágenes con data-src
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ===================================
// WHATSAPP BUTTON TRACKING (Opcional)
// ===================================
/**
 * Tracking de clicks en botones de WhatsApp
 */
const whatsappButtons = document.querySelectorAll('.btn-whatsapp, .whatsapp-float');

whatsappButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Aquí puedes agregar tracking de Google Analytics u otro
        console.log('WhatsApp button clicked');
        
        // Ejemplo con Google Analytics (si está configurado):
        // gtag('event', 'click', {
        //     'event_category': 'WhatsApp',
        //     'event_label': 'Contact Button'
        // });
    });
});

// ===================================
// CALL BUTTON TRACKING (Opcional)
// ===================================
const callButtons = document.querySelectorAll('.btn-call');

callButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('Call button clicked');
    });
});

// ===================================
// DOWNLOAD BUTTON TRACKING (Opcional)
// ===================================
const downloadButtons = document.querySelectorAll('.btn-download');

downloadButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('Catalog download initiated');
    });
});

// ===================================
// HEADER SCROLL EFFECT
// ===================================
/**
 * Agrega sombra al header cuando se hace scroll
 */
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// ===================================
// MOBILE MENU TOGGLE (Para implementar después)
// ===================================
/**
 * Función para toggle del menú móvil
 * Descomentar cuando se agregue el botón hamburguesa
 */
/*
const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.main-nav');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuButton.classList.toggle('active');
    });
}
*/

// ===================================
// PERFORMANCE: PRELOAD CAROUSEL IMAGES
// ===================================
/**
 * Precarga las imágenes del carousel para transiciones suaves
 */
function preloadCarouselImages() {
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    
    carouselSlides.forEach(slide => {
        const bgImage = slide.style.backgroundImage;
        if (bgImage) {
            const imageUrl = bgImage.match(/url\(['"]?([^'"]*)['"]?\)/)[1];
            const img = new Image();
            img.src = imageUrl;
        }
    });
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCarouselImages);
} else {
    preloadCarouselImages();
}

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%cFORTIFLEX PERÚ', 'color: #003B5C; font-size: 24px; font-weight: bold;');
console.log('%c🚀 Sitio web desarrollado con tecnologías modernas', 'color: #6DB33F; font-size: 14px;');
console.log('%c📞 Contáctanos: +51 905 447 656', 'color: #0066A1; font-size: 12px;');

// ===================================
// ERROR HANDLING
// ===================================
/**
 * Manejo global de errores
 */
window.addEventListener('error', (e) => {
    console.error('Error detected:', e.message);
    // Aquí puedes enviar el error a un servicio de logging si lo deseas
});

// ===================================
// INICIALIZACIÓN
// ===================================
console.log('✅ JavaScript cargado correctamente');
