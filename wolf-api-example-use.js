const wolfApi = require ('./wolf-api');

wolfApi.categorizer("macys", (error, result) =>{
  if(!error){
    console.log("Success",result.category, result.type);
  } else {
    if (error === "No datatypes") {
      console.log("Search returned nothing",error, "Category =","Uncategorized");
    } else {
      console.log("ERROR",error);;
    }
  }
});