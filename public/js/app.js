console.log("client side JS");

const trendForm = document.getElementsByClassName("trend-form");
const trendLocationInput = document.querySelector("input");
const trend_container = document.getElementById("trend-container");
const colors = ["#4285F4", "#DB4437", "#F4B400", "#0F9D58"];

trendForm[0].addEventListener("submit", (e) => {
  e.preventDefault();
  const location = trendLocationInput.value;
  trend_container.innerHTML = "";

  const trendURL = "http://localhost:3000/trends?location=" + location;
  fetch(trendURL)
    .then((response) => {
      response.json().then((data) => {
        //console.log(data);
        if (data.error) {
          const trend = document.createElement("div");
          trend.innerHTML = data.error;
          trend_container.appendChild(trend);
        } else {
          data.forEach((e) => {
            const trend = document.createElement("div");
            trend.innerHTML = `${e.trend} has ${e.traffic} searches today.`;
            trend.className = "trend";
            trend.style.background =
            colors[Math.floor(Math.random() * colors.length)];
            trend_container.appendChild(trend);
          });
        }
      });
    })
    .catch();
});
