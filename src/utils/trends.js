const googleTrends = require("google-trends-api");
const countries = require("./data/countries.json");

const getCountries = async (callback) => {
  if (countries) {
    callback(undefined, countries);
  } else {
    callback("oops", undefined);
  }
};

const trends = async (location, callback) => {
  googleTrends
    .dailyTrends({ geo: location.toUpperCase() })
    .then(function (results) {
      var searchesArr =
        JSON.parse(results).default.trendingSearchesDays[0].trendingSearches;
      var resultArr = [];

      searchesArr.forEach((element) => {
        resultArr.push({
          trend: element.title.query,
          traffic: element.formattedTraffic,
        });
      });
      callback(undefined, resultArr);
    })
    .catch(function (err) {
      callback("Oh no there was an error", undefined);
    });
};

module.exports = { method: trends, otherMethod: getCountries };
