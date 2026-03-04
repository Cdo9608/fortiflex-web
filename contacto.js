document.addEventListener('DOMContentLoaded', function() {
        
    initContactForm();
    initFAQAccordion();
    initScrollAnimations();
    initCatalogModal();
    initVendorTeam();
    
    });

function initVendorTeam() {
    const cards = document.querySelectorAll('.vendor-card');

    if (cards.length === 0) {
                return;
    }

    
    cards.forEach(card => {
        const inner = card.querySelector('.card-inner');

        
        card.addEventListener('mousemove', function(e) {
            
            if (card.classList.contains('active')) return;

            const rect = inner.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotateX = ((y - cy) / cy) * -10;
            const rotateY = ((x - cx) / cx) * 10;

            inner.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
        });

        card.addEventListener('mouseleave', function() {
            if (!card.classList.contains('active')) {
                inner.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            }
        });

        
        card.addEventListener('click', function(e) {
            
            if (e.target.closest('a')) return;

            const isActive = card.classList.contains('active');

            
            cards.forEach(c => {
                c.classList.remove('active');
                c.querySelector('.card-inner').style.transform =
                    'perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });

            
            if (!isActive) {
                card.classList.add('active');
                inner.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(14px)';
                
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 120);
            }
        });
    });
}

function initCatalogModal() {
    const modal = document.getElementById('catalogModal');
    const openBtn = document.getElementById('openCatalogModal');
    const closeBtn = document.getElementById('closeCatalogModal');
    
    if (!modal || !openBtn || !closeBtn) {
                return;
    }
    
        
    openBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('open');
        document.body.classList.add('modal-open');
    });
    
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('open');
            document.body.classList.remove('modal-open');
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            modal.classList.remove('open');
            document.body.classList.remove('modal-open');
        }
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (!form) {
                return;
    }
    
        
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
                
        const formData = {
            nombre: document.getElementById('nombre').value,
            empresa: document.getElementById('empresa').value || 'No especificada',
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            sector: document.getElementById('sector').options[document.getElementById('sector').selectedIndex].text || 'No especificado',
            producto: document.getElementById('producto').options[document.getElementById('producto').selectedIndex].text || 'No especificado',
            mensaje: document.getElementById('mensaje').value
        };
        
                
        if (!formData.nombre || !formData.email || !formData.telefono || !formData.mensaje) {
            alert('Por favor completa todos los campos obligatorios');
            return;
        }
        
        const whatsappMessage = `📝 *NUEVA SOLICITUD DE CONTACTO - FORTIFLEX*

👤 *Nombre:* ${formData.nombre}
🏢 *Empresa:* ${formData.empresa}
📧 *Email:* ${formData.email}
📱 *Teléfono:* ${formData.telefono}
🏭 *Sector:* ${formData.sector}
📦 *Producto:* ${formData.producto}

💬 *Mensaje:*
${formData.mensaje}

---
_Enviado desde www.fortiflex.com.pe_`;
        
        const btn = form.querySelector('.btn-submit');
        const btnText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirigiendo a WhatsApp...';
        btn.disabled = true;
        
        setTimeout(function() {
                        
            const whatsappURL = `https://api.whatsapp.com/send?phone=51905447656&text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappURL, '_blank');
            
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
        }, 1000);
    });
}

function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) {
                return;
    }
    
        
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            item.classList.toggle('active');
            
                    });
    });
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.animate-fade-up, .animate-fade-right, .animate-fade-left'
    );

    if (animatedElements.length === 0) return;

    const observerOptions = {
        threshold: 0.15,
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

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.style.borderColor = '#dc3545';
                            } else {
                this.style.borderColor = '#e0e0e0';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const telInput = document.getElementById('telefono');
    
    if (telInput) {
        telInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^\d\s\+\-]/g, '');
        });
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobile()) {
        
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
                    });
    });
}

function trackEvent(category, action, label) {
        
}

const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function() {
        trackEvent('Form', 'Submit', 'Contact Form');
    });
}

function copyEmail(event, email) {
    event.preventDefault();
    event.stopPropagation();
    
    navigator.clipboard.writeText(email).then(function() {
                
        const button = event.currentTarget;
        const icon = button.querySelector('i');
        
        button.classList.add('copied');
        icon.classList.remove('fa-copy');
        icon.classList.add('fa-check');
        
        const originalTitle = button.title;
        button.title = '¡Copiado!';
        
        setTimeout(function() {
            button.classList.remove('copied');
            icon.classList.remove('fa-check');
            icon.classList.add('fa-copy');
            button.title = originalTitle;
        }, 2000);
        
        showCopyNotification(email);
        
    }).catch(function(err) {
                alert('Email: ' + email);
    });
}

function showCopyNotification(email) {
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Email copiado: <strong>${email}</strong></span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

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

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.vendor-btn-email').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const emailSpan = btn.querySelector('.vendor-btn-value');
            let email = emailSpan ? emailSpan.textContent.trim() : '';

            if (!email || email === '[email\u00a0protected]') {
                const cfSpan = btn.querySelector('[data-cfemail]');
                if (cfSpan) {
                    const encoded = cfSpan.getAttribute('data-cfemail');
                    const key = parseInt(encoded.substring(0, 2), 16);
                    let decoded = '';
                    for (let i = 2; i < encoded.length; i += 2) {
                        decoded += String.fromCharCode(parseInt(encoded.substring(i, i + 2), 16) ^ key);
                    }
                    email = decoded;
                }
            }

            if (!email) return;

            navigator.clipboard.writeText(email).then(function() {
                showCopyNotification(email);

                const icon = btn.querySelector('i');
                const label = btn.querySelector('.vendor-btn-label');
                const originalLabel = label ? label.textContent : '';

                btn.classList.add('copied');
                if (icon) { icon.classList.replace('fa-envelope', 'fa-check'); }
                if (label) label.textContent = '¡Copiado!';

                setTimeout(function() {
                    btn.classList.remove('copied');
                    if (icon) { icon.classList.replace('fa-check', 'fa-envelope'); }
                    if (label) label.textContent = originalLabel;
                }, 2000);

            }).catch(function() {
                alert('Email: ' + email);
            });
        });
    });
});