const cardsContainers = document.querySelector('.main');
const btnNav = document.querySelectorAll('button');

function activeBtn(idBtn) {
    btnNav.forEach(btn => {
        btn.classList.remove('active');
        if (btn.id === idBtn) {
            btn.classList.add('active');
        }
    });
}

async function getData(idNav) {
    try {
        // 1. On attend la réponse de la requête HTTP
        const response = './data.json';
        const res = await fetch(response);

        // 2. On vérifie si la requête a réussi
        if (!res.ok) {
            return false
        }

        // 3. On attend la conversion de la réponse en JSON
        const data = await res.json();
        // fonction qui va traiter le donnée
        cardsContainers.innerHTML = "";
        activeBtn(idNav);
        switch (idNav) {
            case 'daily':
                generateCardDaily(data);
                break;
            case 'weekly':
                generateCardWeekly(data);
                break;
            case 'monthly':
                generateCardMonthly(data);
                break;
            default:
                break;
        }
    } catch (error) {
        // 4. Gestion des erreurs (réseau, JSON invalide, etc.)
        return false;
    }
}

function generateCardDaily(data) {
    data.forEach(element => {
        const title = element.title;
        const current = element.timeframes.daily.current;
        const previous = element.timeframes.daily.previous;

        cardsContainers.innerHTML += `
    <div class="card-main" id="${title.toLowerCase().replace(/ /g, "-")}">
        <img src="./assets/images/icon-${title.toLowerCase().replace(/ /g, "-")}.svg">
        <div class="card">
            <div class="card-title">
                <h2>${title}</h2>
                <img src="./assets/images/icon-ellipsis.svg">
            </div>
            <div class="card-data">
                <span class="data-now">${current}hrs</span>
                <span class="data-previous">Yesterday - ${previous}hrs</span>
            </div>
        </div>
    </div>
    `;
    });
}

function generateCardWeekly(data) {
    data.forEach(element => {
        const title = element.title;
        const current = element.timeframes.weekly.current;
        const previous = element.timeframes.weekly.previous;
        cardsContainers.innerHTML += `
    <div class="card-main" id="${title.toLowerCase().replace(/ /g, "-")}">
        <img src="./assets/images/icon-${title.toLowerCase().replace(/ /g, "-")}.svg">
        <div class="card">
            <div class="card-title">
                <h2>${title}</h2>
                <img src="./assets/images/icon-ellipsis.svg">
            </div>
            <div class="card-data">
                <span class="data-now">${current}hrs</span>
                <span class="data-previous">Last Week - ${previous}hrs</span>
            </div>
        </div>
    </div>
    `;
    });
}

function generateCardMonthly(data) {
    data.forEach(element => {
        const title = element.title;
        const current = element.timeframes.monthly.current;
        const previous = element.timeframes.monthly.previous;

        cardsContainers.innerHTML += `
    <div class="card-main" id="${title.toLowerCase().replace(/ /g, "-")}">
        <img src="./assets/images/icon-${title.toLowerCase().replace(/ /g, "-")}.svg">
        <div class="card">
            <div class="card-title">
                <h2>${title}</h2>
                <img src="./assets/images/icon-ellipsis.svg">
            </div>
            <div class="card-data">
                <span class="data-now">${current}hrs</span>
                <span class="data-previous">Last Month - ${previous}hrs</span>
            </div>
        </div>
    </div>
    `;
    });
}

getData('weekly');