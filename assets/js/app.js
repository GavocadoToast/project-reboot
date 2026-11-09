// Modal Control Logic for Orbit
function openAuthModal(type) {
    const modal = document.getElementById('authModal');
    modal.classList.add('active');
    switchForm(type);
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.remove('active');
}

function switchForm(type) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (type === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    } else {
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    }
}

// Close modal if user clicks backdrop
document.getElementById('authModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeAuthModal();
    }
});