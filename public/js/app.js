console.log("client side JS trends");

const trendForm = document.getElementsByClassName("trend-form");
const trend_container = document.getElementById("trend-container");
const trend_body = document.getElementById("trend_body");
const selctor = document.getElementById("countries");
const colors = ["#4285F4", "#DB4437", "#F4B400", "#0F9D58"];

trend_body.onload = async () => {
  const countriesURL = "/countries";
  fetch(countriesURL).then((response) => {
    response.json().then((data) => {
      for (const country in data) {
        var x = document.createElement("option");
        x.value = data[country];
        x.text = country;
        selctor.appendChild(x);
      }
    });
  });
};

trendForm[0].addEventListener("submit", (e) => {
  e.preventDefault();
  const country = selctor.value;
  console.log(selctor.value);
  trend_container.innerHTML = "";

  const trendURL = "/trends?location=" + country;
  fetch(trendURL)
    .then((response) => {
      response.json().then((data) => {
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
