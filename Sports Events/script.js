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
    'International Marathon': {
        title: 'International Marathon',
        date: 'June 15, 2025',
        location: 'Gate No. 1, GLAU',
        price: '₹99',
        description: 'Join thousands of runners from around the world in this prestigious marathon event. The course takes you through the beautiful streets of San Francisco, offering stunning views of the Golden Gate Bridge and the Pacific Ocean.',
        agenda: [
            '5:00 AM - Registration and Packet Pickup',
            '6:00 AM - Warm-up Session',
            '6:30 AM - Marathon Start',
            '7:00 AM - Half Marathon Start',
            '8:00 AM - 10K Start',
            '9:00 AM - 5K Start',
            '12:00 PM - Awards Ceremony'
        ],
        requirements: [
            'Valid ID for registration',
            'Medical certificate (mandatory)',
            'Running gear appropriate for weather conditions',
            'Hydration belt or water bottle',
            'Race number (provided at registration)'
        ],
        amenities: [
            'Professional timing chips',
            'Medical support throughout the course',
            'Hydration stations every 3 miles',
            'Energy gel stations',
            'Finisher medal and certificate',
            'Post-race refreshments'
        ],
        
    },
    '3x3 Basketball Tournament': {
        title: '3x3 Basketball Tournament',
        date: 'July 20, 2025',
        location: 'Basketball Court, GLAU',
        price: '₹199',
        description: 'Experience the fast-paced action of 3x3 basketball in this exciting tournament. Teams from across the country will compete for the championship title in this Olympic-recognized format.',
        agenda: [
            '8:00 AM - Team Registration',
            '9:00 AM - Opening Ceremony',
            '10:00 AM - Pool Play Begins',
            '12:00 PM - Lunch Break',
            '1:00 PM - Quarter Finals',
            '3:00 PM - Semi Finals',
            '5:00 PM - Championship Game',
            '6:00 PM - Awards Ceremony'
        ],
        requirements: [
            'Team of 4 players (3 on court, 1 substitute)',
            'Team registration form',
            'Player IDs',
            'Medical waivers',
            'Team uniforms'
        ],
        amenities: [
            'Professional referees',
            'Tournament T-shirts',
            'Trophies for winners',
            'Refreshments for players',
            'First aid station',
            'Changing rooms'
        ],
        
    },
    'Swimming Championship': {
        title: 'Swimming Championship',
        date: 'August 5, 2025',
        location: 'Mathura Swimming Pool, Govardhan Chauraha, Mathura',
        price: '₹149',
        description: 'Compete in various swimming categories and styles at this prestigious championship. The event features both individual and relay competitions in a state-of-the-art Olympic-sized pool.',
        agenda: [
            '7:00 AM - Registration and Warm-up',
            '8:00 AM - Opening Ceremony',
            '9:00 AM - Individual Medley Events',
            '11:00 AM - Freestyle Events',
            '1:00 PM - Lunch Break',
            '2:00 PM - Backstroke Events',
            '4:00 PM - Breaststroke Events',
            '6:00 PM - Relay Events',
            '7:00 PM - Awards Ceremony'
        ],
        requirements: [
            'Swimming certification',
            'Medical certificate',
            'Competition swimwear',
            'Swim cap',
            'Goggles'
        ],
        amenities: [
            'Olympic-sized pool',
            'Professional timing system',
            'Lifeguards and medical staff',
            'Changing rooms and lockers',
            'Warm-up area',
            'Medals and certificates'
        ],
       
    },
    'Tennis': {
        title: 'Tennis',
        date: 'September 10, 2025',
        location: 'Tennis Ground, GLAU',
        price: '₹249',
        description: 'Join this prestigious tennis tournament featuring both singles and doubles matches. The event takes place on professional-grade courts with experienced umpires and line judges.',
        agenda: [
            '8:00 AM - Player Registration',
            '9:00 AM - Singles Matches Begin',
            '12:00 PM - Lunch Break',
            '1:00 PM - Doubles Matches Begin',
            '4:00 PM - Semi-finals',
            '6:00 PM - Finals',
            '7:00 PM - Awards Ceremony'
        ],
        requirements: [
            'Tennis certification',
            'Medical certificate',
            'Appropriate tennis attire',
            'Tennis racket',
            'Non-marking shoes'
        ],
        amenities: [
            'Professional tennis courts',
            'Ball persons',
            'Umpires and line judges',
            'Practice courts',
            'Player lounge',
            'Trophies and prizes'
        ],
        
    },
    'Soccer Cup': {
        title: 'Soccer Cup',
        date: 'November 15, 2024',
        location: 'Football Ground, GLAU',
        price: '₹299',
        description: 'Experience the thrill of competitive soccer in this exciting tournament. Teams from across the region will compete for the championship title in this professionally organized event.',
        agenda: [
            '8:00 AM - Team Registration',
            '9:00 AM - Opening Ceremony',
            '10:00 AM - Group Stage Matches',
            '12:00 PM - Lunch Break',
            '1:00 PM - Quarter Finals',
            '3:00 PM - Semi Finals',
            '5:00 PM - Championship Match',
            '6:00 PM - Awards Ceremony'
        ],
        requirements: [
            'Team of 11 players (5 substitutes)',
            'Team registration form',
            'Player IDs',
            'Medical waivers',
            'Team uniforms',
            'Cleats and shin guards'
        ],
        amenities: [
            'Professional soccer field',
            'Referees and linesmen',
            'Medical staff',
            'Team tents',
            'Refreshments',
            'Trophies and medals'
        ],
       
    },
    'Volleyball Tournament': {
        title: 'Volleyball Tournament',
        date: 'November 20, 2025',
        location: 'Volleyball Court, GLAU',
        price: '₹199',
        description: 'Compete in this exciting volleyball tournament with teams from around India. The event takes place on professional courts with experienced referees.',
        agenda: [
            '8:00 AM - Team Registration',
            '9:00 AM - Opening Ceremony',
            '10:00 AM - Pool Play Begins',
            '12:00 PM - Lunch Break',
            '1:00 PM - Quarter Finals',
            '3:00 PM - Semi Finals',
            '5:00 PM - Championship Match',
            '6:00 PM - Awards Ceremony'
        ],
        requirements: [
            'Team of 6 players (2 substitutes)',
            'Team registration form',
            'Player IDs',
            'Medical waivers',
            'Team uniforms',
            'Appropriate footwear'
        ],
        amenities: [
            'Professional volleyball courts',
            'Referees',
            'Medical staff',
            'Player lounge',
            'Refreshments',
            'Trophies and prizes'
        ],
        
    }
};

