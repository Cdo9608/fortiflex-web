// ============================================
// CONTACTO PAGE - Interactive JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando página Contacto...');
    
    initContactForm();
    initFAQAccordion();
    initScrollAnimations();
    initCatalogModal();
    initVendorTeam();
    
    console.log('✅ Página Contacto inicializada correctamente');
});

// ============================================
// EQUIPO DE ASESORES - Efecto 3D + Toggle
// ============================================

function initVendorTeam() {
    const cards = document.querySelectorAll('.vendor-card');

    if (cards.length === 0) {
        console.log('⚠️ No se encontraron tarjetas de vendedores');
        return;
    }

    console.log(`👥 Inicializadas ${cards.length} tarjetas de asesores`);

    cards.forEach(card => {
        const inner = card.querySelector('.card-inner');

        // ── Efecto 3D tilt al mover el mouse ──
        card.addEventListener('mousemove', function(e) {
            // No aplicar tilt si la tarjeta está expandida
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

        // ── Toggle al hacer clic ──
        card.addEventListener('click', function(e) {
            // Si el clic fue dentro de un enlace (<a>), no colapsar
            if (e.target.closest('a')) return;

            const isActive = card.classList.contains('active');

            // Cerrar todas las tarjetas
            cards.forEach(c => {
                c.classList.remove('active');
                c.querySelector('.card-inner').style.transform =
                    'perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });

            // Abrir la tarjeta clicada si no estaba abierta
            if (!isActive) {
                card.classList.add('active');
                inner.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(14px)';
                // Scroll suave para que se vea el panel desplegado
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 120);
            }
        });
    });
}

// ============================================
// MODAL DE CATÁLOGO
// ============================================

function initCatalogModal() {
    const modal = document.getElementById('catalogModal');
    const openBtn = document.getElementById('openCatalogModal');
    const closeBtn = document.getElementById('closeCatalogModal');
    
    if (!modal || !openBtn || !closeBtn) {
        console.log('⚠️ Modal de catálogo no encontrado');
        return;
    }
    
    console.log('📦 Modal de catálogo inicializado');
    
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

// ============================================
// FORMULARIO DE CONTACTO
// ============================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (!form) {
        console.log('⚠️ Formulario de contacto no encontrado');
        return;
    }
    
    console.log('📝 Formulario de contacto inicializado');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        console.log('📤 Enviando formulario...');
        
        const formData = {
            nombre: document.getElementById('nombre').value,
            empresa: document.getElementById('empresa').value || 'No especificada',
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            sector: document.getElementById('sector').options[document.getElementById('sector').selectedIndex].text || 'No especificado',
            producto: document.getElementById('producto').options[document.getElementById('producto').selectedIndex].text || 'No especificado',
            mensaje: document.getElementById('mensaje').value
        };
        
        console.log('📊 Datos del formulario:', formData);
        
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
            console.log('✅ Abriendo WhatsApp...');
            
            const whatsappURL = `https://api.whatsapp.com/send?phone=51905447656&text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappURL, '_blank');
            
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
        }, 1000);
    });
}

// ============================================
// FAQ ACCORDION
// ============================================

function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) {
        console.log('⚠️ No se encontraron elementos FAQ');
        return;
    }
    
    console.log(`❓ Inicializadas ${faqItems.length} preguntas FAQ`);
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            item.classList.toggle('active');
            
            console.log('❓ FAQ toggled:', question.querySelector('h4').textContent);
        });
    });
}

// ============================================
// ANIMACIONES SCROLL
// ============================================

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

// ============================================
// VALIDACIÓN EN TIEMPO REAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.style.borderColor = '#dc3545';
                console.log('⚠️ Email inválido');
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

// ============================================
// SMOOTH SCROLL
// ============================================

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

// ============================================
// MOBILE DETECTION
// ============================================

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobile()) {
    console.log('📱 Dispositivo móvil detectado');
    
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('📞 Llamada iniciada:', this.getAttribute('href'));
        });
    });
}

// ============================================
// TRACKING DE EVENTOS
// ============================================

function trackEvent(category, action, label) {
    console.log(`📊 Evento: ${category} - ${action} - ${label}`);
    // Integrar Google Analytics u otra herramienta aquí si lo requieres
}

const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function() {
        trackEvent('Form', 'Submit', 'Contact Form');
    });
}

// ============================================
// COPIAR EMAIL AL PORTAPAPELES
// ============================================

function copyEmail(event, email) {
    event.preventDefault();
    event.stopPropagation();
    
    navigator.clipboard.writeText(email).then(function() {
        console.log('📋 Email copiado:', email);
        
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
        console.error('❌ Error al copiar:', err);
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

// Mensajes de consola
console.log('%c✅ JavaScript de Contacto cargado', 'color: #6DB33F; font-weight: bold; font-size: 14px;');
console.log('%c📱 Contáctanos: +51 905 447 656', 'color: #003B5C; font-size: 12px;');
console.log('%c💼 ¿Necesitas ayuda? Escríbenos por WhatsApp', 'color: #25D366; font-size: 12px;');



// MENÚ HAMBURGUESA MÓVIL
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