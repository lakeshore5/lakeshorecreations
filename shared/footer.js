// Load footer component
function loadFooter() {
    console.log('Loading footer...');
    const footerContainer = document.getElementById('footer-container');
    
    if (!footerContainer) {
        console.error('Footer container not found!');
        return;
    }

    // Embed footer HTML directly to avoid file:// protocol issues
    const footerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Mythos Creations</h3>
                    <p>Professional Minecraft Build Team</p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="./">Home</a></li>
                        <li><a href="portfolio.html">Portfolio</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Mythos Creations. All rights reserved.</p>
            </div>
        </div>
    </footer>`;

    footerContainer.innerHTML = footerHTML;
    console.log('Footer loaded successfully');
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadFooter };
}
