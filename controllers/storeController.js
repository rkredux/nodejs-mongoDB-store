// initialize an object 
// let storeController = {}; 


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

exports.createStore = (req, res) => {
	res.json(req.body); 
}


// let me rephrase it this way. Exports is a 
// global variable that lives in every module.
// you can export any function off of a module
// by assigning it as a property of the global
// exports variable and then creating a import
// variable. The exported function will then be 
// available as a property on the object created
