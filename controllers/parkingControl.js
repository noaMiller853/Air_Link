const { BaseModel } = require("../models/baseModel");
const { ParkingModel } = require("../models/parkingModel");
const { validateParkingStation } = require("../validation/ValidParking_station");


exports.parkingCtrl = {
    //token
    editParking: async (req, res) => {
        let validBody = validateParkingStation(req.body);
        if (validBody.error) {
            return res.status(400).json({ msg: "Need to send body" });
        }
        let id = req.params.id;
        let data;
        if (req.body.role == "admin") {
            data = await ParkingModel.updateOne({ _id: id }, req.body);
        }
        else {
            data = await ParkingModel.updateOne({ _id: id, user_id: req.tokenData._id }, req.body);
        }
        res.status(201).json(data);
    },
    //token
    deleteParking: async (req, res) => {
        try {
            let { baseId } = req.params;
            let { id } = req.params;
            let data;
            let base;
            if (req.tokenData.role == "admin") {
                base = await BaseModel.updateOne({ _id: baseId }, { $pull: { 'parking_stations': { $in: [id] } } })
                data = await ParkingModel.deleteOne({ _id: id })
            }
            else {
                base = await BaseModel.updateOne({ _id: baseId }, { $pull: { 'parking_stations': { $in: [id] } } })
                data = await ParkingModel.deleteOne({ _id: id, user_id: req.tokenData._id })
            }

            res.status(201).json({ data, base })
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }
    },
    //token
    addParking: async (req, res) => {
        let validBody = validateParkingStation(req.body);
        if (!validBody) {
            res.status(500).json(validBody.error.details)
        }
        try {
            let { idBase } = req.params;
            let parking = new ParkingModel(req.body);
            parking.station_id = idBase;
            parking.user_id = req.tokenData._id;
            await parking.save();
            let base = await BaseModel.updateOne({ _id: idBase }, { $push: { 'parking_stations': parking._id } });
            res.status(200).json({ msg: "parking", parking, base });
        }
        catch (err) {
            res.status(500).json({ msg: err })
        }
    },
    getAllParkings: async (req, res) => {
        try {
            let data = await ParkingModel.find({}).populate({ path: "station_id", model: "base_stations" });
            res.json(data);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }

    },
    getParkingById:async(req,res)=>{
        try{
        let {id}=req.params;
        let parking=await ParkingModel.findOne({_id:id});
        res.status(201).json(parking);
        }
        catch(err){
            console.log(err);
            res.json(500).json({msg:"err",err});
        }
    }

}