document.addEventListener('DOMContentLoaded', function() {
    
    
    initAnimateNumbers();
    initModals();
    initScrollAnimations();
    initParallax();
    initSmoothScroll();
    initTeamCarousel();
    
});

function initAnimateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) {
        return;
    }
    
    
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
                    return;
                }
                
                
                const duration = 2000; 
                const increment = target / (duration / 16); 
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

function initModals() {
    const modalButtons = document.querySelectorAll('.btn-politica');
    const certCards = document.querySelectorAll('.cert-card[data-cert]');
    const modals = document.querySelectorAll('.modal-overlay');
    const closeButtons = document.querySelectorAll('.modal-close');

    if (modalButtons.length === 0) {
    } else {
    }

    if (certCards.length > 0) {
    }

    
    modalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(`modal-${modalId}`);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
            }
        });
    });

    
    certCards.forEach(card => {
        card.addEventListener('click', function() {
            const certId = this.getAttribute('data-cert');
            const modal = document.getElementById(`modal-cert-${certId}`);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
            }
        });
    });

    
    initPDFDownloads();

    
    function closeModal(modal) {
        if (modal) {
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

    
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });

    
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

function initPDFDownloads() {
    const downloadButtons = document.querySelectorAll('.btn-download-pdf-large');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const pdfUrl = this.getAttribute('href');
            const fileName = this.getAttribute('download');
            
            
            
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
                })
                .catch(error => {
                    
                    window.open(pdfUrl, '_blank');
                });
        });
    });
    
}

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

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobile()) {
    const video = document.querySelector('.hero-video');
    if (video) {
        video.removeAttribute('autoplay');
        video.setAttribute('poster', 'images/video-poster.jpg');
    }
}

function initTeamCarousel() {
    const slides = document.querySelectorAll('.team-slide');
    const dots = document.querySelectorAll('.team-carousel-dot');
    const prevBtn = document.querySelector('.team-carousel-prev');
    const nextBtn = document.querySelector('.team-carousel-next');
    
    if (slides.length === 0) {
        return;
    }
    
    
    let currentSlide = 0;
    const slideInterval = 5000; 
    let carouselTimer;

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

    
    function startAutoPlay() {
        carouselTimer = setInterval(nextSlide, slideInterval);
    }

    function stopAutoPlay() {
        clearInterval(carouselTimer);
    }

    
    startAutoPlay();

    
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

    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    
    const carouselContainer = document.querySelector('.team-carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }

    
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
                
                nextSlide();
                stopAutoPlay();
                startAutoPlay();
            }
            if (touchEndX > touchStartX + 50) {
                
                prevSlide();
                stopAutoPlay();
                startAutoPlay();
            }
        }
    }
}