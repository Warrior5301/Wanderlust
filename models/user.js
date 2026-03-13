const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;

// User schema for authentication
const userSchema = new Schema({
    email:{
        type: String,
        required:true
    },
});

// passport-local-mongoose plugin automatically adds username, hashed password, salt, etc.
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
