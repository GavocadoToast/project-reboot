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
// Game Catalog Data
const gamesCatalog = [
    {
        id: "snake",
        title: "Neon Snake",
        category: "Arcade",
        icon: "gamepad-2",
        description: "Classic snake with responsive controls and high score tracking.",
        path: "games/snake/index.html"
    },
    {
        id: "2048",
        title: "2048 Orbit",
        category: "Puzzle",
        icon: "grid",
        description: "Join the numbers and get to the 2048 tile!",
        path: "games/2048/index.html"
    }
];

// Render Game Cards Dynamically
function renderGameGrid() {
    const grid = document.querySelector('.game-grid');
    if (!grid) return;

    grid.innerHTML = gamesCatalog.map(game => `
        <div class="game-card" onclick="launchGame('${game.id}')">
            <div class="card-image-placeholder">
                <i data-lucide="${game.icon}"></i>
            </div>
            <div class="card-content">
                <span class="game-tag">${game.category}</span>
                <h3>${game.title}</h3>
                <p>${game.description}</p>
            </div>
        </div>
    `).join('');

    // Re-initialize Lucide icons for dynamically created cards
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Game Modal Player Functions
function launchGame(gameId) {
    const game = gamesCatalog.find(g => g.id === gameId);
    if (!game) return;

    const gameModal = document.getElementById('gameModal');
    const iframe = document.getElementById('gameIframe');
    const title = document.getElementById('gameModalTitle');
    const category = document.getElementById('gameModalCategory');

    title.textContent = game.title;
    category.textContent = game.category;
    iframe.src = game.path;

    gameModal.classList.add('active');
}

function closeGameModal() {
    const gameModal = document.getElementById('gameModal');
    const iframe = document.getElementById('gameIframe');

    gameModal.classList.remove('active');
    iframe.src = ''; // Clear iframe to stop audio/game loop
}

function toggleFullscreen() {
    const iframe = document.getElementById('gameIframe');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    }
}

// Close game modal when clicking outside container
document.getElementById('gameModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeGameModal();
    }
});

// Call render on page load
document.addEventListener('DOMContentLoaded', renderGameGrid);

let currentActiveGame = null;

function launchGame(gameId) {
    const game = gamesCatalog.find(g => g.id === gameId);
    if (!game) return;

    currentActiveGame = game;

    const gameModal = document.getElementById('gameModal');
    const iframe = document.getElementById('gameIframe');
    const title = document.getElementById('gameModalTitle');
    const category = document.getElementById('gameModalCategory');

    title.textContent = game.title;
    category.textContent = game.category;
    iframe.src = game.path;

    // Reset favorite heart state
    const favBtn = document.getElementById('favBtn');
    if (favBtn) favBtn.classList.remove('favorited');

    gameModal.classList.add('active');
}

function openInNewTab() {
    if (currentActiveGame && currentActiveGame.path) {
        window.open(currentActiveGame.path, '_blank');
    }
}

function toggleFavorite() {
    const favBtn = document.getElementById('favBtn');
    if (favBtn) {
        favBtn.classList.toggle('favorited');
    }
}
