import './style.css'

const stocks = [
  {
    name: 'Tesla',
    ticker: 'TSLA',
    logo: 'https://logo.clearbit.com/tesla.com',
    shares: 10,
    marketOpen: '15:30',
    market: 'NASDAQ',
    currentPrice: 0
  },
  {
    name: 'Apple',
    ticker: 'AAPL',
    logo: 'https://logo.clearbit.com/apple.com',
    shares: 15,
    marketOpen: '15:30',
    market: 'NASDAQ',
    currentPrice: 0
  }
];

const formatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function formatNumber(number) {
  return formatter.format(number);
}

function calculatePortfolioTotal() {
  return stocks.reduce((total, stock) => total + (stock.shares * stock.currentPrice), 0);
}

function updateShareCount(ticker, newCount) {
  const stock = stocks.find(s => s.ticker === ticker);
  if (stock) {
    stock.shares = parseInt(newCount) || 0;
    updateStockPrices();
  }
}

function createPortfolioTable() {
  const tableHTML = `
    <div class="container">
      <div class="portfolio-header">
        <h1>Mon Portfolio d'Investissement</h1>
      </div>
      <div class="portfolio-table">
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Marché et Horaire</th>
              <th>Nombre d'Actions</th>
              <th>Prix Actuel</th>
              <th>Valeur Totale</th>
            </tr>
          </thead>
          <tbody id="stockTableBody">
            ${stocks.map(stock => `
              <tr>
                <td>
                  <div class="stock-info">
                    <img src="${stock.logo}" alt="${stock.name} logo" class="stock-logo">
                    <div>
                      <div class="stock-name">${stock.name}</div>
                      <div class="stock-ticker">${stock.ticker}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="market-info">
                    <span class="market-name">${stock.market}</span>
                    <span class="market-time">${stock.marketOpen}</span>
                  </div>
                </td>
                <td>
                  <input 
                    type="number" 
                    class="shares-input" 
                    value="${stock.shares}" 
                    min="0" 
                    data-ticker="${stock.ticker}"
                    onchange="window.updateShareCount('${stock.ticker}', this.value)"
                  >
                </td>
                <td class="stock-price" data-ticker="${stock.ticker}">Chargement...</td>
                <td class="stock-total" data-ticker="${stock.ticker}">Chargement...</td>
              </tr>
            `).join('')}
            <tr class="portfolio-total">
              <td colspan="4"><strong>Total du Portfolio</strong></td>
              <td id="portfolioTotal" class="portfolio-total-value">Chargement...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.querySelector('#app').innerHTML = tableHTML;
  window.updateShareCount = updateShareCount;
}

async function updateStockPrices() {
  try {
    stocks.forEach(stock => {
      const randomPrice = Math.random() * 900 + 100;
      stock.currentPrice = randomPrice;
      
      const priceElement = document.querySelector(`.stock-price[data-ticker="${stock.ticker}"]`);
      const totalElement = document.querySelector(`.stock-total[data-ticker="${stock.ticker}"]`);
      
      if (priceElement && totalElement) {
        priceElement.textContent = formatNumber(randomPrice);
        const total = stock.shares * stock.currentPrice;
        totalElement.textContent = formatNumber(total);
      }
    });

    // Mise à jour du total du portfolio
    const portfolioTotalElement = document.getElementById('portfolioTotal');
    if (portfolioTotalElement) {
      portfolioTotalElement.textContent = formatNumber(calculatePortfolioTotal());
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour des prix:', error);
  }
}

// Initialisation
createPortfolioTable();

// Mise à jour des prix toutes les 5 secondes
setInterval(updateStockPrices, 5000);
updateStockPrices();