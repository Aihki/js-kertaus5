'use strict';

const tbody = document.createElement('tbody');
const dialog = document.createElement('dialog');

document.body.appendChild(dialog);
document.body.appendChild(tbody);

async function fetchJson(url, param = {}) {
  try {
    const fetchResponse = await fetch(url, param);
    if (!fetchResponse.ok) {
      throw new Error(`HTTP error! Status: ${fetchResponse.status}`);
    }
    const jsonData = await fetchResponse.json();
    return jsonData;
  } catch (error) {
    console.error('An error occurred while fetching JSON:', error);
    throw error;
  }
}

async function getRestaurants() {
  const RestaurantsResponseJson = await fetchJson(
    'https://sodexo-webscrape-r73sdlmfxa-lz.a.run.app/api/v1/restaurants'
  );

  RestaurantsResponseJson.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  RestaurantsResponseJson.forEach(restaurant => {
    const row = tbody.insertRow();
    const nameCell = row.insertCell(0);
    const addressCell = row.insertCell(1);

    nameCell.textContent = restaurant.name;
    addressCell.textContent = restaurant.address;

    row.addEventListener('click', clikedRowInfo);
  });
  function clearDialogContent() {
    dialog.innerHTML = '';
  }

  async function clikedRowInfo(event) {
    const rows = tbody.querySelectorAll('tr');

    rows.forEach(row => {
      row.classList.remove('highlight');
    });

    const clickedRow = event.currentTarget;
    clickedRow.classList.add('highlight');

    let rowIndex = -1;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i] === clickedRow) {
        rowIndex = i;
      }
    }

    clearDialogContent();

    const restaurantName = document.createElement('h2');
    restaurantName.textContent = `${RestaurantsResponseJson[rowIndex].name}`;

    const restaurantAddress = document.createElement('p');
    restaurantAddress.textContent = `${RestaurantsResponseJson[rowIndex].address}`;

    const postalCode = document.createElement('p');
    postalCode.textContent = `${RestaurantsResponseJson[rowIndex].postalCode}`;

    const city = document.createElement('p');
    city.textContent = ` ${RestaurantsResponseJson[rowIndex].city}`;

    const phoneNumber = document.createElement('p');
    phoneNumber.textContent = `${RestaurantsResponseJson[rowIndex].phone}`;

    const company = document.createElement('p');
    company.textContent = `${RestaurantsResponseJson[rowIndex].company}`;

    const menu = document.createElement('h3');
    menu.textContent = 'Daily Menu';

    dialog.appendChild(restaurantName);
    dialog.appendChild(restaurantAddress);
    dialog.appendChild(postalCode);
    dialog.appendChild(city);
    dialog.appendChild(phoneNumber);
    dialog.appendChild(company);
    dialog.appendChild(menu);
    const dailyMenu = await fetchJson(
      `https://sodexo-webscrape-r73sdlmfxa-lz.a.run.app/api/v1/restaurants/daily/${RestaurantsResponseJson[rowIndex]._id}/fi`
    );

    if (dailyMenu.courses.length === 0) {
      const message = document.createElement('p');
      message.textContent = 'No menu items available';
      dialog.appendChild(message);
    } else {
      for (const foods of dailyMenu.courses) {
        const food = document.createElement('p');
        const price = document.createElement('p');

        food.textContent = foods.name
          ? foods.name
          : 'Ruuan nimeä ei ollu saatavilla';

        price.textContent = foods.price
          ? foods.price
          : 'Hintaa ei ollut saatavilla';

        dialog.appendChild(food);
        dialog.appendChild(price);
      }
    }
    dialog.showModal();
  }
}

function success(pos) {
  getRestaurants();
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
