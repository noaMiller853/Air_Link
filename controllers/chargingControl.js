const { ChargingModel } = require("../models/chargingModel");
const { validateChargingStation } = require("../validation/validChanging_station");
const { myFunction } = require("../helpers.js/funcHelp");
const { BaseModel } = require("../models/baseModel");

exports.chargingCtrl = {
    //get all charging station
    getAllCharging_Base: async (req, res) => {

        try {
            let baseStations = await ChargingModel.find({});
            res.json(baseStations);
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ msg: "err", err })
        }
    },
    getChargingTonnageById: async (req, res) => {
        try {
            let { id } = req.params;
            let charging_station = await ChargingModel.findOne({ _id: id });
            res.status(201).json(charging_station)
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ err })
        }
    },
    updateStatusChargingStation: async (req, res) => {
        let validBody = validateChargingStation(req.body);
        if (validBody.error) {
            return res.status(400).json({ msg: "Need to send body" });
        }
        let { idEdit } = req.params;
        try {

            myFunction().then(async(result) => {
                req.body.occupied = result;
               let chargingEdit = await ChargingModel.updateOne({ _id: idEdit }, req.body);
               console.log(chargingEdit["occupied"]);
            res.status(201).json(chargingEdit); 
            });
            
           
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ msg: "err", err })
        }
    },

    //טעינה טפוסה צריך לעשות לפי טיימר get
    // update לעדכן לטפוס 
    //
    addChargingStation: async (req, res) => {
        let validbody = validateChargingStation(req.body);
        if (!validbody) {
            return res.status(401).status(validbody.error.details)
        }
        try {
            let chargingStation = new ChargingModel(req.body);
            chargingStation.user_id = req.tokenData._id;
            await chargingStation.save();
            res.status(201).json(chargingStation)
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }

    },
    editCharging_stationDetails: async (req, res) => {
        let validBody = validateChargingStation(req.body);
        if (validBody.error) {
            return res.status(400).json({ msg: "Need to send body" });
        }
        let id = req.params.id;
        try {
            console.log(req.body)
            let chargingEdit = await ChargingStationModel.updateOne({ _id: id }, req.body)
            res.json(chargingEdit)
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }
    },
    removeCharging_station: async (req, res) => {

        let { chargingId, baseId } = req.params
        try {
            let base = await BaseModel.updateOne({ _id: baseId }, { $pull: { 'charging_stations': { $in: [chargingId] } } })
            let chargingDel = await ChargingModel.deleteOne({ _id: chargingId })
            res.status(201).json({ chargingDel, base })
        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: "there error try again later", err })
        }
    },

}