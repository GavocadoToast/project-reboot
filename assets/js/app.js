// ==========================================
// 1. Core & Lucide Initialization
// ==========================================

if (window.lucide) {
    lucide.createIcons();
}

// ==========================================
// 2. Theme Switching (Light/Dark Mode)
// ==========================================

const themeToggleBtn = document.getElementById('themeToggle');

if (themeToggleBtn) {
    // Check saved local preference or fall back to light theme
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ==========================================
// 3. Auth Modal Logic (Mockup for Week 3)
// ==========================================

function openAuthModal(type) {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.add('active');
        switchForm(type);
    }
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function switchForm(type) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm && signupForm) {
        if (type === 'login') {
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
        } else {
            signupForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        }
    }
}

// Close auth modal when clicking outside card
document.getElementById('authModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeAuthModal();
    }
});

// ==========================================
// 4. Dynamic Games Catalog (JSON Fetcher)
// ==========================================

let gamesCatalog = [];

// Fetch game array from assets/data/games.json
async function loadGamesCatalog() {
    try {
        const response = await fetch('assets/data/games.json');
        if (!response.ok) throw new Error('Failed to load games catalog');
        
        gamesCatalog = await response.json();
        renderGameGrid();
    } catch (error) {
        console.error('Error loading games:', error);
    }
}

// Render game cards dynamically onto the homepage grid
function renderGameGrid() {
    const grid = document.querySelector('.game-grid');
    if (!grid) return;

    if (gamesCatalog.length === 0) {
        grid.innerHTML = `<p style="color: var(--text-secondary); text-align: center; grid-column: 1/-1;">No games found.</p>`;
        return;
    }

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

    // Refresh Lucide icons for newly created DOM cards
    if (window.lucide) {
        lucide.createIcons();
    }
}

// ==========================================
// 5. Game Player Modal & Actions
// ==========================================

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

    // Reset heart icon active state
    const favBtn = document.getElementById('favBtn');
    if (favBtn) favBtn.classList.remove('favorited');

    gameModal.classList.add('active');
}

function closeGameModal() {
    const gameModal = document.getElementById('gameModal');
    const iframe = document.getElementById('gameIframe');

    if (gameModal) gameModal.classList.remove('active');
    if (iframe) iframe.src = ''; // Prevents game audio from continuing in background
}

function toggleFullscreen() {
    const iframe = document.getElementById('gameIframe');
    if (!iframe) return;

    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    }
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

// Close game player modal when backdrop is clicked
document.getElementById('gameModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeGameModal();
    }
});

// Load games automatically when DOM is ready
document.addEventListener('DOMContentLoaded', loadGamesCatalog);
