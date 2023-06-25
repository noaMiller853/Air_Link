const { BaseModel } = require("../models/baseModel");
const { DroneModel } = require("../models/droneModel");
const { validateDrone } = require("../validation/validDrone");

exports.droneCtrl = {
    //token
    editDrone: async (req, res) => {
        let validBody = validateDrone(req.body);
        if (validBody.error) {
            return res.status(400).json({ msg: "Need to send body" });
        }
        try {
            let id = req.params.id;
            let data;
            if (req.body.role == "admin") {
                data = await DroneModel.updateOne({ _id: id }, req.body);
            }
            else {
                data = await DroneModel.updateOne({ _id: id, user_id: req.tokenData._id }, req.body);
            }
            res.status(201).json(data);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }
    },
    //token
    deleteDrone: async (req, res) => {
        try {
            let { baseId } = req.params;
            let { id } = req.params;
            let data;
            let base;
            if (req.tokenData.role == "admin") {
                base = await BaseModel.updateOne({ _id: baseId }, { $pull: { 'drones': { $in: [id] } } })
                data = await DroneModel.deleteOne({ _id: id })
            }
            else {
                base = await BaseModel.updateOne({ _id: baseId }, { $pull: { 'drones': { $in: [id] } } })
                data = await DroneModel.deleteOne({ _id: id, user_id: req.tokenData._id })
            }

            res.status(201).json({ data, base })
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }
    },
    //token
    addDrones: async (req, res) => {
        let validBody = validateDrone(req.body);
        if (!validBody) {
            res.status(500).json(validBody.error.details)
        }
        try {
            let { idBase } = req.params;
            let drone = new DroneModel(req.body);
            drone.user_id = req.tokenData._id;
            drone.station_id = idBase;
            await drone.save();
            let base = await BaseModel.updateOne({ _id: idBase }, { $push: { 'drones': drone._id } });
            res.status(200).json({ msg: "drone", drone, base });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ msg: "err", err })
        }
    },
    getAlldrones: async (req, res) => {
        try {
            let data = await DroneModel.find({}).populate({ path: "station_id", model: "base_stations" });
            res.status(200).json(data);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }

    },
    getDroneById: async (req, res) => {
        try { 
            let {id}=req.params;
            let drone=await DroneModel.findOne({_id:id});
            res.status(200).json(drone);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ msg: "err", err })
        }
    }

}