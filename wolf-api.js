module.exports = (function(){

const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI('65L9AV-UHW6RVVYGY');

const checks = {
  toWatch: { movie: RegExp("Movie"), tv: RegExp("Television")},
  toEat:  { food: RegExp("Food"), retail: RegExp("Retail")},
  toRead: { book: RegExp("Book"), comic: RegExp("Comic"), text: RegExp("Text"), periodical: RegExp("Periodical") },
  toBuy: { product: RegExp("Product")},
}


function categorizer(argument, callback)  {
  const result = {
    category: "Uncategorized",
    type: "Uncategorized"
  }
  waApi.getFull({
    input: argument,
    scanner: "datatypes",
    format: 'plaintext',
  })
  .then((queryresult) => {
    console.log("datatypes:",queryresult.datatypes);
    if (queryresult.datatypes === '') {
      callback("No datatypes");
    } else  {
        for (category in checks) {
          for(type in checks[category]) {
            if( checks[category][type].test(queryresult.datatypes) ) {
              result.category = category
              result.type = type
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
  }
})()