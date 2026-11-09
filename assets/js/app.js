// Initialize Lucide Icons
lucide.createIcons();

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('themeToggle');

// Check saved theme or system preference
const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

document.documentElement.setAttribute('data-theme', savedTheme);

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

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

// Close modal when clicking backdrop
document.getElementById('authModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeAuthModal();
    }
});
