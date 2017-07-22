const express = require("express"); //importing express from dependency
const router = express.Router(); //create a router Object 
const storeController = require("../controllers/storeController"); 

router.get("/", storeController.myMiddleware, storeController.homePage); 

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

module.exports = router; 


