const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
    station_id: { type:mongoose.ObjectId, default:null},
    name: String,
    model: String,
    speed: Number,
    image:String,
    date_created: {
        type: Date,
        default: Date.now()
    },
    user_id: String

});

exports.DroneModel = mongoose.model("drones", droneSchema);

