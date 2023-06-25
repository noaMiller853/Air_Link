const { BaseModel } = require("../models/baseModel");
const { validateBaseStation } = require("../validation/validBase_station");

exports.baseCtrl = {
    getAllBase: async (req, res) => {
        let perPage = req.query.perPage || 5;
        let page = req.query.page || 1;
        let sort = req.query.sort || "_id";
        let reverse = req.query.reverse == "yes" ? 1 : -1;
        try {
            let baseStations = await BaseModel.find({})
                .populate({ path: "charging_stations", model: "charging_stations" })
                .populate({ path: "drones", model: "drones" })
                .populate({ path: "parking_stations", model: "parking_stations" })
                .limit(perPage)
                .skip((page - 1) * perPage)
                .sort({ [sort]: reverse })

            res.status(201).json(baseStations);
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ msg: "err", err })
        }
    },
    //Token
    addBaseStation: async (req, res) => {
        let validBody = validateBaseStation(req.body);
        if (!validBody) {
            return res.status(401).status(validBody.error.details)
        }
        try {
            let base_station = new BaseModel(req.body);
            base_station.user_id = req.tokenData._id;
            await base_station.save();
            res.status(201).json(base_station);
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ msg: "err", err })
        }
    },
    //Token
    deleteBase: async (req, res) => {
        try {
            let { idDel } = req.params;
            let data;
            if (req.tokenData.role === "admin") {
                data = await BaseModel.deleteOne({ _id: idDel });
            }
            else {
                data = await BaseModel.deleteOne({ _id: idDel });
            }

            res.status(201).json(data);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ err })
        }
    },
    getBaseStationById: async (req, res) => {
        try {
            let { id } = req.params;
            let baseStation = await BaseModel.find({ _id: id })
                .populate({ path: "charging_stations", model: "charging_stations" })
                .populate({ path: "drones", model: "drones" })
                .populate({ path: "parking_stations", model: "parking_stations" });
         
            res.status(201).json(baseStation);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ err })
        }
    }
}


