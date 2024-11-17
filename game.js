// Récupérer les éléments du DOM
const rocket = document.getElementById('rocket');
const o2Tank = document.getElementById('o2Tank');
const h2Tank = document.getElementById('h2Tank');
const fillO2Button = document.getElementById('fillO2');
const fillH2Button = document.getElementById('fillH2');
const launchRocketButton = document.getElementById('launchRocket');

// Variables de contrôle de la fusée
let o2Filled = false;
let h2Filled = false;
let isLaunched = false;

// Fonction pour remplir le réservoir O2
fillO2Button.addEventListener('click', function() {
    if (!isLaunched) {
        o2Tank.style.height = '50%';  // Remplir le réservoir O2 à 50%
        o2Filled = true;
    }
});

// Fonction pour remplir le réservoir H2
fillH2Button.addEventListener('click', function() {
    if (!isLaunched) {
        h2Tank.style.height = '50%';  // Remplir le réservoir H2 à 50%
        h2Filled = true;
    }
});

// Fonction pour décoller la fusée
launchRocketButton.addEventListener('click', function() {
    if (o2Filled && h2Filled && !isLaunched) {
        isLaunched = true;

        // Change la couleur de la fusée (elle s'allume)
        rocket.style.backgroundColor = 'yellow';

        // Décoller la fusée vers le haut
        let position = 0;
        const interval = setInterval(function() {
            if (position >= -500) {  // La fusée se déplace de 500px vers le haut
                rocket.style.transform = `translateY(${position}px)`;
                position -= 5;  // Augmente la vitesse de déplacement
            } else {
                clearInterval(interval);  // Arrêter le mouvement une fois que la fusée est hors écran
            }
        }, 20);  // Déplacer la fusée tous les 20ms
    } else {
        alert("Il faut remplir O2 et H2 avant de décoller !");
    }
});
