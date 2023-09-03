'use strict';

async function asynchronousFunction() {
  try {
    const response = await fetch('https://reqres.in/api/users/1', {
      method: 'GET',
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

/*
async function fetchJson(URL, options) {
  const response = await fetch(URL, options);
  const json = await response.json();
  return json;
}

(async function () {
  try {
    const url = 'https://reqres.in/api/users/1';
    const options = {
      method: 'GET',
    };
    const userData = await fetchJson(url, options);
    console.log(userData);
  } catch (error) {
    alert(error.message);
  }
})(); */
