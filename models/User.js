
const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 
mongoose.Promise = global.Promise; 
const slug = require("slugs"); 
const md5 = require("md5"); 
const validator = require("validator"); 
const mongodbErrorHandler = require("mongoose-mongodb-errors"); 
const passportLocalMongoose = require("password-local-mongoose"); 



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
	}

	userSchema.plugin(passportLocalMongoose, {usernameField: "email"}); 
	userSchema.plugin(mongodbErrorHandler); 
}); 


// before the data is stored on the DB please 
// do this
// userSchema.pre("save", async function(next){
// 	if(!this.isModified("name")){
// 		next(); 
// 		return; 
// 	}
// 	this.slug = slug(this.name); 
// 	const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, "i"); 
// 	console.log(this.constructor); 
// 	const storesWithSlug = await this.constructor.find({slug: slugRegEx }); 
// 	if(storesWithSlug.length){
// 		this.slug = `${this.slug} - ${storesWithSlug.length + 1}`; 
// 	}
// 	next(); 
// }); 


module.exports = mongoose.model("User", userSchema);