// Background images array with more specific queries
const backgroundImages = [
    'https://source.unsplash.com/1920x1080/?technology,digital',
    'https://source.unsplash.com/1920x1080/?innovation,future',
    'https://source.unsplash.com/1920x1080/?tech,computer',
    'https://source.unsplash.com/1920x1080/?data,science'
];

// Get elements
const modal = document.getElementById('registrationModal');
const eventDetailsModal = document.getElementById('eventDetailsModal');
const closeBtns = document.getElementsByClassName('close');
const eventTitle = document.getElementById('eventTitle');
const eventPrice = document.getElementById('eventPrice');
const registrationForm = document.getElementById('registrationForm');
const eventDetailsContent = document.getElementById('eventDetailsContent');

// Event details data
const eventDetails = {
    'Web Development Workshop': {
        title: 'Web Development Workshop',
        date: 'June 15, 2024',
        location: 'San Francisco, CA',
        price: '$299',
        description: 'Join our comprehensive web development workshop where you\'ll learn modern techniques and best practices for building responsive, accessible, and performant websites.',
        agenda: [
            '9:00 AM - Introduction to Modern Web Development',
            '10:30 AM - HTML5 and CSS3 Deep Dive',
            '12:00 PM - Lunch Break',
            '1:00 PM - JavaScript Fundamentals and ES6+',
            '2:30 PM - Responsive Design and CSS Frameworks',
            '4:00 PM - Web Performance Optimization',
            '5:30 PM - Q&A and Networking'
        ],
        speakers: [
            'Jane Smith - Senior Frontend Developer at TechCorp',
            'John Doe - UI/UX Specialist with 10+ years of experience',
            'Sarah Johnson - Web Performance Expert'
        ],
       
    },
    'AI Conference 2024': {
        title: 'AI Conference 2024',
        date: 'July 20, 2024',
        location: 'New York, NY',
        price: '$499',
        description: 'The premier conference on artificial intelligence, bringing together industry leaders, researchers, and practitioners to discuss the latest developments and future of AI.',
        agenda: [
            '8:30 AM - Registration and Breakfast',
            '9:30 AM - Keynote: The Future of AI',
            '11:00 AM - Machine Learning Fundamentals',
            '12:30 PM - Lunch Break',
            '1:30 PM - Deep Learning and Neural Networks',
            '3:00 PM - AI Ethics and Responsible Development',
            '4:30 PM - Panel Discussion: AI in Industry',
            '6:00 PM - Networking Reception'
        ],
        speakers: [
            'Dr. Emily Chen - AI Research Director at TechInnovate',
            'Michael Rodriguez - Machine Learning Engineer at DataCorp',
            'Lisa Thompson - AI Ethics Specialist',
            'David Wilson - CEO of AI Solutions Inc.'
        ],
        
    },
    'Cybersecurity Summit': {
        title: 'Cybersecurity Summit',
        date: 'August 5, 2024',
        location: 'Boston, MA',
        price: '$399',
        description: 'A comprehensive summit focused on the latest cybersecurity threats, defense strategies, and emerging technologies to protect digital assets and infrastructure.',
        agenda: [
            '9:00 AM - Opening Ceremony',
            '10:00 AM - Current Threat Landscape',
            '11:30 AM - Zero Trust Architecture',
            '1:00 PM - Lunch Break',
            '2:00 PM - Cloud Security Best Practices',
            '3:30 PM - Incident Response and Recovery',
            '5:00 PM - Future of Cybersecurity',
            '6:30 PM - Networking Dinner'
        ],
        speakers: [
            'Robert Johnson - Chief Security Officer at SecureNet',
            'Amanda Lee - Penetration Testing Expert',
            'James Wilson - Cybersecurity Consultant',
            'Patricia Martinez - Security Operations Director'
        ],
       
    },
    'Cloud Computing Expo': {
        title: 'Cloud Computing Expo',
        date: 'September 10, 2024',
        location: 'Seattle, WA',
        price: '$349',
        description: 'Explore the latest cloud technologies, deployment strategies, and best practices for building scalable and resilient cloud applications.',
        agenda: [
            '8:30 AM - Registration',
            '9:30 AM - Keynote: Cloud Computing Trends',
            '11:00 AM - Serverless Architecture',
            '12:30 PM - Lunch Break',
            '1:30 PM - Multi-Cloud Strategies',
            '3:00 PM - Cloud Security and Compliance',
            '4:30 PM - DevOps and CI/CD in the Cloud',
            '6:00 PM - Networking Reception'
        ],
        speakers: [
            'Thomas Anderson - Cloud Architect at CloudTech',
            'Jennifer White - DevOps Engineer',
            'Robert Davis - Cloud Security Specialist',
            'Maria Garcia - Solutions Architect'
        ],
       
    },
    'Blockchain Conference': {
        title: 'Blockchain Conference',
        date: 'May 15, 2024',
        location: 'Miami, FL',
        price: '$299',
        description: 'A comprehensive conference on blockchain technology, cryptocurrencies, and decentralized applications, bringing together industry experts and innovators.',
        agenda: [
            '9:00 AM - Introduction to Blockchain',
            '10:30 AM - Cryptocurrency Markets and Trading',
            '12:00 PM - Lunch Break',
            '1:00 PM - Smart Contracts and DApps',
            '2:30 PM - Blockchain for Enterprise',
            '4:00 PM - Regulatory Landscape',
            '5:30 PM - Networking'
        ],
        speakers: [
            'Alex Thompson - Blockchain Developer',
            'Sophia Chen - Cryptocurrency Analyst',
            'Daniel Rodriguez - Smart Contract Expert',
            'Emma Wilson - Blockchain Consultant'
        ],
        image: 'https://source.unsplash.com/800x400/?blockchain'
    },
    'VR/AR Summit': {
        title: 'VR/AR Summit',
        date: 'November 20, 2024',
        location: 'Los Angeles, CA',
        price: '$599',
        description: 'Experience the future of virtual and augmented reality at this cutting-edge summit, featuring demonstrations, workshops, and insights from industry leaders.',
        agenda: [
            '9:00 AM - Registration and Demo Area Open',
            '10:00 AM - Keynote: The Future of VR/AR',
            '11:30 AM - VR Development Workshop',
            '1:00 PM - Lunch Break',
            '2:00 PM - AR Applications in Industry',
            '3:30 PM - Mixed Reality Experiences',
            '5:00 PM - Networking and Demo Showcase',
            '7:00 PM - Evening Reception'
        ],
        speakers: [
            'Christopher Lee - VR Developer at ImmersiveTech',
            'Rachel Martinez - AR Experience Designer',
            'Kevin Johnson - Mixed Reality Specialist',
            'Laura Thompson - VR/AR Content Creator'
        ],
        
    }
};

