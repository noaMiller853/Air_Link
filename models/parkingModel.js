const mongoose = require('mongoose');

const parkingStationSchema = new mongoose.Schema({
    station_id: { type:mongoose.ObjectId, default:null},
    parking_number: Number,
    available: Boolean,
    date_created: {
        type: Date,
        default: Date.now()
    },
    user_id: String
});

exports.ParkingModel = mongoose.model("parking_stations", parkingStationSchema);

