const mongoose = require("mongoose");
const userSchema =new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    active:Boolean,
    tel:String,
    date_created: {
        type: Date, default: Date.now()
    },
    role: {
        type: String, default: "user"
    }
    
})
exports.UserModel = mongoose.model("users", userSchema);
