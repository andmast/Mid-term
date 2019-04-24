const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI('65L9AV-UHW6RVVYGY');
const input = process.argv.slice(2).join(" ");

console.log("input",input);

waApi.getFull(input).then((queryresult) => {
  console.log(queryresult)
}).catch(console.error);
