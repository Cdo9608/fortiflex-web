// ============================================
// CARRUSEL CON 6 SLIDES
// ============================================

const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
let currentSlide = 0;
const slideInterval = 4000; // 8 segundos por slide para evitar saltos
let carouselTimer;
let isTransitioning = false; // Evitar transiciones múltiples

function showSlide(n) {
    // Evitar múltiples transiciones simultáneas
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Remover clase active de todos
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Calcular índice correcto
    currentSlide = (n + slides.length) % slides.length;
    
    // Agregar clase active
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    console.log('✨ Mostrando slide:', currentSlide + 1, 'de', slides.length);
    
    // Permitir nuevas transiciones después de 1.5 segundos
    setTimeout(() => {
        isTransitioning = false;
    }, 1500);
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Auto-play del carrusel
function startCarousel() {
    carouselTimer = setInterval(nextSlide, slideInterval);
}

function stopCarousel() {
    clearInterval(carouselTimer);
}

function restartCarousel() {
    stopCarousel();
    startCarousel();
}

// Iniciar carrusel
startCarousel();

// Click en dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        restartCarousel();
    });
});

// Pause al hover sobre el carrusel
const carousel = document.querySelector('.hero-carousel');

if (carousel) {
    carousel.addEventListener('mouseenter', () => {
        stopCarousel();
        console.log('⏸️ Carrusel pausado');
    });

    carousel.addEventListener('mouseleave', () => {
        startCarousel();
        console.log('▶️ Carrusel reanudado');
    });
}

// FLECHAS DE NAVEGACIÓN
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        restartCarousel();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        restartCarousel();
    });
}

console.log('Carrusel inicializado -', slides.length, 'slides con fondo personalizado');

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

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

document.querySelectorAll('.sector-card').forEach(card => {
    observer.observe(card);
});

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

window.addEventListener('scroll', setActiveNav);

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

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

const whatsappButtons = document.querySelectorAll('.btn-whatsapp, .whatsapp-float');

whatsappButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('WhatsApp button clicked');
    });
});

const callButtons = document.querySelectorAll('.btn-call');

callButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('Call button clicked');
    });
});

const downloadButtons = document.querySelectorAll('.btn-download');

downloadButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('Catalog download initiated');
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    
	
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCarouselImages);
} else {
    preloadCarouselImages();
}

console.log('%cFORTIFLEX PERÚ', 'color: #003B5C; font-size: 24px; font-weight: bold;');
console.log('%c🚀 Sitio web desarrollado con tecnologías modernas', 'color: #6DB33F; font-size: 14px;');
console.log('%c📞 Contáctanos: +51 905 447 656', 'color: #0066A1; font-size: 12px;');

window.addEventListener('error', (e) => {
    console.error('Error detected:', e.message);
});

console.log('✅ JavaScript cargado correctamente');
// ============================================
// MODAL DE CATÁLOGOS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('openCatalogModal');
    const closeModalBtn = document.getElementById('closeCatalogModal');
    const modal = document.getElementById('catalogModal');
    
    if (openModalBtn && modal) {
        console.log('✅ Modal de catálogos inicializado');
        
        // Abrir modal
        openModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('📂 Abriendo modal de catálogos');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Cerrar modal
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                console.log('❌ Cerrando modal de catálogos');
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Cerrar al hacer click fuera del contenido
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                console.log('❌ Cerrando modal (click fuera)');
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Cerrar con tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                console.log('❌ Cerrando modal (ESC)');
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Track descargas de catálogos
        const downloadButtons = document.querySelectorAll('.catalog-download-btn');
        downloadButtons.forEach(button => {
            button.addEventListener('click', function() {
                const catalogName = this.closest('.catalog-card').querySelector('h3').textContent;
                console.log('📥 Descargando:', catalogName);
                
                // Aquí puedes agregar tracking con Google Analytics
                // gtag('event', 'download', {
                //     'event_category': 'Catalog',
                //     'event_label': catalogName
                // });
            });
        });
    }
});

