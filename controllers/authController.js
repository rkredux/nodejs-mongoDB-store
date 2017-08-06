const passport = require("passport"); 

exports.login = passport.authenticate("local", {
	faliureRedirect: "/login", 
	faliureFlash: "Failed Login", 
	successRedirect: "/", 
	successFlash: "You are now logged in"
}); 


exports.logout = (req, res) =>{
	req.logout(); 
	req.flash("success", "You are now logged out!"); 
	res.redirect("/"); 	
}; 


// Oh this is a middleware so we need to use next in this
exports.isLoggedIn = (req, res, next) =>{
	//first check if the user is authenticated
	if (req.isAuthenticated()) {
		return next(); 
	}
	req.flash("error", "Oops, you must be logged in!");
	res.redirect("/login");  
}; 
