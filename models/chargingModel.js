const mongoose = require('mongoose');

const chargingStationSchema = new mongoose.Schema({
    station_id: { type:mongoose.ObjectId, default:null},
    station_number: Number,
    occupied: Boolean,
    date_created: {
        type: Date,
        default: Date.now()
    },
    user_id: String
});

exports.ChargingModel = mongoose.model("charging_stations", chargingStationSchema);