
const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 
mongoose.Promise = global.Promise; 
const slug = require("slugs"); 
const md5 = require("md5"); 
const validator = require("validator"); 
const mongodbErrorHandler = require("mongoose-mongodb-errors"); 
const passportLocalMongoose = require("passport-local-mongoose"); 



const userSchema = new Schema({

	email: {
		type: String, 
		unique: true, 
		lowercase: true,
		trim: true, 
		validate: [validator.isEmail, "Invalid Email Address"], 
		required: "Please supply an email address"
	}, 

	name: {
		type: String, 
		unique: false, 
		lowercase: false, 
		trim: true, 
		required: "Please supply a name"
	}, 

	resetPasswordToken: String, 
	resetPasswordExpires: Date, 
	hearts: [
	{type: mongoose.Schema.ObjectId, ref: "Store"}
	]

}); 

userSchema.plugin(passportLocalMongoose, {usernameField: "email"}); 
userSchema.plugin(mongodbErrorHandler); 
userSchema.virtual("gravatar").get(function(){
	const hash = md5(this.email); 
	return `https://gravatar.com/avatar/${hash}?s=200`; 
}); 

module.exports = mongoose.model("User", userSchema);