// ============================================
// MENÚ HAMBURGUESA MÓVIL - VERSIÓN FINAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header-content');
    const nav = document.querySelector('.main-nav');
    
    if (!header || !nav) {
        console.log('❌ No se encontró header o nav');
        return;
    }
    
    console.log('📱 Inicializando menú móvil...');
    
    // Crear botón hamburguesa
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-menu-toggle';
    mobileToggle.setAttribute('aria-label', 'Abrir menú');
    mobileToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    document.body.appendChild(overlay);
    
    // Insertar botón hamburguesa después del logo
    const logo = header.querySelector('div');
    if (logo) {
        logo.after(mobileToggle);
    } else {
        header.appendChild(mobileToggle);
    }
    
    // Función para abrir menú
    function openMenu() {
        nav.classList.add('active');
        overlay.classList.add('active');
        mobileToggle.classList.add('active');
        document.body.classList.add('menu-open');
        mobileToggle.setAttribute('aria-label', 'Cerrar menú');
        console.log('✅ Menú abierto');
    }
    
    // Función para cerrar menú
    function closeMenu() {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
        mobileToggle.setAttribute('aria-label', 'Abrir menú');
        console.log('❌ Menú cerrado');
    }
    
    // Toggle menú con hamburguesa
    mobileToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = nav.classList.contains('active');
        
        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Cerrar al hacer click en overlay
    overlay.addEventListener('click', function() {
        closeMenu();
    });
    
    // Cerrar al hacer click en un enlace del menú
    const navLinks = nav.querySelectorAll('a');
    console.log(`📄 Encontrados ${navLinks.length} enlaces en el menú`);
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Solo cerrar si estamos en móvil
            if (window.innerWidth <= 968) {
                setTimeout(() => {
                    closeMenu();
                }, 200);
            }
        });
    });
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Manejar resize de ventana
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 968 && nav.classList.contains('active')) {
                closeMenu();
            }
        }, 250);
    });
    
    console.log('✅ Menú hamburguesa inicializado correctamente');
});
// ============================================
// EFECTO TILT 3D EN CARRUSEL
// ============================================

(function() {
    const carousel = document.querySelector('.hero-carousel');
    const glare    = document.getElementById('tiltGlare');
    if (!carousel) return;

    // Intensidad máxima de inclinación en grados
    const MAX_TILT  = 6;

    let isHovering  = false;
    let rafId       = null;
    let targetRX    = 0, targetRY = 0;
    let currentRX   = 0, currentRY = 0;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function animate() {
        // Interpolación suave hacia el objetivo
        currentRX = lerp(currentRX, targetRX, 0.08);
        currentRY = lerp(currentRY, targetRY, 0.08);

        const activeSlide = carousel.querySelector('.carousel-slide.active');
        if (activeSlide) {
            // Inclinación 3D
            activeSlide.style.transform =
                `rotateX(${currentRX}deg) rotateY(${currentRY}deg) scale(1.03)`;

            // Parallax interno: la imagen se mueve levemente en dirección opuesta
            const shiftX = -currentRY * 0.3;
            const shiftY =  currentRX * 0.3;
            activeSlide.style.backgroundPosition =
                `calc(50% + ${shiftX}%) calc(50% + ${shiftY}%)`;
        }

        // Brillo sigue al mouse
        if (glare) {
            const gx = 50 + (targetRY / MAX_TILT) * 30;
            const gy = 50 - (targetRX / MAX_TILT) * 30;
            glare.style.background =
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.10) 0%, transparent 65%)`;
        }

        rafId = requestAnimationFrame(animate);
    }

    carousel.addEventListener('mouseenter', function() {
        // No pausar el carrusel automático — solo añadir el tilt
        isHovering = true;
        if (!rafId) rafId = requestAnimationFrame(animate);
    });

    carousel.addEventListener('mousemove', function(e) {
        if (!isHovering) return;
        const rect  = carousel.getBoundingClientRect();
        const x     = (e.clientX - rect.left)  / rect.width;   // 0..1
        const y     = (e.clientY - rect.top)   / rect.height;  // 0..1
        targetRY    =  (x - 0.5) * MAX_TILT * 2;
        targetRX    = -(y - 0.5) * MAX_TILT * 2;
    });

    carousel.addEventListener('mouseleave', function() {
        isHovering = false;
        targetRX   = 0;
        targetRY   = 0;

        // Volver a cero suavemente y luego detener el loop
        function waitForZero() {
            if (Math.abs(currentRX) < 0.05 && Math.abs(currentRY) < 0.05) {
                const activeSlide = carousel.querySelector('.carousel-slide.active');
                if (activeSlide) {
                    activeSlide.style.transform          = '';
                    activeSlide.style.backgroundPosition = 'center';
                }
                cancelAnimationFrame(rafId);
                rafId = null;
            } else {
                rafId = requestAnimationFrame(waitForZero);
            }
        }
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(waitForZero);
    });

    // Resetear transform al cambiar de slide para evitar artefactos visuales
    const slideObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(m) {
            if (m.type === 'attributes' && m.attributeName === 'class') {
                const slide = m.target;
                if (!slide.classList.contains('active')) {
                    slide.style.transform          = '';
                    slide.style.backgroundPosition = 'center';
                }
            }
        });
    });

    document.querySelectorAll('.carousel-slide').forEach(function(slide) {
        slideObserver.observe(slide, { attributes: true });
    });

    console.log('✅ Efecto Tilt 3D inicializado');
})();