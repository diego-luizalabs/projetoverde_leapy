document.addEventListener('DOMContentLoaded', function() {

    // LÓGICA DE TRANSIÇÃO (VERSÃO SEGURA)
    document.body.addEventListener('click', function(event) {
        const link = event.target.closest('a');
        if (link && link.hostname === window.location.hostname && link.getAttribute('href').indexOf('#') === -1) {
            event.preventDefault();
            const destination = link.href;
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = destination;
            }, 400);
        }
    });

    // EFEITO DE BOLINHAS VERDES CAINDO
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

            // CORREÇÃO: Usando o marcador padrão do Leaflet, que é 100% confiável
            L.marker(location.coords).addTo(map)
                .bindPopup(`<b>${location.name}</b>`);
        }
    });


    // EFEITO NAVBAR SCROLL
    const navbar = document.querySelector('.navbar');
    if (navbar) { window.addEventListener('scroll', () => { if (window.scrollY > 50) { navbar.classList.add('scrolled'); } else { navbar.classList.remove('scrolled'); } }); }

    // ANIMAÇÕES DE ROLAGEM (SCROLLREVEAL)
    const sr = ScrollReveal({ origin: 'bottom', distance: '50px', duration: 800, delay: 200, easing: 'ease-out', reset: false });
    sr.reveal('.pillar-card', { interval: 150 });
    sr.reveal('.cta-final', { duration: 1000 });
    sr.reveal('.plan-card', { interval: 150, origin: 'bottom' });
    sr.reveal('.location-card', { interval: 200, origin: 'bottom', distance: '80px' });

    if (document.querySelector('.hero')) { sr.reveal('.hero h1', { delay: 300, origin: 'left' }); sr.reveal('.hero p', { delay: 500, origin: 'left' }); sr.reveal('.hero .cta-button', { delay: 700 }); sr.reveal('#missao', { duration: 1200 }); }
    if (document.querySelector('.about-us')) { sr.reveal('.subtitle', { delay: 200 }); sr.reveal('.about-hero-image', { delay: 300, duration: 1000, scale: 0.9 }); sr.reveal('.intro-text', { delay: 400 }); sr.reveal('.approach-card', { interval: 150 }); sr.reveal('.vision-quote', { duration: 1000 }); }
});