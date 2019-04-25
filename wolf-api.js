const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI('65L9AV-UHW6RVVYGY');
const input = process.argv.slice(2).join(" ");

const checksForToWatch = ["Television","Movie"]
const checksForToEat = ["Food","Retail"]
const checksForToRead = ["Book","Comic","Text"]
const checksForToBuy = ["Product"]

console.log("input",input);

waApi.getFull(input).then((queryresult) => {
  const dataTypes = queryresult.datatypes.match(/\b\w+/g)
  if (queryresult.datatypes === '') {
    console.log(queryresult)
    console.log("UNCATEGORIZED")
  } else {
    dataTypes.forEach((element) =>{
      console.log("element",element)
      let test = element.match(/(Television)/gm)
      if(test){
      console.log("To watch")
      }
      test = element.match(/(Movie)/gm)
      if(test){
      console.log("To watch")
      }
      test = element.match(/(Book)/gm)
      if(test){
      console.log("to read")
      }
      test = element.match(/(Comic)/gm)
      if(test){
      console.log("to read")
      }
       test = element.match(/(Text)/gm)
      if(test){
      console.log("To read")
      }
       test = element.match(/(Product)/gm)
      if(test){
      console.log("To buy")
      }
       test = element.match(/(Food)/gm)
      if(test){
      console.log("To eat")
      }
       test = element.match(/(Retail)/gm)
      if(test){
      console.log("To eat")
      }

    })
  }
}).catch(console.error);
