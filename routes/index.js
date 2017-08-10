const express = require("express"); //importing express from dependency
const router = express.Router(); //create a router Object 
const storeController = require("../controllers/storeController"); 
const { catchErrors } = require("../handlers/errorHandlers"); 
const userController = require("../controllers/userController"); 
const authController = require("../controllers/authController"); 



// route for homepage
router.get("/", catchErrors(storeController.getStores)); 


// route for stores page
router.get("/stores", catchErrors(storeController.getStores)); 


// route for add store page
router.get("/add", authController.isLoggedIn, storeController.addStore); 


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

router.get("/register", userController.registerForm); 
router.get("/login", userController.loginForm); 
router.post("/login", authController.login); 

// 1. validate the registration data
// 2. register the user
// 3. we need to log them in

router.post("/register", 
	userController.validateRegister,
	userController.register, 
	authController.login
	); 
// router.post("/login", userController.loginForm); 


router.get("/logout", authController.logout); 
router.get("/account", authController.isLoggedIn, userController.account); 
router.post("/account", catchErrors(userController.updateAccount));
router.post("/account/forgot", catchErrors(authController.forgot));
router.get("/account/reset/:token", catchErrors(authController.reset)); 
router.post("/account/reset/:token", authController.confirmedPasswords, catchErrors(authController.update)); 

// API endpoints are going to be here
router.get("/api/search", catchErrors(storeController.searchStores)); 


module.exports = router; 


// Just some comments bselow. 
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