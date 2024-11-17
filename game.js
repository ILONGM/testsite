// Récupération du canvas et du contexte pour dessiner
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Taille du canvas
canvas.width = 600;
canvas.height = 600;

// Position de départ et taille de l'avion
let planeX = 275;  // Position X de l'avion
let planeY = 275;  // Position Y de l'avion
const planeWidth = 50;  // Largeur de l'image de l'avion
const planeHeight = 50;  // Hauteur de l'image de l'avion
const speed = 10;  // Vitesse de l'avion

// Charger l'image de l'avion
const planeImage = new Image();
planeImage.src = 'images/plane.png';  // Chemin vers l'image de l'avion

// Fonction pour dessiner l'avion avec l'image
function drawPlane() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Efface l'ancien cadre
    
    // Dessiner l'image de l'avion sur le canvas
    ctx.drawImage(planeImage, planeX, planeY, planeWidth, planeHeight);
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

// Attendre que l'image de l'avion soit complètement chargée avant de commencer à dessiner
planeImage.onload = function() {
    drawPlane();  // Dessiner l'avion une fois que l'image est chargée
}

// Écouter les événements de touche pour déplacer l'avion
document.addEventListener('keydown', movePlane);
