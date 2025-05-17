// Function to open the login modal
function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = "block";
    }
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const modal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close');
    const loginForm = document.getElementById('loginForm');

    // Load saved credentials if they exist
    const savedId = localStorage.getItem('studentId');
    const savedPassword = localStorage.getItem('password');
    if (savedId && savedPassword) {
        document.getElementById('studentId').value = savedId;
        document.getElementById('password').value = savedPassword;
        document.getElementById('rememberMe').checked = true;
    }

    // When the user clicks on <span> (x), close the modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = "none";
        });
    }

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Handle form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const studentId = document.getElementById('studentId').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // Save credentials if "Remember me" is checked
            if (rememberMe) {
                localStorage.setItem('studentId', studentId);
                localStorage.setItem('password', password);
            } else {
                // Clear saved credentials if "Remember me" is unchecked
                localStorage.removeItem('studentId');
                localStorage.removeItem('password');
            }
            
            // Simulate login success (in real application, you'd verify credentials)
            alert('Login successful! Welcome back, student.');
            modal.style.display = "none";
            this.reset();
        });
    }
});