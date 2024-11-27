//importe le CSS
const link = document.createElement('link');
link.rel='stylesheet';
link.href = './style.css';
document.head.appendChild(link);


// Crée la liste de mes actions
const stocks = [
  {
    name: 'Tesla',
    ticker: 'TSLA',
    logo: 'https://logo.clearbit.com/tesla.com',
    shares: 21,
    marketOpen: '15:30',
    market: 'NASDAQ',
    currentPrice: 0
  },
  {
    name: 'Coca-Cola',
    ticker: 'KO',
    logo: 'https://logo.clearbit.com/coca-cola.com',
    shares: 100,
    marketOpen: '15:30',
    market: 'NASDAQ',
    currentPrice: 0
  },
  {
    name: 'Phillips 66',
    ticker: 'PSX',
    logo: 'https://logo.clearbit.com/Phillips66.com',
    shares: 50,
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

// Crée le tableau avec mes actions 
function createPortfolioTable() {
  const tableHTML = `
    <div class="container">
      <div class="portfolio-header">
        <h1>Mon Yolofolio d'Investissement</h1>
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


//MAJ le prix de mes actions : Fait appel à la fonction fetchstock prices
async function updateStockPrices() {
  try {
    for (const stock of stocks) {
      const data = await getStockQuote(stock.ticker);
      console.log('je suis passé par là')
      if (data) {
        stock.currentPrice = data;
//        stock.currentPrice = data.regularMarketPrice;

        const priceElement = document.querySelector(`.stock-price[data-ticker="${stock.ticker}"]`);
        const totalElement = document.querySelector(`.stock-total[data-ticker="${stock.ticker}"]`);

        if (priceElement && totalElement) {
          priceElement.textContent = formatNumber(stock.currentPrice);
          const total = stock.shares * stock.currentPrice;
          totalElement.textContent = formatNumber(total);
        }
      }
    }

    // Mise à jour du total du portfolio
    const portfolioTotalElement = document.getElementById('portfolioTotal');
    if (portfolioTotalElement) {
      portfolioTotalElement.textContent = formatNumber(calculatePortfolioTotal());
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour des prix:', error);
  }
}



async function getStockQuote(ticker) {
  const url = `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/quotes?ticker=${ticker}`;

  const options = {
    method: 'GET',
    headers: {
      'X-Rapidapi-Key': '51c5eb891fmshbd596b70f1034c1p19c22ajsn2493ed1108e3',
      'X-Rapidapi-Host': 'yahoo-finance15.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data)
    //if (data && data.body[0]) {
    return data.body[0].regularMarketPrice;
    //} else {
    // console.error(`Aucune donnée trouvée pour ${ticker}`);
    //  return null;
    //}
    
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
}

// Exemple d'appel
//getStockQuote('TSLA'); // Remplacez 'TSLA' par un autre symbole boursier si besoin










// Initialisation
createPortfolioTable();

// Mise à jour des prix toutes les 5 secondes
setInterval(updateStockPrices, 5000);
updateStockPrices();
