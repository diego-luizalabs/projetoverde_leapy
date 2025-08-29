document.addEventListener('DOMContentLoaded', function() {

    // =========================================================
    // ========= LÓGICA DE TRANSIÇÃO (VERSÃO SEGURA) =========
    // =========================================================
    document.body.addEventListener('click', function(event) {
        const link = event.target.closest('a');
        // Verifica se é um link interno (mesmo hostname) e não é uma âncora interna
        if (link && link.hostname === window.location.hostname && link.getAttribute('href') && !link.getAttribute('href').startsWith('#')) {
            event.preventDefault();
            const destination = link.href;
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = destination;
            }, 400); // Este tempo deve ser o mesmo da transição no CSS
        }
    });

    // =========================================================
    // =========== LÓGICA PARA MENU MOBILE (NOVO) ============
    // =========================================================
    // Cria o botão de toggle e o menu mobile dinamicamente para desktop também
    // para evitar duplicação no HTML
    const navbarNav = document.querySelector('.navbar nav ul');
    const container = document.querySelector('.navbar .container');

    // Só adiciona o toggle e o menu mobile se não estivermos em desktop
    if (window.innerWidth <= 768) {
        // Cria o botão de toggle
        const menuToggle = document.createElement('div');
        menuToggle.classList.add('menu-toggle');
        menuToggle.id = 'mobile-menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        container.appendChild(menuToggle);

        // Clona os links existentes para o menu mobile
        const mobileNavLinks = navbarNav.cloneNode(true);
        mobileNavLinks.classList.add('nav-links-mobile');
        mobileNavLinks.classList.remove('nav-links'); // Remove a classe desktop se houver
        navbarNav.parentNode.appendChild(mobileNavLinks); // Adiciona abaixo do nav original

        // Esconde o menu desktop
        navbarNav.style.display = 'none';
        
        menuToggle.addEventListener('click', function() {
            mobileNavLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (mobileNavLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Fecha o menu mobile ao clicar em um link
        mobileNavLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileNavLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // =========================================================
    // ----------- LÓGICA DE LINK ATIVO NO MENU ---------------
    // =========================================================
    const currentPath = window.location.pathname; // Ex: /index.html, /quem-somos.html

    // Seleciona todos os links do menu principal (desktop e mobile)
    const navLinks = document.querySelectorAll('.navbar nav ul li a');

    navLinks.forEach(link => {
        // Pega o href do link (ex: "quem-somos.html")
        const linkPath = link.getAttribute('href');

        // Compara o caminho atual com o caminho do link
        // Garante que "index.html" seja tratado como a página inicial,
        // mesmo que o currentPath seja apenas "/"
        if (currentPath.includes(linkPath) || (currentPath === '/' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });


    // --- EFEITO DE BOLINHAS VERDES CAINDO ---
    const canvas = document.getElementById('sustainability-effect');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let particlesArray;
        class Particle { constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height - canvas.height; this.size = Math.random() * 2.5 + 1; this.speedY = Math.random() * 1.5 + 0.5; this.speedX = Math.random() * 1 - 0.5; this.opacity = Math.random() * 0.5 + 0.2; } draw() { ctx.fillStyle = `rgba(42, 157, 143, ${this.opacity})`; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); } update() { this.y += this.speedY; this.x += this.speedX; if (this.y > canvas.height) { this.y = 0 - this.size; this.x = Math.random() * canvas.width; } } }
        function init() { particlesArray = []; let numberOfParticles = 70; for (let i = 0; i < numberOfParticles; i++) { particlesArray.push(new Particle()); } }
        function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); particlesArray[i].draw(); } requestAnimationFrame(animate); }
        init(); animate();
        window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; init(); });
    }

    // =========================================================
    // =========== LÓGICA PARA MÚLTIPLOS MAPAS (PILARES) ========
    // =========================================================
    const locations = [
        { id: 'map-ibirapuera', name: 'Parque Ibirapuera', coords: [-23.5885, -46.6589] },
        { id: 'map-villa-lobos', name: 'Parque Villa-Lobos', coords: [-23.5484, -46.7265] },
        { id: 'map-ccsp', name: 'Centro Cultural São Paulo', coords: [-23.5614, -46.6427] },
        { id: 'map-cdc-guarani', name: 'CDC Vila Guarani', coords: [-23.6330, -46.6395] }
    ];

    locations.forEach(location => {
        const mapElement = document.getElementById(location.id);
        if (mapElement) {
            const map = L.map(location.id, { scrollWheelZoom: false }).setView(location.coords, 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            L.marker(location.coords).addTo(map).bindPopup(`<b>${location.name}</b>`);
        }
    });

    // EFEITO NAVBAR SCROLL
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ANIMAÇÕES DE ROLAGEM (SCROLLREVEAL)
    const sr = ScrollReveal({ origin: 'bottom', distance: '50px', duration: 800, delay: 200, easing: 'ease-out', reset: false });
    
    // Animações genéricas para todas as seções
    sr.reveal('.page-section h1, .page-section h2', { duration: 1000, delay: 100, origin: 'top' });
    sr.reveal('.page-section .subtitle, .page-section p', { duration: 1000, delay: 200 });
    sr.reveal('.cta-final', { duration: 1000 });

    // Animações da Home (index.html)
    if (document.querySelector('.hero')) { 
        sr.reveal('.hero h1', { delay: 300, origin: 'left' }); 
        sr.reveal('.hero p', { delay: 500, origin: 'left' }); 
        sr.reveal('.hero .cta-button', { delay: 700 }); 
        sr.reveal('#missao', { duration: 1200 });
        sr.reveal('.pillar-card', { interval: 150 });
    }
    // Animações de Início (inicio.html)
    if (document.querySelector('#apresentacao')) {
        sr.reveal('.main-heading', { delay: 300, origin: 'top' });
        sr.reveal('.image-with-description', { delay: 500, duration: 1000, scale: 0.95 });
        sr.reveal('.text-and-image-grid .text-block', { delay: 400, origin: 'left' });
        sr.reveal('.text-and-image-grid .image-block', { delay: 500, origin: 'right' });
        sr.reveal('.impact-card', { interval: 150 });
        sr.reveal('.location-map-placeholder', { delay: 300, duration: 1000, scale: 0.95 });
    }
    // Animações de Quem Somos (quem-somos.html)
    if (document.querySelector('.about-us')) { 
        sr.reveal('.about-hero-image', { delay: 300, duration: 1000, scale: 0.9 }); 
        sr.reveal('.intro-text', { delay: 400 }); 
        sr.reveal('.approach-card', { interval: 150 }); 
        sr.reveal('.vision-quote', { duration: 1000 });
        sr.reveal('.plan-card', { interval: 150, origin: 'bottom' });
    }
    // Animações de Pilares (pilares.html)
    if (document.querySelector('#pilares-territorio')) {
        sr.reveal('.location-card', { interval: 200, origin: 'bottom', distance: '80px' });
    }
    // Animações de Participe (participe.html)
    if (document.querySelector('#formas-de-ajudar')) {
        sr.reveal('.help-card', { interval: 150 });
        sr.reveal('.form-section', { origin: 'bottom', distance: '80px', duration: 1000 });
    }
});