document.addEventListener('DOMContentLoaded', () => {
    const signinButton = document.getElementById('google-signin');
    signinButton.addEventListener('click', () => {
        // Mock SSO: In real app, redirect to Google OAuth
        alert('Signing in with Google... Redirecting based on role.');
        // Simulate role-based redirect (e.g., from localStorage or API)
        const mockRole = 'CC Buyer'; // Replace with actual logic
        if (document.getElementById('remember-me').checked) {
            localStorage.setItem('userRole', mockRole);
        }
        // Redirect to homepage after "login"
        window.location.href = 'index.html';
    });
});