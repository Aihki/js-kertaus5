'use strict';

async function asynchronousFunction() {
  try {
    const response = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'nihilus',
        job: 'dark lord',
      }),
    });
    const jsonData = await response.json();
    console.log(jsonData);
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log('complete');
  }
}
asynchronousFunction();

/* async function fetchJson(URL, options) {
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
      name: 'Petteri',
      job: 'Reindeer',
    };
    const url = 'https://reqres.in/api/users';
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
})(); */
