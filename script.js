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
        if (!module) {
            mainContent.innerHTML = `
                <section class="hero">
                    <h2>Empowering Farmers, Enhancing Yields</h2>
                    <p>Connect with real-time data, advisory, and buyers for sustainable sourcing.</p>
                    <a href="#get-started" class="cta">Explore More</a>
                </section>
            `;
            return;
        }
        let content = '';
        if (module === 'communities') {
            content = `
                <section id="communities" class="section">
                    <h2>Top Crop Communities</h2>
                    <div class="grid">
                        <div class="card">
                            <img src="https://kj1bcdn.b-cdn.net/media/25874/beans.jpg" alt="Haricot beans farm in Karnataka" class="card-img">
                            <h3>Beans Haricot in Karnataka</h3>
                            <p>2500+ Farmers Digitized</p>
                            <p>11,324 Acres Covered</p>
                            <a href="#">Join Community</a>
                        </div>
                        <div class="card">
                            <img src="https://images.squarespace-cdn.com/content/v1/57c8695d5016e11e71be1d83/1520631241070-SE8DP79H412DCHDUFRQV/tonato-under-drip-1-696x464.jpg" alt="Tomato farm in Tamil Nadu" class="card-img">
                            <h3>Tomatoes in Tamil Nadu</h3>
                            <p>3000+ Farmers Digitized</p>
                            <p>30,000 Acres Covered</p>
                            <a href="#">Join Community</a>
                        </div>
                        <div class="card">
                            <img src="https://coconutseller.in/wp-content/uploads/2021/06/Coconut-cultivation.jpg" alt="Coconut plantation in Andhra Pradesh" class="card-img">
                            <h3>Coconuts in Andhra</h3>
                            <p>3500+ Farmers Digitized</p>
                            <p>72,000 Acres Covered</p>
                            <a href="#">Join Community</a>
                        </div>
                    </div>
                </section>
            `;
        } else if (module === 'services') {
            content = `
                <section id="services" class="section">
                    <img src="http://www.zenadrone.com/wp-content/uploads/2022/10/smart-farming-and-plantation-1024x536.jpg" alt="Drone monitoring in Indian farm" class="section-img">
                    <h2>Agri Services</h2>
                    <ul>
                        <li>Personalized Crop Advisory & Recommendations</li>
                        <li>Phygital Monitoring with GPS & Drones</li>
                        <li>Quality Checks via AQR</li>
                        <li>Transportation Tracking & Cost Digitization</li>
                        <li>Weather & Market Alerts</li>
                    </ul>
                    <a href="#" class="cta">Explore Services</a>
                </section>
            `;
        } else if (module === 'linkages') {
            content = `
                <section id="linkages" class="section">
                    <img src="https://sankalpbhoomitrust.org/wp-content/uploads/2023/08/8-1024x614.png.webp" alt="Indian farmers market linkages" class="section-img">
                    <h2>Market Linkages</h2>
                    <ul>
                        <li>Farmer Sourcing & Indent Management</li>
                        <li>Auction Marketplace for RFQs</li>
                        <li>Payment Automation & Settlements</li>
                        <li>Supplier Performance Scoring</li>
                        <li>Contract Management with E-Sign</li>
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
                        <div class="case"><h3>Case Study: Optimized Sourcing</h3><p>Reduced errors by 90% with real-time data.</p><a href="#">Read More</a></div>
                        <div class="case"><h3>Case Study: Weather-Informed Decisions</h3><p>Cost savings through alerts & forecasting.</p><a href="#">Read More</a></div>
                    </div>
                </section>
            `;
        } else if (module === 'partner') {
            content = `
                <section id="partner" class="section">
                    <h2>Elevate Your Operations</h2>
                    <p>Join SuperSource for seamless supply chain digitization.</p>
                    <a href="#" class="cta">Partner with Us</a>
                </section>
            `;
        } else if (module === 'marketplace') {
            content = `
                <section id="marketplace" class="section fancy-section">
                    <h2>Marketplace - Buy & Rent Farm Products</h2>
                    <p class="fancy-text">Discover premium products from trusted partners. SuperSource charges a small platform fee (5%) on transactions for seamless service.</p>
                    <input type="text" id="search" placeholder="Search products (e.g., tractor, fertilizer)" oninput="filterProducts()" class="fancy-input">
                    <div id="ads-section">
                        <h3>Featured Ads</h3>
                        <div class="grid fancy-grid">
                            <div class="card ad-card">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7ZKGlnpOsxQ29VW4SREHChVqB0yszIO6Huw&s" alt="Organic Fertilizer Ad">
                                <p>Discount on Organic Fertilizers from AgriCo!</p>
                            </div>
                            <div class="card ad-card">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvxsbZN7EFtF7vSf6zQPbqKu2mt6xFkoBAZA&s" alt="Tractor Rental Ad">
                                <p>Rent Tractors Easily from FarmTech</p>
                            </div>
                        </div>
                    </div>
                    <div id="products-section" class="grid fancy-grid">
                        <!-- Dynamic products -->
                    </div>
                </section>
            `;
            mainContent.innerHTML = content;
            // Mock products and JS logic
            const products = [
                { name: 'Tractor Rental', category: 'Equipment', price: 500, fee: 25, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvxsbZN7EFtF7vSf6zQPbqKu2mt6xFkoBAZA&s', company: 'FarmTech' },
                { name: 'Fertilizer Pack (10kg)', category: 'Fertilizers', price: 200, fee: 10, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7ZKGlnpOsxQ29VW4SREHChVqB0yszIO6Huw&s', company: 'AgriCo' },
                { name: 'Pesticide Spray (5L)', category: 'Pesticides', price: 150, fee: 7.5, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0b8Z0q-3Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0A&s', company: 'PestGuard' },
                { name: 'Harvester Purchase', category: 'Equipment', price: 10000, fee: 500, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0b8Z0q-3Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0A&s', company: 'HarvestPro' },
            ];
            let productsSection = document.getElementById('products-section');
            products.forEach(product => {
                productsSection.innerHTML += `
                    <div class="card product-card">
                        <img src="${product.img}" alt="${product.name}">
                        <h3>${product.name} (${product.category})</h3>
                        <p>Price: ₹${product.price} + Fee: ₹${product.fee}</p>
                        <p>From: ${product.company}</p>
                        <button class="cta fancy-btn" onclick="alert('Purchasing ${product.name} for ₹${product.price + product.fee}. Redirecting to payment...')">Buy/Rent</button>
                    </div>
                `;
            });
            // Search filter
            window.filterProducts = () => {
                const query = document.getElementById('search').value.toLowerCase();
                const cards = document.querySelectorAll('.product-card');
                cards.forEach(card => {
                    const name = card.querySelector('h3').textContent.toLowerCase();
                    card.style.display = name.includes(query) ? 'block' : 'none';
                });
            };
            return;
        }
        if (content) {
            mainContent.innerHTML = content;
        } else if (module === 'crop-discovery') {
            mainContent.innerHTML = '<section class="hero"><h2>Loading...</h2></section>';
            fetch('crop-discovery.html')
                .then(response => response.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    mainContent.innerHTML = doc.querySelector('.section').outerHTML || '<h2>Error: Section not found in file.</h2>';
                    const script = document.createElement('script');
                    script.src = 'crop-discovery.js';
                    document.body.appendChild(script);
                })
                .catch(() => {
                    mainContent.innerHTML = '<section class="hero"><h2>Error loading module. Check if crop-discovery.html exists.</h2></section>';
                });
            return;
        } else if (module === 'admin-dashboard') {
            mainContent.innerHTML = '<section class="hero"><h2>Loading...</h2></section>';
            fetch('admin-dashboard.html')
                .then(response => response.text())
                .then(html => {
                    const parser = new DOM Parser();
                    const doc = parser.parseFromString(html, 'text/html');
                    mainContent.innerHTML = doc.querySelector('.section').outerHTML || '<h2>Error: Section not found in file.</h2>';
                    const script = document.createElement('script');
                    script.src = 'admin-dashboard.js';
                    document.body.appendChild(script);
                })
                .catch(() => {
                    mainContent.innerHTML = '<section class="hero"><h2>Error loading module. Check if admin-dashboard.html exists.</h2></section>';
                });
            return;
        } else {
            mainContent.innerHTML = '<section class="hero"><h2>Module not found.</h2></section>';
        }
        window.scrollTo({ top: mainContent.offsetTop, behavior: 'smooth' });
    }
    // Load default on page load
    loadModule(null);
    // Logo click to homepage
    const logo = document.getElementById('logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            loadModule(null); // Loads default hero content
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
        });
        logo.style.cursor = 'pointer'; // Changes cursor to hand on hover
    }
});
