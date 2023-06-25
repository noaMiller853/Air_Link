const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    drone_id: { type:mongoose.ObjectId, default:null},
    origin_point:String,
    destination_point:String,
    date_created: {
        type: Date,
        default: Date.now()
    },
    user_id: String

});

exports.OrderModel = mongoose.model("orders", orderSchema);