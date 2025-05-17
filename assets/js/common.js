// Common JavaScript for GLA University Events Website

// Background Slideshow
function initBackgroundSlideshow(images) {
    const backgroundSlideshow = document.querySelector('.background-slideshow');
    
    if (!backgroundSlideshow) return;
    
    let currentImageIndex = 0;
    
    // Set initial background
    if (images && images.length > 0) {
        backgroundSlideshow.style.backgroundImage = `url(${images[0]})`;
    }
    
    // Change background periodically
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        backgroundSlideshow.style.backgroundImage = `url(${images[currentImageIndex]})`;
    }, 5000);
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        
        // Add animation class to modal content
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.animation = 'none';
            modalContent.offsetHeight; // Trigger reflow
            modalContent.style.animation = 'modalSlideIn 0.3s ease';
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Event Registration Functions
function openRegistration(eventName, price) {
    const eventTitle = document.getElementById('eventTitle');
    const eventPrice = document.getElementById('eventPrice');
    
    if (eventTitle) eventTitle.textContent = `Register for ${eventName}`;
    if (eventPrice) eventPrice.textContent = `₹${price}`;
    
    openModal('registrationModal');
}

function selectPaymentMethod(method) {
    // Remove selected class from all payment options
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Hide all payment details
    const paymentDetails = document.querySelectorAll('.payment-details');
    paymentDetails.forEach(detail => {
        detail.style.display = 'none';
    });
    
    // Add selected class to the chosen payment option
    const selectedOption = document.querySelector(`.payment-option[onclick*="${method}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }
    
    // Show the corresponding payment details
    const selectedDetails = document.querySelector(`.${method}-details`);
    if (selectedDetails) {
        selectedDetails.style.display = 'block';
    }
    
    // If QR code is selected, generate it
    if (method === 'qr') {
        generateQRCode();
    }
    
    // Enable the verify payment button only for QR code option
    const verifyPaymentBtn = document.getElementById('verifyPaymentBtn');
    if (verifyPaymentBtn) {
        verifyPaymentBtn.disabled = method !== 'qr';
    }
    
    // Enable submit button
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.disabled = false;
    }
}

// QR Code Generation
function generateQRCode() {
    const qrCodeElement = document.getElementById('qrCode');
    if (!qrCodeElement) return;
    
    // Clear previous QR code
    qrCodeElement.innerHTML = '';
    
    // Get event price
    const price = document.getElementById('eventPrice').textContent;
    
    // Create QR code with event and price info
    if (typeof QRCode !== 'undefined') {
        new QRCode(qrCodeElement, {
            text: `Payment for GLA University Event: ${price}`,
            width: 150,
            height: 150,
            colorDark: '#3498db',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    }
}

// UPI Functions
function copyUpiId(event) {
    event.preventDefault();
    
    const upiId = document.getElementById('upiId');
    const copyStatus = document.getElementById('upiCopyStatus');
    
    if (!upiId || !copyStatus) return;
    
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = upiId.textContent;
    document.body.appendChild(textarea);
    
    // Select and copy the text
    textarea.select();
    document.execCommand('copy');
    
    // Remove the temporary element
    document.body.removeChild(textarea);
    
    // Show success message
    copyStatus.textContent = 'UPI ID copied to clipboard!';
    copyStatus.classList.add('show');
    
    // Hide the message after 2 seconds
    setTimeout(() => {
        copyStatus.classList.remove('show');
    }, 2000);
}

// Event Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Close modal when clicking on close button or outside the modal
    const closeBtns = document.querySelectorAll('.close');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Add form submission handler
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Show success message
            const paymentStatus = document.getElementById('paymentStatus');
            if (paymentStatus) {
                paymentStatus.textContent = 'Registration submitted successfully! Check your email for confirmation.';
                paymentStatus.className = 'payment-status success';
            }
            
            // Disable submit button
            const submitBtn = document.getElementById('submitBtn');
            if (submitBtn) {
                submitBtn.disabled = true;
            }
            
            // Reset form after 3 seconds and close modal
            setTimeout(() => {
                this.reset();
                const modal = document.getElementById('registrationModal');
                if (modal) {
                    modal.style.display = 'none';
                }
            }, 3000);
        });
    }
}); 