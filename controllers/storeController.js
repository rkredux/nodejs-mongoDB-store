// initialize an object 
// let storeController = {}; 

const mongoose = require("mongoose"); 
const Store = mongoose.model("Store"); 

// set functions as props in that object 
exports.homePage = (req, res) => {
	res.render("index"); 
}

exports.addStore = (req, res) =>{
	res.render("editStore", {title: "Add Store"}); 
}
// there can be as many as you want
// just use the keyword exports before 
// every function and you are good to go. 

exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save();
  req.flash("success", `Successfully Created ${store.name}. Care 
  	to leave a review?`); 
  res.redirect(`/store/${store.slug}`); 
}

exports.getStores = async(req, res) => {
	// query our database for a list of all the 
	// stores. 
	const stores = await Store.find(); 
	// console.log(stores); 
	res.render("stores", {title: "STORES", stores});  
	//stores.pug template now gets the locals obejct 
	//which has the title and stores keys with values
	//"STORES" AND Stores (const defined above)
}

// let me rephrase it this way. Exports is a 
// global variable that lives in every module.
// you can export any function off of a module
// by assigning iqt as a property of the global
// exports variable and then creating a import
// variable. The exported function will then be 
// available as a property on the object created
