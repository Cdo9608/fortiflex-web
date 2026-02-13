const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
let currentSlide = 0;
const slideInterval = 5000;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

let carouselTimer = setInterval(nextSlide, slideInterval);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        clearInterval(carouselTimer);
        carouselTimer = setInterval(nextSlide, slideInterval);
    });
});

const carousel = document.querySelector('.hero-carousel');

carousel.addEventListener('mouseenter', () => {
    clearInterval(carouselTimer);
});

carousel.addEventListener('mouseleave', () => {
    carouselTimer = setInterval(nextSlide, slideInterval);
});

// FLECHAS DE NAVEGACIÓN
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        clearInterval(carouselTimer);
        carouselTimer = setInterval(nextSlide, slideInterval);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        clearInterval(carouselTimer);
        carouselTimer = setInterval(nextSlide, slideInterval);
    });
}

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