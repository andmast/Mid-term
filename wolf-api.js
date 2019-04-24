const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI('65L9AV-UHW6RVVYGY');
const input = process.argv.slice(2).join(" ");

console.log("input",input);

waApi.getFull(input).then((queryresult) => {
  let array = []
  console.log(queryresult.datatypes)
  let test = queryresult.datatypes.match(/\b\w+/g)
  console.log(test)

}).catch(console.error);
