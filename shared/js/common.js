/**
 * GLA Events - Common JavaScript Functions
 * This file contains shared functions used across multiple pages of the GLA Events website.
 */

// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();
    
    // Initialize modals
    initModals();
    
    // Initialize event registration
    if (document.getElementById('registrationForm')) {
        initEventRegistration();
    }
    
    // Initialize carousels
    if (document.querySelector('.carousel-container')) {
        initCarousels();
    }
});

/**
 * Initialize mobile navigation and dropdown menus
 */
function initNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    // Handle mobile menu toggle
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger to X
            const bars = this.querySelectorAll('.bar');
            if (bars.length === 3) {
                if (this.classList.contains('active')) {
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
    
    // Handle dropdown menus on mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (link && menu && window.innerWidth <= 768) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                menu.classList.toggle('show');
            });
        }
    });
}

/**
 * Initialize modal dialogs
 */
function initModals() {
    // Get all modals
    const modals = document.querySelectorAll('.modal');
    
    // Get all elements that close modals
    const closeButtons = document.querySelectorAll('.close');
    
    // When the user clicks on a close button, close the modal
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            modals.forEach(modal => {
                modal.style.display = "none";
            });
        });
    });
    
    // When the user clicks anywhere outside of the modal content, close it
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
}

/**
 * Open registration modal for an event
 * @param {string} eventName - The name of the event
 * @param {number} eventPrice - The price of the event
 */
function openRegistration(eventName, eventPrice) {
    const modal = document.getElementById('registrationModal');
    const title = document.getElementById('eventTitle');
    const price = document.getElementById('eventPrice');
    
    if (modal && title && price) {
        title.innerHTML = `<i class="fas fa-user-plus"></i> Register for ${eventName}`;
        price.textContent = `₹${eventPrice}`;
        modal.style.display = "block";
    }
}

/**
 * Open event details modal
 * @param {string} eventName - The name of the event
 */
function openEventDetails(eventName) {
    const modal = document.getElementById('eventDetailsModal');
    const content = document.getElementById('eventDetailsContent');
    
    if (modal && content) {
        // The content will be loaded dynamically based on the event name
        // This is typically implemented in each page separately
        modal.style.display = "block";
    }
}

/**
 * Initialize event registration functionality
 */
function initEventRegistration() {
    // Payment method selection
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            const method = this.getAttribute('data-method') || this.onclick.toString().match(/selectPaymentMethod\('(.+?)'\)/)[1];
            selectPaymentMethod(method);
        });
    });
    
    // Form submission handling
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Form processing logic would go here
            alert('Thank you for registering! We will contact you with further details.');
            document.getElementById('registrationModal').style.display = "none";
            this.reset();
        });
    }
}

/**
 * Select a payment method
 * @param {string} method - The payment method (bank, qr, upi)
 */
function selectPaymentMethod(method) {
    // Hide all payment details
    const paymentDetails = document.querySelectorAll('.payment-details');
    paymentDetails.forEach(detail => {
        detail.style.display = 'none';
    });
    
    // Show selected payment method details
    const selectedDetails = document.querySelector(`.${method}-details`);
    if (selectedDetails) {
        selectedDetails.style.display = 'block';
    }
    
    // Enable verification button for QR code payments
    if (method === 'qr') {
        document.getElementById('verifyPaymentBtn').disabled = false;
        
        // Generate QR code
        const qrCode = document.getElementById('qrCode');
        if (qrCode && window.QRCode) {
            qrCode.innerHTML = '';
            new QRCode(qrCode, {
                text: "gla-events-payment",
                width: 128,
                height: 128
            });
        }
    }
}

/**
 * Verify payment (simulated)
 */
function verifyPayment() {
    const paymentStatus = document.getElementById('paymentStatus');
    const submitBtn = document.getElementById('submitBtn');
    
    if (paymentStatus && submitBtn) {
        paymentStatus.innerHTML = '<i class="fas fa-check-circle"></i> Payment verified successfully!';
        paymentStatus.classList.add('payment-success');
        submitBtn.disabled = false;
    }
}

/**
 * Copy UPI ID to clipboard
 * @param {Event} event - The click event
 */
function copyUpiId(event) {
    event.preventDefault();
    const upiId = document.getElementById('upiId');
    const copyStatus = document.getElementById('upiCopyStatus');
    
    if (upiId && copyStatus) {
        const textArea = document.createElement('textarea');
        textArea.value = upiId.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        copyStatus.textContent = 'Copied to clipboard!';
        setTimeout(() => {
            copyStatus.textContent = '';
        }, 2000);
    }
}

/**
 * Initialize carousel functionality
 */
function initCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.dot');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            if (dots.length) {
                dots.forEach(dot => dot.classList.remove('active'));
                dots[index].classList.add('active');
            }
            slides[index].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        function startAutoSlide() {
            stopAutoSlide(); // Clear any existing interval
            slideInterval = setInterval(nextSlide, 3000);
        }

        function stopAutoSlide() {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
        }

        // Event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoSlide();
            });
        }

        if (dots.length) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentSlide = index;
                    showSlide(currentSlide);
                    startAutoSlide();
                });
            });
        }

        // Start auto-sliding
        startAutoSlide();

        // Pause auto-sliding when hovering over the carousel
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    });
} 