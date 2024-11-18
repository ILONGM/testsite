// Simule des prix fictifs pour tester le tableau
const prices = {
    tesla: 250.50,
    coca: 60.30,
    apple: 170.80
};

// Fonction pour initialiser les prix des actions dans le tableau
function initializePrices() {
    document.getElementById('tesla-price').textContent = prices.tesla.toFixed(2);
    document.getElementById('coca-price').textContent = prices.coca.toFixed(2);
    document.getElementById('apple-price').textContent = prices.apple.toFixed(2);
}

// Fonction pour recalculer la valeur totale d'une action donnée
function updateTotal(stock) {
    const qty = document.getElementById(`${stock}-qty`).value; // Quantité saisie par l'utilisateur
    const price = prices[stock]; // Prix de l'action
    const total = qty * price; // Calcul de la valeur totale
    document.getElementById(`${stock}-total`).textContent = total.toFixed(2); // Mise à jour de la cellule
}

// Initialisation des prix au chargement de la page
window.onload = initializePrices;
