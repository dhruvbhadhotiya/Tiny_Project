// Background images array with education/university-themed queries
const backgroundImages = [
    'https://source.unsplash.com/1920x1080/?university,campus',
    'https://source.unsplash.com/1920x1080/?education,college',
    'https://source.unsplash.com/1920x1080/?students,learning',
    'https://source.unsplash.com/1920x1080/?graduation,academic'
];

// Get background slideshow element
const backgroundSlideshow = document.querySelector('.background-slideshow');

// Set initial background
let currentImageIndex = 0;
backgroundSlideshow.style.backgroundImage = `url(${backgroundImages[currentImageIndex]})`;

// Function to change background image
function changeBackgroundImage() {
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    
    // Create new image element to preload
    const nextImage = new Image();
    nextImage.src = backgroundImages[currentImageIndex];
    
    // Once image is loaded, apply it with fade effect
    nextImage.onload = function() {
        backgroundSlideshow.style.opacity = '0';
        
        setTimeout(() => {
            backgroundSlideshow.style.backgroundImage = `url(${backgroundImages[currentImageIndex]})`;
            backgroundSlideshow.style.opacity = '0.8';
        }, 500);
    };
}

// Change background every 10 seconds
setInterval(changeBackgroundImage, 10000);

// Add smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effects for cards
const aboutCards = document.querySelectorAll('.about-card');

aboutCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.2)';
    });
});

// Initialize AOS (Animate On Scroll) if available
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
} 