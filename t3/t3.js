'use strict';
async function asynchronousFunction() {
  try {
    const response = await fetch('https://reqres.in/api/unknown/23', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const jsonData = await response.json();
    console.log(jsonData);
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log('complete');
  }
}
asynchronousFunction();

//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     name: 'new name',
//     job: 'updated job',
//   }),
// });

//   method: 'DELETE',
// });

// method: 'POST',
// headers: {
//   'Content-Type': 'application/json',
// },
// body: JSON.stringify({
//   name: 'nihilus',
//   job: 'dark lord',
// }),

// // method: 'GET',
// headers: {
//   'Content-Type': 'application/json',
// },
// });
