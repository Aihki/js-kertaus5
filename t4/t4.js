'use strict';

async function fetchJson(URL, options) {
  const response = await fetch(URL, options);
  if (!response.ok) {
    console.log(response);
    throw new Error(`Error in reguest: ${response.status}`);
  }
  const json = await response.json();
  return json;
}

(async function () {
  try {
    const user = {
      name: 'John Doe',
      job: 'Developer',
    };
    const url = 'https://reqres.in/api//api/unknown/23';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };
    const userData = await fetchJson(url, options);
    console.log(userData);
  } catch (error) {
    alert(error.message);
  }
})();
