// Shared Hero Component - Slideshow Background
function loadHeroSlideshow() {
    // Find the background container
    const backgroundContainer = document.querySelector('.background-container');
    if (!backgroundContainer) return;
    
    // Check if slideshow already exists
    if (backgroundContainer.querySelector('.hero-slideshow')) return;
    
    // Create the slideshow HTML
    const slideshowHTML = `
        <div class="hero-slideshow">
            <div class="hero-slide active" style="background-image: url('builds/lakeshore5/FutureX.webp');"></div>
            <div class="hero-slide" style="background-image: url('builds/lakeshore5/LoriostrondNew.webp');"></div>
            <div class="hero-slide" style="background-image: url('builds/lakeshore5/CMACinematic.webp');"></div>
        </div>
    `;
    
    // Remove static background-image if present
    const bgImage = backgroundContainer.querySelector('.background-image');
    if (bgImage) {
        bgImage.remove();
    }
    
    // Insert slideshow at the beginning of background container
    backgroundContainer.insertAdjacentHTML('afterbegin', slideshowHTML);
    
    // Initialize the slideshow animation
    initHeroSlideshow();
}

/**
 * Hero Background Slideshow Animation
 */
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const SLIDE_DURATION = 8000; // 8 seconds
    
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, SLIDE_DURATION);
}
