document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, initializing auth UI");
    const loginModal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
    const authSection = document.getElementById('auth-section');
    const closeBtn = document.querySelector('.close');

    if (!authSection) {
        console.error("auth-section element not found in the DOM");
        return;
    }

    // Check login status and update UI
    function updateAuthUI() {
        console.log("Updating auth UI");
        const user = localStorage.getItem('username');
        if (user) {
            console.log("User logged in:", user);
            // User is logged in
            authSection.innerHTML = `
                <div class="profile-dropdown">
                    <button class="profile-btn">
                        <span class="user-icon">👤</span>
                        ${user}
                        <span class="arrow">▼</span>
                    </button>
                    <div class="dropdown-content">
                        <a href="#" id="logout">Logout</a>
                    </div>
                </div>
            `;
            const logoutBtn = document.getElementById('logout');
            logoutBtn.addEventListener('click', handleLogout);
        } else {
            console.log("User not logged in");
            // User is not logged in
            authSection.innerHTML = `<button class="login-btn">Login</button>`;
            const loginBtn = authSection.querySelector('.login-btn');
            loginBtn.addEventListener('click', () => {
                console.log("Login button clicked, showing modal");
                loginModal.style.display = 'block';
            });
        }
    }

    // Handle login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log("Login form submitted");
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Basic validation
        if (username && password) {
            localStorage.setItem('username', username);
            loginModal.style.display = 'none';
            alert('Login successful! Welcome, ' + username);
            console.log("Login successful, updating UI");
            updateAuthUI();
            loginForm.reset();
        } else {
            alert('Please enter both username and password');
        }
    });

    // Handle logout
    function handleLogout(e) {
        e.preventDefault();
        console.log("Logout clicked");
        localStorage.removeItem('username');
        updateAuthUI();
        alert('Logged out successfully');
    }

    // Close modal
    closeBtn.addEventListener('click', () => {
        console.log("Close button clicked, hiding modal");
        loginModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            console.log("Clicked outside modal, hiding modal");
            loginModal.style.display = 'none';
        }
    });

    // Initialize UI
    updateAuthUI();
});