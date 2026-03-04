const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
let currentSlide = 0;
const slideInterval = 4000;
let carouselTimer;
let isTransitioning = false;

function showSlide(n) {
    
    if (isTransitioning) return;
    isTransitioning = true;
    
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    
    currentSlide = (n + slides.length) % slides.length;
    
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    
    
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

startCarousel();

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        restartCarousel();
    });
});

const carousel = document.querySelector('.hero-carousel');

if (carousel) {
    carousel.addEventListener('mouseenter', () => {
        stopCarousel();
    });

    carousel.addEventListener('mouseleave', () => {
        startCarousel();
    });
}

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
    });

const callButtons = document.querySelectorAll('.btn-call');

callButtons.forEach(button => {
    });

const downloadButtons = document.querySelectorAll('.btn-download');

downloadButtons.forEach(button => {
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

document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('openCatalogModal');
    const closeModalBtn = document.getElementById('closeCatalogModal');
    const modal = document.getElementById('catalogModal');
    
    if (openModalBtn && modal) {
        
        
        openModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        
        const downloadButtons = document.querySelectorAll('.catalog-download-btn');
        downloadButtons.forEach(button => {
            button.addEventListener('click', function() {
                const catalogName = this.closest('.catalog-card').querySelector('h3').textContent;
                
                
                
                
                
                
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header-content');
    const nav = document.querySelector('.main-nav');
    
    if (!header || !nav) {
        return;
    }
    
    
    
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-menu-toggle';
    mobileToggle.setAttribute('aria-label', 'Abrir menú');
    mobileToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    document.body.appendChild(overlay);
    
    
    const logo = header.querySelector('div');
    if (logo) {
        logo.after(mobileToggle);
    } else {
        header.appendChild(mobileToggle);
    }
    
    
    function openMenu() {
        nav.classList.add('active');
        overlay.classList.add('active');
        mobileToggle.classList.add('active');
        document.body.classList.add('menu-open');
        mobileToggle.setAttribute('aria-label', 'Cerrar menú');
    }
    
    
    function closeMenu() {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
        mobileToggle.setAttribute('aria-label', 'Abrir menú');
    }
    
    
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
    
    
    overlay.addEventListener('click', function() {
        closeMenu();
    });
    
    
    const navLinks = nav.querySelectorAll('a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            
            if (window.innerWidth <= 968) {
                setTimeout(() => {
                    closeMenu();
                }, 200);
            }
        });
    });
    
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            closeMenu();
        }
    });
    
    
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 968 && nav.classList.contains('active')) {
                closeMenu();
            }
        }, 250);
    });
    
});