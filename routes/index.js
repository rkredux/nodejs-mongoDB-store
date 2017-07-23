const express = require("express"); //importing express from dependency
const router = express.Router(); //create a router Object 
const storeController = require("../controllers/storeController"); 


// route for homepage
router.get("/", storeController.homePage); 


// route for add store page
router.get("/add", storeController.addStore)

// I am doing crazying things with my routes. 
// I love node man!
// req.send
// req.json these are the two most basic ones
// req is object full information coming from the user
// res is the object full of methods to put together
// data to send back to the user. 

// router.get("/hello", (req,res)=>{
// 	res.render("hello"); 
// }); 


// lets create another route
// router.get("/reverse/:name", (req, res)=>{
// 	const reverseName = req.params.name.split("").reverse().join("").trim(); 
// 	res.send(reverseName); 
// })
router.post("/add", storeController.createStore); 

module.exports = router; 


