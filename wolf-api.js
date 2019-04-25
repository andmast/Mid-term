const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI('65L9AV-UHW6RVVYGY');
const input = process.argv.slice(2).join(" ");

const checks = {
  toWatch: { movie: RegExp("Movie"), tv: RegExp("Television")},
  toEat:  { food: RegExp("Food"), retail: RegExp("Retail")},
  toRead: { book: RegExp("Book"), comic: RegExp("Comic"), text: RegExp("Text"), periodical: RegExp("Periodical") },
  toBuy: { product: RegExp("Product")},
}

console.log("input",input);

function categorizer(argument, callback)  {
  waApi.getFull({
    input: input,
    scanner: "datatypes",
    format: 'plaintext',
  })
  .then((queryresult) => {
    if (queryresult.datatypes === '') {
      callback("No datatypes")
    } else {
        for (category in checks) {
          for(test in checks[category]){
            if( checks[category][test].test(queryresult.datatypes) ) {
              let result = {
                category: category,
                type: test
              }
              callback(null , result)
            }
          }
      }
    }
  }).catch((error) =>{
    callback(error)
  });

}

categorizer(input, (error, result) =>{
  if(!error){
    console.log(result.category, result.type);
  } else {
    console.log(error);
  }

});


