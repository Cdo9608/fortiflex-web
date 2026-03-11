document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFAQAccordion();
    initScrollAnimations();
    initCatalogModal();
    initVendorTeam();
    initMobileMenu();
    initEmailCopyButtons();
    initInputValidation();
    initProductoBanner();
});

function initProductoBanner() {
    // Lee el producto desde el query param: contacto.html?producto=...#asesores
    const params = new URLSearchParams(window.location.search);
    const producto = params.get('producto');
    if (!producto) return;

    const seccion = document.getElementById('asesores');
    if (!seccion) return;

    // Crear banner de producto
    const banner = document.createElement('div');
    banner.className = 'producto-solicitud-banner';
    banner.innerHTML = `
        <div class="banner-inner">
            <i class="fas fa-box-open"></i>
            <div>
                <p class="banner-label">Estás solicitando cotización para:</p>
                <p class="banner-producto">${producto}</p>
            </div>
            <button class="banner-close" aria-label="Cerrar"><i class="fas fa-times"></i></button>
        </div>
    `;

    // Actualizar los links de WhatsApp de los asesores para incluir el producto
    seccion.querySelectorAll('.vendor-btn-wa').forEach(btn => {
        try {
            const href = btn.getAttribute('href') || '';
            if (!href.includes('api.whatsapp.com') && !href.includes('wa.me')) return;
            const url = new URL(href, window.location.origin);
            const textoActual = url.searchParams.get('text') || '';
            const nuevoTexto = textoActual + ' Estoy interesado en: *' + producto + '*';
            url.searchParams.set('text', nuevoTexto);
            btn.setAttribute('href', url.toString());
        } catch(e) { /* ignorar URLs inválidas */ }
    });

    banner.querySelector('.banner-close').addEventListener('click', () => banner.remove());

    const teamHeader = seccion.querySelector('.team-header');
    if (teamHeader) teamHeader.before(banner);

    // Estilos para el banner
    const style = document.createElement('style');
    style.textContent = `
        .producto-solicitud-banner {
            margin: 0 auto 1.5rem auto;
            max-width: 700px;
            background: linear-gradient(135deg, #003B5C 0%, #0066A1 100%);
            border-radius: 14px;
            padding: 1rem 1.4rem;
            box-shadow: 0 6px 24px rgba(0,102,161,0.25);
            animation: slideDownBanner 0.4s ease;
        }
        @keyframes slideDownBanner {
            from { opacity: 0; transform: translateY(-16px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        .banner-inner {
            display: flex;
            align-items: center;
            gap: 1rem;
            color: #fff;
        }
        .banner-inner > .fas {
            font-size: 2rem;
            opacity: 0.85;
            flex-shrink: 0;
        }
        .banner-inner > div { flex: 1; }
        .banner-label { margin: 0; font-size: 0.82rem; opacity: 0.8; }
        .banner-producto { margin: 0; font-size: 1.1rem; font-weight: 700; }
        .banner-close {
            background: rgba(255,255,255,0.15);
            border: none; cursor: pointer; color: #fff;
            width: 32px; height: 32px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0; transition: background 0.2s;
        }
        .banner-close:hover { background: rgba(255,255,255,0.3); }
    `;
    document.head.appendChild(style);
}

function initVendorTeam() {
    const cards = document.querySelectorAll('.vendor-card');
    if (!cards.length) return;

    cards.forEach(card => {
        const inner = card.querySelector('.card-inner');

        card.addEventListener('mousemove', function(e) {
            if (card.classList.contains('active')) return;
            const rect = inner.getBoundingClientRect();
            const rotX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -10;
            const rotY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 10;
            inner.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`;
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
                c.querySelector('.card-inner').style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });

            if (!isActive) {
                card.classList.add('active');
                inner.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(14px)';
                setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 120);
            }
        });
    });
}

function initCatalogModal() {
    const modal = document.getElementById('catalogModal');
    const openBtn = document.getElementById('openCatalogModal');
    const closeBtn = document.getElementById('closeCatalogModal');
    if (!modal || !openBtn || !closeBtn) return;

    openBtn.addEventListener('click', e => {
        e.preventDefault();
        modal.classList.add('open');
        document.body.classList.add('modal-open');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
    });

    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.classList.remove('open');
            document.body.classList.remove('modal-open');
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            modal.classList.remove('open');
            document.body.classList.remove('modal-open');
        }
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const get = id => document.getElementById(id);
        const selectText = id => get(id).options[get(id).selectedIndex]?.text || 'No especificado';

        const data = {
            nombre:   get('nombre').value,
            empresa:  get('empresa').value || 'No especificada',
            email:    get('email').value,
            telefono: get('telefono').value,
            sector:   selectText('sector'),
            producto: selectText('producto'),
            mensaje:  get('mensaje').value
        };

        if (!data.nombre || !data.email || !data.telefono || !data.mensaje) {
            alert('Por favor completa todos los campos obligatorios');
            return;
        }

        const msg = `📝 *NUEVA SOLICITUD DE CONTACTO - FORTIFLEX*\n\n👤 *Nombre:* ${data.nombre}\n🏢 *Empresa:* ${data.empresa}\n📧 *Email:* ${data.email}\n📱 *Teléfono:* ${data.telefono}\n🏭 *Sector:* ${data.sector}\n📦 *Producto:* ${data.producto}\n\n💬 *Mensaje:*\n${data.mensaje}\n\n---\n_Enviado desde www.fortiflex.com.pe_`;

        const btn = form.querySelector('.btn-submit');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirigiendo a WhatsApp...';
        btn.disabled = true;

        setTimeout(() => {
            window.open(`https://api.whatsapp.com/send?phone=51905447656&text=${encodeURIComponent(msg)}`, '_blank');
            form.style.display = 'none';
            successMessage.style.display = 'block';
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1000);
    });
}

function initFAQAccordion() {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', function() {
            items.forEach(other => { if (other !== item) other.classList.remove('active'); });
            item.classList.toggle('active');
        });
    });
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-fade-up, .animate-fade-right, .animate-fade-left');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

function initInputValidation() {
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const valid = !this.value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
            this.style.borderColor = valid ? '#e0e0e0' : '#dc3545';
        });
    }

    const telInput = document.getElementById('telefono');
    if (telInput) {
        telInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^\d\s+\-]/g, '');
        });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.pageYOffset - 100,
                behavior: 'smooth'
            });
        }
    });
});

function showCopyNotification(email) {
    const note = document.createElement('div');
    note.className = 'copy-notification';
    note.innerHTML = `<i class="fas fa-check-circle"></i><span>Email copiado: <strong>${email}</strong></span>`;
    document.body.appendChild(note);
    setTimeout(() => note.classList.add('show'), 10);
    setTimeout(() => {
        note.classList.remove('show');
        setTimeout(() => note.remove(), 300);
    }, 3000);
}

function initEmailCopyButtons() {
    document.querySelectorAll('.vendor-btn-email').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            let email = btn.querySelector('.vendor-btn-value')?.textContent.trim() || '';

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

            const icon = btn.querySelector('i');
            const label = btn.querySelector('.vendor-btn-label');
            const originalLabel = label?.textContent || '';

            navigator.clipboard.writeText(email).then(() => {
                showCopyNotification(email);
                btn.classList.add('copied');
                icon?.classList.replace('fa-envelope', 'fa-check');
                if (label) label.textContent = '¡Copiado!';

                setTimeout(() => {
                    btn.classList.remove('copied');
                    icon?.classList.replace('fa-check', 'fa-envelope');
                    if (label) label.textContent = originalLabel;
                }, 2000);
            }).catch(() => alert('Email: ' + email));
        });
    });
}
