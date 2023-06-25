const mongoose = require("mongoose");

const base_stationSchema = new mongoose.Schema({
    location: String,
    charging_stations: [mongoose.ObjectId],
    drones: [mongoose.ObjectId],
    parking_stations: [mongoose.ObjectId],
    user_id: String
});

exports.BaseModel = mongoose.model('base_stations', base_stationSchema);