// Function to open registration modal with animation
function openRegistration(eventName, price) {
    modal.style.display = 'block';
    eventTitle.textContent = `Register for ${eventName}`;
    eventPrice.textContent = `₹${price}`;
    
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
            <h3><i class="fas fa-list"></i> Schedule</h3>
            <ul>
                ${event.agenda.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        <div class="event-details-section">
            <h3><i class="fas fa-clipboard-check"></i> Requirements</h3>
            <ul>
                ${event.requirements.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        <div class="event-details-section">
            <h3><i class="fas fa-gift"></i> Event Amenities</h3>
            <ul>
                ${event.amenities.map(item => `<li>${item}</li>`).join('')}
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
    const qrContainer = document.getElementById('qrCode');
    qrContainer.innerHTML = '';
    
    // Generate random payment ID
    const paymentId = 'PAY' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Create QR code
    new QRCode(qrContainer, {
        text: `Payment ID: ${paymentId}\nAmount: ${eventPrice.textContent}\nEvent: ${eventTitle.textContent}`,
        width: 200,
        height: 200
    });
}

// Function to verify payment
function verifyPayment() {
    const verifyBtn = document.getElementById('verifyPaymentBtn');
    verifyBtn.disabled = true;
    verifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
    
    // Simulate payment verification
    setTimeout(() => {
        paymentCompleted = true;
        verifyBtn.innerHTML = '<i class="fas fa-check"></i> Payment Verified';
        verifyBtn.classList.add('verified');
        document.getElementById('submitBtn').disabled = false;
    }, 2000);
}

// Function to copy UPI ID
function copyUpiId(event) {
    event.preventDefault();
    const upiId = document.getElementById('upiId').textContent;
    navigator.clipboard.writeText(upiId).then(() => {
        const copyStatus = document.getElementById('upiCopyStatus');
        copyStatus.textContent = 'UPI ID copied!';
        setTimeout(() => {
            copyStatus.textContent = '';
        }, 2000);
    });
}

// Form submission handler
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!paymentCompleted) {
        alert('Please complete the payment process first.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    setTimeout(() => {
        alert('Registration successful! You will receive a confirmation email shortly.');
        modal.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Registration';
    }, 2000);
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