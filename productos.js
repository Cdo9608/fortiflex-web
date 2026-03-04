document.addEventListener('DOMContentLoaded', function() {

    
    initFilters();
    initScrollAnimations();
    initSmoothScroll();
    initCarousel(); 

});

function initCarousel() {

    
    const carousels = document.querySelectorAll('.producto-carousel');

    if (carousels.length === 0) {
        return;
    }

    
    carousels.forEach((carousel, carouselIndex) => {

        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const indicators = carousel.querySelectorAll('.indicator');
        const prevBtn = carousel.querySelector('.carousel-control.prev');
        const nextBtn = carousel.querySelector('.carousel-control.next');

        if (slides.length === 0) {
            return;
        }

        
        
        if (indicators.length > 0 && indicators.length !== slides.length) {
        }

        let currentSlide = 0;
        let autoplayInterval;

        
        
        const AUTOPLAY_DELAY = 3000;

        
        function showSlide(index) {
            if (index >= slides.length) currentSlide = 0;
            else if (index < 0) currentSlide = slides.length - 1;
            else currentSlide = index;

            slides.forEach(slide => slide.classList.remove('active'));
            slides[currentSlide].classList.add('active');

            
            if (indicators.length > 0) {
                indicators.forEach(indicator => indicator.classList.remove('active'));
                if (indicators[currentSlide]) indicators[currentSlide].classList.add('active');
            }

        }

        function nextSlide() { showSlide(currentSlide + 1); }
        function prevSlide() { showSlide(currentSlide - 1); }

        function startAutoplay() {
            stopAutoplay();
            autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        }

        
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

        
        if (indicators.length > 0) {
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    showSlide(index);
                    stopAutoplay();
                    setTimeout(startAutoplay, 8000);
                });
            });
        }

        
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        
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
                if (diff > 0) nextSlide(); 
                else prevSlide();          
            }
        }

        
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

        
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stopAutoplay();
            else startAutoplay();
        });

        
        showSlide(0);
        startAutoplay();
    });
}

function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.producto-card');
    const productCardsLarge = document.querySelectorAll('.producto-card-large');
    const categories = document.querySelectorAll('.productos-category');

    if (filterButtons.length === 0) {
        return;
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            
            filterButtons.forEach(btn => btn.classList.remove('active'));

            
            this.classList.add('active');

            
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

function animateCard(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.producto-card, .producto-card-large, .category-header');

    if (elements.length === 0) {
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

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    if (links.length === 0) {
        return;
    }

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

            }
        });
    });
}

function cotizarProducto(nombreProducto) {
    const telefono = '51905447656';
    const mensaje = `Hola, estoy interesado en obtener una cotización para: ${nombreProducto}`;
    const url = `https:

    window.open(url, '_blank');
}

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

}

createScrollToTopButton();

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if (images.length === 0) {
        return;
    }

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

window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd -
                     window.performance.timing.navigationStart;
});

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobile()) {
    document.body.classList.add('is-mobile');
} else {
    document.body.classList.add('is-desktop');
}

window.cotizarProducto = cotizarProducto;

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header-content');
    const nav = document.querySelector('.main-nav');
    
    if (!header || !nav) return;
    
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
    if (logo) logo.after(mobileToggle);
    else header.appendChild(mobileToggle);
    
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
        nav.classList.contains('active') ? closeMenu() : openMenu();
    });
    
    overlay.addEventListener('click', closeMenu);
    
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 968) setTimeout(closeMenu, 200);
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) closeMenu();
    });
    
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 968 && nav.classList.contains('active')) closeMenu();
        }, 250);
    });
});