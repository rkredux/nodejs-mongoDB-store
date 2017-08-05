const mongoose = require("mongoose"); 
const User = mongoose.model("User");
const promisify = require("es6-promisify"); 

exports.loginForm = (req, res) =>{
	res.render("login", {title: "Please Login"}); 
}; 


exports.registerForm = (req, res) =>{
	res.render("register", {title: "Please Register"}); 
}; 


exports.validateRegister = (req, res, next) => {
	// lets validate the input. 
	req.sanitizeBody("name"); 
	req.checkBody("name", "You must supply a name!").notEmpty(); 
	req.checkBody("email", "That Email is not valid!").isEmail(); 
	req.sanitizeBody("email").normalizeEmail({
		remove_dots: false, 
		remove_extension: false, 
		gmail_remove_subaddress: false
	}); 
	

	req.checkBody("password", "Password cannot be blank!").notEmpty(); 
	req.checkBody("password-confirm", "Confirm Password cannot be blank!").notEmpty(); 
	req.checkBody("password-confirm", "Ooops, your passwords do not match!").equals(req.body.password); 
	const errors = req.validationErrors(); 
	if(errors){
		req.flash("error", errors.map(err => err.msg)); 
		res.render("register", {title: "Register", body: req.body, flashes: req.flash()}); 
		return; 
	}
	next(); //call the next in line in the middleware if there is no error
}; 


exports.register = async (req, res, next) => {
	// res.send("Congratulations, your account is created"); 
	const user = new User({email: req.body.email, name:req.body.name}); 
	const register = promisify(User.register, User); 
	await register(user, req.body.password); 
	// res.send("it works"); 
	next(); 
}; 