// Function to open registration modal with animation
function openRegistration(eventName, price) {
    modal.style.display = 'block';
    eventTitle.textContent = `Register for ${eventName}`;
    eventPrice.textContent = `$${price}`;
    
    // Add animation class to modal content
    const modalContent = document.querySelector('.modal-content');
    modalContent.style.animation = 'none';
    modalContent.offsetHeight; // Trigger reflow
    modalContent.style.animation = 'modalSlideIn 0.3s ease';
}

// Function to open event details modal
function openEventDetails(eventName) {
    const event = eventDetails[eventName];
    if (!event) return;
    
    // Create event details HTML
    let detailsHTML = `
        <div class="event-details-header">
            <h2>${event.title}</h2>
            <p><i class="far fa-calendar"></i> ${event.date} | <i class="fas fa-map-marker-alt"></i> ${event.location} | <i class="fas fa-tag"></i> ${event.price}</p>
        </div>
        <img src="${event.image}" alt="${event.title}" class="event-details-image">
        <div class="event-details-section">
            <h3><i class="fas fa-info-circle"></i> About This Event</h3>
            <p>${event.description}</p>
        </div>
        <div class="event-details-section">
            <h3><i class="fas fa-list"></i> Agenda</h3>
            <ul>
                ${event.agenda.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        <div class="event-details-section">
            <h3><i class="fas fa-users"></i> Speakers</h3>
            <ul>
                ${event.speakers.map(speaker => `<li>${speaker}</li>`).join('')}
            </ul>
        </div>
    `;
    
    // Set content and show modal
    eventDetailsContent.innerHTML = detailsHTML;
    eventDetailsModal.style.display = 'block';
    
    // Add animation
    const modalContent = document.querySelector('.event-details-content');
    modalContent.style.animation = 'none';
    modalContent.offsetHeight; // Trigger reflow
    modalContent.style.animation = 'modalSlideIn 0.3s ease';
}

// Close modals when clicking the close button
Array.from(closeBtns).forEach(btn => {
    btn.onclick = function() {
        modal.style.display = 'none';
        eventDetailsModal.style.display = 'none';
    }
});

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
    if (event.target == eventDetailsModal) {
        eventDetailsModal.style.display = 'none';
    }
}

let selectedPaymentMethod = null;
let paymentCompleted = false;

