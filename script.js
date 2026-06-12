document.addEventListener('DOMContentLoaded', () => {
    
    // ════════ LÓGICA DE LA INTRO ════════
    document.body.style.overflow = 'hidden'; // Bloquea el scroll

    const word   = 'MOVINGMASTER';
    const golden = new Set([6, 7, 8, 9, 10, 11]);
    const wm     = document.getElementById('introWordmark');

    word.split('').forEach((ch, i) => {
        const s = document.createElement('span');
        s.textContent = ch;
        if (golden.has(i)) s.classList.add('gold');
        s.style.animationDelay = (0.5 + i * 0.045) + 's';
        wm.appendChild(s);
    });

    const pctEl    = document.getElementById('introPct');
    const DURATION = 2400;   
    const startAt  = performance.now() + 400; 

    function tick(now) {
        const elapsed = Math.max(0, now - startAt);
        const p       = Math.min(Math.round((elapsed / DURATION) * 100), 100);
        pctEl.textContent = p + '%';
        if (p < 100) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // ════════ LÓGICA DE LA PÁGINA WEB ════════

    // 1. Efecto en la barra de navegación al hacer scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Configurar Intersection Observer (Animaciones Reveal)
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    // 3. Finalizar Intro y liberar la web
    setTimeout(() => {
        const intro = document.getElementById('intro');
        intro.classList.add('hide');          
        document.body.style.overflow = '';    // Restaura el scroll
        
        // ¡OJO AQUÍ! Activamos el observador de animaciones justo cuando la intro desaparece
        revealElements.forEach(el => {
            revealOnScroll.observe(el);
        });

        setTimeout(() => intro.remove(), 800); // Limpia el DOM
    }, 3200); 

    // 4. Formulario (Simulación)
    const form = document.querySelector('.quote-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerHTML = 'Enviando... <span style="font-size: 1.2rem;">🚀</span>';
        btn.style.opacity = '0.8';
        btn.style.pointerEvents = 'none';

        setTimeout(() => {
            btn.innerHTML = '¡Cotización Solicitada!';
            btn.style.background = '#10B981';
            form.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'auto';
            }, 3000);
        }, 1500);
    });
});