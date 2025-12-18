document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const module = link.getAttribute('data-module');
            loadModule(module);
        });
    });

    function loadModule(module) {
        let content = '';
        if (!module) {
            // Default: Load hero only, or add intro content
            mainContent.innerHTML = `
                <section class="hero">
                    <h2>Empowering Farmers, Enhancing Yields</h2>
                    <p>Connect with real-time data, advisory, and buyers for sustainable sourcing.</p>
                    <a href="#get-started" class="cta">Explore More</a>
                </section>
            `;
            return;
        }

        mainContent.innerHTML += '<h2>Loading ' + module + '...</h2>'; // Temporary loading

        if (module === 'communities') {
            content = `
                <section id="communities" class="section">
                    <h2>Top Crop Communities</h2>
                    <div class="grid">
                        <div class="card"><h3>Beans Haricot in Karnataka</h3><p>2500+ Farmers</p><a href="#">Join</a></div>
                        <div class="card"><h3>Tomatoes in Tamil Nadu</h3><p>3000+ Farmers</p><a href="#">Join</a></div>
                        <div class="card"><h3>Coconuts in Andhra</h3><p>3500+ Farmers</p><a href="#">Join</a></div>
                    </div>
                </section>
            `;
        } else if (module === 'services') {
            content = `
                <section id="services" class="section">
                    <h2>Agri Services</h2>
                    <ul>
                        <li>Personalized Crop Advisory</li>
                        <li>Quality Checks via AQR</li>
                        <li>Transportation Tracking</li>
                        <li>Weather & Market Alerts</li>
                    </ul>
                    <a href="#" class="cta">Explore Services</a>
                </section>
            `;
        } else if (module === 'linkages') {
            content = `
                <section id="linkages" class="section">
                    <h2>Market Linkages</h2>
                    <ul>
                        <li>Farmer Sourcing & Indent Management</li>
                        <li>Auction Marketplace</li>
                        <li>Payment Automation</li>
                    </ul>
                    <a href="#" class="cta">Connect Now</a>
                </section>
            `;
        } else if (module === 'ecosystem') {
            content = `
                <section id="ecosystem" class="section">
                    <h2>Ecosystem at a Glance</h2>
                    <p>Solutions for 100+ CCs & MHs by Q4 2026</p>
                    <div class="case-studies">
                        <div class="case"><h3>Optimized Sourcing</h3><p>Reduced errors by 90%.</p><a href="#">Read More</a></div>
                        <div class="case"><h3>Weather-Informed Decisions</h3><p>Cost savings.</p><a href="#">Read More</a></div>
                    </div>
                </section>
            `;
        } else if (module === 'partner') {
            content = `
                <section id="partner" class="section">
                    <h2>Elevate Your Operations</h2>
                    <p>Join SuperSource for seamless digitization.</p>
                    <a href="#" class="cta">Partner with Us</a>
                </section>
            `;
        } else if (module === 'crop-discovery') {
            fetch('crop-discovery.html')
                .then(response => response.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    mainContent.innerHTML = doc.querySelector('.section').outerHTML;
                    const script = document.createElement('script');
                    script.src = 'crop-discovery.js';
                    document.body.appendChild(script);
                })
                .catch(() => alert('Error loading module'));
            return;
        } else if (module === 'admin-dashboard') {
            fetch('admin-dashboard.html')
                .then(response => response.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    mainContent.innerHTML = doc.querySelector('.section').outerHTML;
                    const script = document.createElement('script');
                    script.src = 'admin-dashboard.js';
                    document.body.appendChild(script);
                })
                .catch(() => alert('Error loading module'));
            return;
        }

        mainContent.innerHTML = content; // Replace with content (no hero overwrite for modules)
        window.scrollTo({ top: mainContent.offsetTop, behavior: 'smooth' });
    }

    // Load default on page load
    loadModule(null);
});