// Function to select payment method
function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    
    // Remove selected class from all options
    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Hide all payment details
    document.querySelectorAll('.payment-details').forEach(details => {
        details.style.display = 'none';
    });
    
    // Show selected payment details
    const selectedOption = document.querySelector(`.payment-option[onclick="selectPaymentMethod('${method}')"]`);
    selectedOption.classList.add('selected');
    
    const details = selectedOption.querySelector('.payment-details');
    details.style.display = 'block';
    
    // Generate QR code if QR payment is selected
    if (method === 'qr') {
        generateQRCode();
    }
    
    // Enable submit button
    document.getElementById('submitBtn').disabled = false;
}

// Function to generate QR code
function generateQRCode() {
    const qrCodeDiv = document.getElementById('qrCode');
    const eventPrice = document.getElementById('eventPrice').textContent;
    
    // Clear previous QR code
    qrCodeDiv.innerHTML = '';
    
    // Create QR code using QRCode.js library
    new QRCode(qrCodeDiv, {
        text: `Payment for ${eventTitle.textContent.replace('Register for ', '')} - ${eventPrice}`,
        width: 150,
        height: 150,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // Reset payment status
    paymentCompleted = false;
    document.getElementById('verifyPaymentBtn').disabled = false;
    
    // Update payment status
    const paymentStatus = document.getElementById('paymentStatus');
    paymentStatus.className = 'payment-status pending';
    paymentStatus.innerHTML = '<i class="fas fa-info-circle"></i> Please scan the QR code and make the payment';
}

// Function to verify payment
function verifyPayment() {
    const paymentStatus = document.getElementById('paymentStatus');
    
    // Show confirmation dialog
    if (confirm('Have you completed the payment? This will mark your payment as verified.')) {
        paymentCompleted = true;
        paymentStatus.className = 'payment-status success';
        paymentStatus.innerHTML = '<i class="fas fa-check-circle"></i> Payment verified successfully!';
        
        // Disable verify button
        document.getElementById('verifyPaymentBtn').disabled = true;
        
        // Enable submit button
        document.getElementById('submitBtn').disabled = false;
    }
}

// Update form submission handler
registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!selectedPaymentMethod) {
        alert('Please select a payment method');
        return;
    }
    
    if (!paymentCompleted) {
        alert('Please complete the payment verification before submitting');
        return;
    }
    
    // Validate file size
    const fileInput = document.getElementById('screenshot');
    if (fileInput.files.length > 0) {
        const fileSize = fileInput.files[0].size / 1024 / 1024; // Convert to MB
        if (fileSize > 2) {
            alert('File size exceeds 2MB limit. Please choose a smaller file.');
            return;
        }
    }
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        screenshot: fileInput.files[0] ? fileInput.files[0].name : 'No file uploaded',
        event: eventTitle.textContent.replace('Register for ', ''),
        price: eventPrice.textContent,
        paymentMethod: selectedPaymentMethod
    };

    // Add success animation to the submit button
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.innerHTML = '<i class="fas fa-check"></i> Registration Successful!';
    submitButton.style.background = 'linear-gradient(45deg, #2ecc71, #27ae60)';
    
    // Show success message
    setTimeout(() => {
        alert('Registration successful!\n\n' + 
              'Name: ' + formData.name + '\n' +
              'Email: ' + formData.email + '\n' +
              'Phone: ' + formData.phone + '\n' +
              'Screenshot: ' + formData.screenshot + '\n' +
              'Event: ' + formData.event + '\n' +
              'Price: ' + formData.price + '\n' +
              'Payment Method: ' + formData.paymentMethod);
        
        // Reset form and close modal
        registrationForm.reset();
        modal.style.display = 'none';
        
        // Reset button
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Registration';
        submitButton.style.background = 'linear-gradient(45deg, #2ecc71, #27ae60)';
        
        // Reset payment status
        selectedPaymentMethod = null;
        paymentCompleted = false;
    }, 1000);
});

// Add hover effect to cards
document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Function to copy UPI ID to clipboard
function copyUpiId(event) {
    event.preventDefault(); // Prevent form submission
    event.stopPropagation(); // Prevent triggering the parent click event
    
    const upiId = document.getElementById('upiId').textContent;
    const copyStatus = document.getElementById('upiCopyStatus');
    
    // Copy to clipboard
    navigator.clipboard.writeText(upiId).then(() => {
        // Show success message
        copyStatus.textContent = 'UPI ID copied to clipboard!';
        copyStatus.classList.add('show');
        
        // Hide message after 2 seconds
        setTimeout(() => {
            copyStatus.classList.remove('show');
        }, 2000);
    }).catch(err => {
        // Show error message
        copyStatus.textContent = 'Failed to copy UPI ID';
        copyStatus.style.color = '#e74c3c';
        copyStatus.classList.add('show');
        
        // Hide message after 2 seconds
        setTimeout(() => {
            copyStatus.classList.remove('show');
            copyStatus.style.color = '#2ecc71';
        }, 2000);
    });
} 