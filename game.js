// Récupération du canvas et du contexte pour dessiner
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Taille du canvas
canvas.width = 600;
canvas.height = 600;

// Position de départ et taille de l'avion
let planeX = 275;  // Position X de l'avion
let planeY = 275;  // Position Y de l'avion
const planeWidth = 50;
const planeHeight = 50;
const speed = 5;  // Vitesse de déplacement

// Fonction pour dessiner l'avion
function drawPlane() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Efface l'ancien cadre
    ctx.fillStyle = 'red';
    ctx.fillRect(planeX, planeY, planeWidth, planeHeight);  // Dessine l'avion
}

// Fonction pour gérer les déplacements de l'avion
function movePlane(event) {
    if (event.key === 'ArrowUp' && planeY > 0) {
        planeY -= speed;  // Déplace l'avion vers le haut
    }
    if (event.key === 'ArrowDown' && planeY < canvas.height - planeHeight) {
        planeY += speed;  // Déplace l'avion vers le bas
    }
    if (event.key === 'ArrowLeft' && planeX > 0) {
        planeX -= speed;  // Déplace l'avion vers la gauche
    }
    if (event.key === 'ArrowRight' && planeX < canvas.width - planeWidth) {
        planeX += speed;  // Déplace l'avion vers la droite
    }
    drawPlane();  // Redessine l'avion après le déplacement
}

// Écouter les événements de touche pour déplacer l'avion
document.addEventListener('keydown', movePlane);

// Initialiser l'affichage du jeu
drawPlane();
