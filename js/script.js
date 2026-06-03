/* ===================================================================
   Bonjour Propreté — Scripts
   - Navbar dynamique au scroll
   - Animations d'apparition au défilement (IntersectionObserver)
   - Lien actif dans le menu selon la section visible
   - Soumission du formulaire de contact (démo front)
   - Année dynamique du footer
   =================================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Navbar : effet au scroll ---------- */
    const navbar = document.getElementById('mainNav');

    function handleNavbar() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    handleNavbar();
    window.addEventListener('scroll', handleNavbar, { passive: true });

    /* ---------- Animations au défilement ---------- */
    const revealEls = document.querySelectorAll('[data-reveal]');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    // léger décalage progressif pour un effet en cascade
                    const delay = (index % 3) * 90;
                    setTimeout(function () {
                        entry.target.classList.add('is-visible');
                    }, delay);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(function (el) { observer.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ---------- Navigation multi-pages : lien actif défini par page ---------- */
    const navLinks = document.querySelectorAll('.bp-navbar .nav-link');

    /* ---------- Fermeture du menu mobile au clic ---------- */
    const collapseEl = document.getElementById('navContent');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (collapseEl.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(collapseEl)
                    || new bootstrap.Collapse(collapseEl, { toggle: false });
                bsCollapse.hide();
            }
        });
    });

    /* ---------- Formulaire de contact (démo) ---------- */
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }
            successMsg.classList.remove('d-none');
            form.reset();
            form.classList.remove('was-validated');
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(function () {
                successMsg.classList.add('d-none');
            }, 6000);
        });
    }

    /* ---------- Année dynamique ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
