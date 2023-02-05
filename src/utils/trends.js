const googleTrends = require("google-trends-api");

const trends = (location, callback) => {
  console.log(location.toUpperCase());
  googleTrends
    .dailyTrends({ geo: location.toUpperCase() })
    .then(function (results) {
      //console.log('These results are awesome', JSON.parse(results).default.trendingSearchesDays[0].trendingSearches );

      var searchesArr =
        JSON.parse(results).default.trendingSearchesDays[0].trendingSearches;
      var resultArr = [];
      searchesArr.forEach((element) => {
        //console.log(element);
        resultArr.push({
          trend: element.title.query,
          traffic: element.formattedTraffic,
        });
      });
      callback(undefined, resultArr);
    })
    .catch(function (err) {
      //console.error("Oh no there was an error", err);
      callback("Oh no there was an error", undefined);
    });
};

module.exports = trends;
