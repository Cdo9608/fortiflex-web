// ============================================
// CONTACTO PAGE - Interactive JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando página Contacto...');
    
    // Inicializar funciones
    initContactForm();
    initFAQAccordion();
    initScrollAnimations();
    initCatalogModal();
    
    console.log('✅ Página Contacto inicializada correctamente');
});

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
    
    // Abrir modal
    openBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('open');
        document.body.classList.add('modal-open');
    });
    
    // Cerrar con botón X
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
    });
    
    // Cerrar clickeando el fondo oscuro
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('open');
            document.body.classList.remove('modal-open');
        }
    });
    
    // Cerrar con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            modal.classList.remove('open');
            document.body.classList.remove('modal-open');
        }
    });
}

// Manejo del formulario de contacto
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
        
        // Obtener datos del formulario
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
        
        // Validación básica
        if (!formData.nombre || !formData.email || !formData.telefono || !formData.mensaje) {
            alert('Por favor completa todos los campos obligatorios');
            return;
        }
        
        // Preparar mensaje para WhatsApp
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
        
        // Botón loading
        const btn = form.querySelector('.btn-submit');
        const btnText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirigiendo a WhatsApp...';
        btn.disabled = true;
        
        // Esperar 1 segundo y abrir WhatsApp
        setTimeout(function() {
            console.log('✅ Abriendo WhatsApp...');
            
            // Abrir WhatsApp con el mensaje
            const whatsappURL = `https://api.whatsapp.com/send?phone=51905447656&text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappURL, '_blank');
            
            // Mostrar mensaje de éxito
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Scroll al mensaje de éxito
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
        }, 1000);
    });
}

// Sistema de FAQ Accordion
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
            // Cerrar otros items abiertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle el item actual
            item.classList.toggle('active');
            
            console.log('❓ FAQ toggled:', question.querySelector('h4').textContent);
        });
    });
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.animate-fade-up, .animate-fade-right, .animate-fade-left'
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

// Validación en tiempo real de email
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

// Validación en tiempo real de teléfono
document.addEventListener('DOMContentLoaded', function() {
    const telInput = document.getElementById('telefono');
    
    if (telInput) {
        telInput.addEventListener('input', function() {
            // Permitir solo números, +, espacios y guiones
            this.value = this.value.replace(/[^\d\s\+\-]/g, '');
        });
    }
});

// Smooth scroll para enlaces internos
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

// Detectar si el usuario está en un dispositivo móvil
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Ajustar comportamiento en móviles
if (isMobile()) {
    console.log('📱 Dispositivo móvil detectado');
    
    // Hacer que los enlaces de teléfono sean clicables
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('📞 Llamada iniciada:', this.getAttribute('href'));
        });
    });
}

// Tracking de eventos (para analytics)
function trackEvent(category, action, label) {
    console.log(`📊 Evento: ${category} - ${action} - ${label}`);
    
    // Aquí puedes integrar Google Analytics, Facebook Pixel, etc.
    // Ejemplo con Google Analytics:
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
}

// Track clicks en botones de contacto
document.querySelectorAll('.quick-contact-card, .btn-whatsapp-inline').forEach(button => {
    button.addEventListener('click', function() {
        const method = this.querySelector('h3')?.textContent || 'WhatsApp';
        trackEvent('Contact', 'Click', method);
    });
});

// Track envío de formulario
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function() {
        trackEvent('Form', 'Submit', 'Contact Form');
    });
}

// Mensajes de consola
console.log('%c✅ JavaScript de Contacto cargado', 'color: #6DB33F; font-weight: bold; font-size: 14px;');
console.log('%c📱 Contáctanos: +51 905 447 656', 'color: #003B5C; font-size: 12px;');
console.log('%c💼 ¿Necesitas ayuda? Escríbenos por WhatsApp', 'color: #25D366; font-size: 12px;');

// Función para copiar email al portapapeles
function copyEmail(event, email) {
    event.preventDefault();
    event.stopPropagation();
    
    // Copiar al portapapeles
    navigator.clipboard.writeText(email).then(function() {
        console.log('📋 Email copiado:', email);
        
        // Encontrar el botón que se clickeó
        const button = event.currentTarget;
        const icon = button.querySelector('i');
        
        // Cambiar a check
        button.classList.add('copied');
        icon.classList.remove('fa-copy');
        icon.classList.add('fa-check');
        
        // Mensaje temporal
        const originalTitle = button.title;
        button.title = '¡Copiado!';
        
        // Volver al estado original después de 2 segundos
        setTimeout(function() {
            button.classList.remove('copied');
            icon.classList.remove('fa-check');
            icon.classList.add('fa-copy');
            button.title = originalTitle;
        }, 2000);
        
        // Mostrar notificación visual opcional
        showCopyNotification(email);
        
    }).catch(function(err) {
        console.error('❌ Error al copiar:', err);
        alert('Email copiado: ' + email);
    });
}

// Notificación visual al copiar
function showCopyNotification(email) {
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Email copiado: <strong>${email}</strong></span>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}