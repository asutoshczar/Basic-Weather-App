// console.log("client side javascript list is loaded.");

// fetch("http://puzzle.mead.io/puzzle")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });

const fetchData = function (location) {
  return fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading....";
  messageTwo.textContent = "";
  fetchData(location).then((data) => {
    if (data.error) {
      messageOne.textContent = "";
      messageTwo.textContent = data.error;
    } else {
      messageOne.textContent = data.location;
      messageTwo.textContent = `Current Temperature : ${data.forecast.temperature} but Feels like temperature is : ${data.forecast.feelslike} & Weather is ${data.forecast.weather_descriptions}`;
    }
  });
  search.value = "";
});
