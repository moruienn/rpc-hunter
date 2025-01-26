const spaceship = document.getElementById('spaceship');
const planetContainer = document.getElementById('planet-container');
const scoreBoard = document.getElementById('score-board');
const countdown = document.getElementById('countdown');
const gameOver = document.getElementById('game-over');
const ccc1 = document.getElementById('ccc1');
const refreshButton = document.getElementById('refresh-button');
const footerText = document.getElementById('footer-text');
const backgroundMusic = document.getElementById('background-music');
let score = 0;
let timeLeft = 60;

// Ekran yüksekliğini ayarla
function resizeGameContainer() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.style.height = `${window.innerHeight}px`;
}

window.addEventListener('load', resizeGameContainer);
window.addEventListener('resize', resizeGameContainer);

// Geri sayım fonksiyonu
function startCountdown() {
    const countdownInterval = setInterval(() => {
        timeLeft--;
        countdown.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            endGame();
        }
    }, 1000);
}

// Oyun bitiş fonksiyonu
function endGame() {
    document.removeEventListener('click', fireBullet);
    clearInterval(planetInterval);
    gameOver.style.display = 'flex';
    ccc1.style.opacity = 1;

    setTimeout(() => {
        refreshButton.style.display = 'block';
        footerText.style.display = 'block';
    }, 7000);
}

// Refresh butonu
refreshButton.addEventListener('click', () => {
    location.reload();
});

// Uzay gemisini fare ile hareket ettirme
document.addEventListener('mousemove', (e) => {
    spaceship.style.left = `${e.clientX - spaceship.offsetWidth / 2}px`;
});

// Gezegen oluşturma fonksiyonu
function createPlanet() {
    const planet = document.createElement('div');
    planet.classList.add('planet');
    planet.style.left = `${Math.random() * (window.innerWidth - 40)}px`;
    planetContainer.appendChild(planet);

    let planetInterval = setInterval(() => {
        const planetTop = parseInt(planet.style.top) || 0;
        planet.style.top = `${planetTop + 2}px`;

        if (planetTop > window.innerHeight) {
            planet.remove();
            clearInterval(planetInterval);
        }
    }, 20);
}

// Her 1 saniyede bir yeni gezegen oluştur
const planetInterval = setInterval(createPlanet, 1000);

// Mermi ateşleme fonksiyonu
function fireBullet() {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = `${spaceship.offsetLeft + spaceship.offsetWidth / 2 - 45}px`;
    bullet.style.bottom = `${spaceship.offsetHeight}px`;
    document.body.appendChild(bullet);

    const bulletInterval = setInterval(() => {
        const bulletBottom = parseInt(bullet.style.bottom);
        bullet.style.bottom = `${bulletBottom + 10}px`;

        const planets = document.querySelectorAll('.planet');
        planets.forEach(planet => {
            const planetRect = planet.getBoundingClientRect();
            const bulletRect = bullet.getBoundingClientRect();

            if (
                bulletRect.bottom >= planetRect.top &&
                bulletRect.left >= planetRect.left &&
                bulletRect.right <= planetRect.right
            ) {
                const explosionNumber = Math.floor(Math.random() * 10) + 1;
                planet.style.backgroundImage = `url('explosion${explosionNumber}.png')`;
                planet.classList.add('explosion');

                setTimeout(() => planet.remove(), 500);

                score++;
                scoreBoard.textContent = `Score: ${score}`;

                bullet.remove();
                clearInterval(bulletInterval);
            }
        });

        if (bulletBottom > window.innerHeight) {
            bullet.remove();
            clearInterval(bulletInterval);
        }
    }, 20);
}

document.addEventListener('click', fireBullet);

// Geri sayımı başlat
startCountdown();

// Müziği başlat
document.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    }
});