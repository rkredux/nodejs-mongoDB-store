const express = require("express"); //importing express from dependency
const router = express.Router(); //create a router Object 
const storeController = require("../controllers/storeController"); 
const { catchErrors } = require("../handlers/errorHandlers"); 


// route for homepage
router.get("/", catchErrors(storeController.getStores)); 


// route for stores page
router.get("/stores", catchErrors(storeController.getStores)); 


// route for add store page
router.get("/add", storeController.addStore); 


// route for edit sotre page
router.get(`/stores/:id/edit`, catchErrors(storeController.editStore)); 



router.post("/add", 
	storeController.upload, 
	catchErrors(storeController.resize), 
	catchErrors(storeController.createStore)
);


router.post(`/add/:id`,
    storeController.upload, 
	catchErrors(storeController.resize),  
	catchErrors(storeController.updateStore)
);


router.get(`/store/:match`, catchErrors(storeController.viewStore)); 



module.exports = router; 


// Just some comments below. 
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