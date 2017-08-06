const passport = require("passport"); 
const mongoose = require("mongoose"); 
const User = mongoose.model("User");
const crypto = require("crypto"); 
const promisify = require("es6-promisify"); 



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


exports.forgot = async(req, res) => {
	const user = await User.findOne({email: req.body.email}); 
	if(!user){
		req.flash("error", "No such user exists"); 
		return res.redirect("/login");  
	}
	user.resetPasswordToken = crypto.randomBytes(20).toString("hex"); 
	user.resetPasswordExpires = Date.now() + 3600000; 
	await user.save(); 
	const resetURL = `https://${req.headers.host}.account/reset/abc123/${user.resetPasswordToken}`; 
	req.flash("success", "You have been emailed a password reset link. ${resetURL}");
	res.redirect("/login");  
}; 


exports.reset = async(req, res) =>{
	// res.json(req.param)
	const user = await User.findOne({
		resetPasswordToken: req.params.token, 
		resetPasswordExpires: {$gt: Date.now()}
	}); 
	if(!user){
		req.flash("error", "Password reset is invalid or has expired. Please try again"); 
		return res.redirect("/login"); 	
	}

	res.render("reset", {title: "Please reset your password"}); 
}; 



exports.confirmedPasswords = (req, res, next) =>{
	if (req.body.password === req.body['password-confirm']){
		return next(); //keep going mate
	} else{
		req.flash("error", "Oops!, The Passwords must match"); 
		res.redirect("back"); 
	}
}; 


exports.update = async (req, res) =>{

	const user = await User.findOne({
		resetPasswordToken: req.params.token, 
		resetPasswordExpires: {$gt: Date.now()}
	}); 

	if(!user){
		req.flash("error", "Password reset is invalid or has expired. Please try again"); 
		return res.redirect("/login"); 	
	}

	const setPassword = promisify(user.setPassword, user); 
	await setPassword(req.body.password); 
	user.resetPasswordToken = undefined; 
	user.resetPasswordExpires = undefined; 
	const updatedUser = await user.save(); 
	await req.login(updatedUser); 
	req.flash("Success", "Woohoo!, Your password has been reset, you are now logged in!"); 
	res.redirect("/"); 
}; 



