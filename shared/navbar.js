// Shared Navbar Component Loader
function loadNavbar(activePage) {
    const navbarHTML = `
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="./">
                    <img src="assets/images/Logo.png" alt="Mythos Creations logo" class="nav-logo-img">
                    <span>Mythos Creations</span>
                </a>
            </div>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="./" class="nav-link" data-page="home">Home</a>
                </li>
                <li class="nav-item nav-dropdown">
                    <a href="portfolio.html" class="nav-link" data-page="portfolio">Portfolio</a>
                    <ul class="dropdown-menu">
                        <li><a href="portfolio.html#immersive-worlds" class="dropdown-link">Immersive Worlds</a></li>
                        <li><a href="portfolio.html#organics" class="dropdown-link">Organics</a></li>
                        <li><a href="portfolio.html#miscellaneous" class="dropdown-link">Miscellaneous</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a href="about.html" class="nav-link" data-page="about">About</a>
                </li>
                <li class="nav-item">
                    <a href="contact.html" class="nav-link" data-page="contact">Contact</a>
                </li>
            </ul>
            <div class="nav-toggle" id="mobile-menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </nav>`;
    
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = navbarHTML;
    } else {
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    }
    
    if (activePage) {
        const activeLink = document.querySelector(`[data-page="${activePage}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    initMobileNavigation();
}

function initMobileNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!mobileMenu || !navMenu) return;
    
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link, .dropdown-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}
