// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle the three bars to form an X
            const bars = document.querySelectorAll('.bar');
            if (bars.length === 3) {
                if (mobileMenuToggle.classList.contains('active')) {
                    bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                    bars[1].style.opacity = '0';
                    bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
                } else {
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            }
        });
    }
    
    // Mobile dropdown menus
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        if (link && window.innerWidth <= 768) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });
    
    // Dark Mode Toggle - Main toggle in navbar
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check if dark mode is enabled in localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.setAttribute('data-theme', 'dark');
        if (darkModeToggle) darkModeToggle.checked = true;
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                body.removeAttribute('data-theme');
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }
    
    // Secondary dark mode toggle (icon button)
    const darkModeButton = document.querySelector('.dark-mode-toggle');
    if (darkModeButton && !darkModeButton.id) {
        darkModeButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const icon = darkModeButton.querySelector('i');
            if (icon) {
                if (document.body.classList.contains('dark-mode')) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
        });
    }
    
    // Mobile header menu toggle
    const headerMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (headerMenuToggle) {
        const mainNav = document.querySelector('.main-nav');
        headerMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            headerMenuToggle.classList.toggle('active');
        });
    }
    
    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate position with offset and ensure it doesn't scroll too far
                const headerOffset = 60;
                const footerPadding = 50; // Add padding to prevent scrolling to the very bottom
                
                // Get element position
                const elementPosition = targetElement.getBoundingClientRect().top;
                let offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // For footer specifically, add extra padding to prevent scrolling to the bottom
                if (targetId === '#footer') {
                    // Calculate so footer is in view but not at bottom edge
                    const windowHeight = window.innerHeight;
                    const footerHeight = targetElement.offsetHeight;
                    
                    // If footer is taller than viewport, scroll to a position that shows the top
                    if (footerHeight > windowHeight - 100) {
                        offsetPosition = offsetPosition - footerPadding;
                    } else {
                        // Otherwise position it nicely in view
                        offsetPosition = document.body.scrollHeight - windowHeight - footerPadding;
                    }
                }
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active') && mobileMenuToggle) {
                    mobileMenuToggle.click();
                }
            }
        });
    });
    
    // Diagonal Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.dots');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const currentSlideElem = document.querySelector('.current-slide');
    const totalSlidesElem = document.querySelector('.total-slides');
    const progressBar = document.querySelector('.progress-bar');
    
    let currentSlide = 0;
    let slideInterval;
    const autoSlideDelay = 3000; // 5 seconds between auto slides
    
    // Initialize the slider
    function initSlider() {
        if (!slides.length || !dotsContainer) return;
        
        // Create navigation dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        // Set total slides number
        if (totalSlidesElem) {
            totalSlidesElem.textContent = slides.length.toString().padStart(2, '0');
        }
        
        // Set initial slide
        updateSlide();
        
        // Start auto sliding
        startAutoSlide();
    }
    
    // Go to specific slide
    function goToSlide(index) {
        // Reset auto slide timer
        resetAutoSlide();
        
        // Update current slide index
        currentSlide = index;
        
        // Handle index overflow
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        } else if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        
        updateSlide();
    }
    
    // Update slide display
    function updateSlide() {
        // Update slide classes
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'next', 'prev');
            
            if (index === currentSlide) {
                slide.classList.add('active');
            } else if (index === (currentSlide + 1) % slides.length) {
                slide.classList.add('next');
            } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
                slide.classList.add('prev');
            }
        });
        
        // Update dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update current slide number
        if (currentSlideElem) {
            currentSlideElem.textContent = (currentSlide + 1).toString().padStart(2, '0');
        }
        
        // Update progress bar
        if (progressBar) {
            const progress = ((currentSlide + 1) / slides.length) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }
    
    // Go to next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Go to previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Start auto sliding
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, autoSlideDelay);
    }
    
    // Reset auto slide timer
    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }
    
    // Event listeners for slider
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Pause auto slide on hover
    const sliderContainer = document.querySelector('.hero-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Keyboard navigation for slider
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Initialize the slider if elements exist
    if (slides.length) {
        initSlider();
    }
    
    // Back to Top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
    }
    
    // Smooth Animation on Scroll for Features and Categories sections
    function animateOnScroll() {
        const elements = document.querySelectorAll('.category-card, .feature-item, .testimonial-card, .contact-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            }
        });
    }
    
    // Set initial state for animation elements
    const animationElements = document.querySelectorAll('.category-card, .feature-item, .testimonial-card, .contact-card');
    animationElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });
    
    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
}); 


