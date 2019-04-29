module.exports = (function(){

const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI('65L9AV-UHW6RVVYGY');

const checks = {
  "1": { movie: RegExp("Movie"), tv: RegExp("Television")},
  "2":  { food: RegExp("Food"), retail: RegExp("Retail")},
  "3": { book: RegExp("Book"), comic: RegExp("Comic"), text: RegExp("Text"), periodical: RegExp("Periodical") },
  "4": { product: RegExp("Product")},
}


function categorizer(argument, callback)  {
  const result = {
    category: "5",
    type: "Uncategorized",
    img:  "https://cdn.dribbble.com/users/1365063/screenshots/3979985/na_vrhova__plocha_1.png",
    data:  "https://cdn.dribbble.com/users/1365063/screenshots/3979985/na_vrhova__plocha_1.png",
  }
  waApi.getFull({
    input: argument,
  })
  .then((queryresult) => {
    console.log("datatypes:",queryresult);
    if (queryresult.datatypes === '') {
      callback("No datatypes");
    } else  {
        for (category in checks) {
          for(type in checks[category]) {
            if( checks[category][type].test(queryresult.datatypes) ) {
              console.log("Image",queryresult.pods[2].subpods[0].img.src);
              console.log("DATA", queryresult.pods[1].subpods[0].img.src);
              result.category = category
              result.type = type
              result.img = queryresult.pods[2].subpods[0].img.src
              result.data = queryresult.pods[1].subpods[0].img.src
              return callback(null, result);
            };
          };
        };
      return callback(null, result);
      };
    })
  .catch((error) =>{callback(error)});
}



return {
    categorizer: categorizer,
  };
})();
