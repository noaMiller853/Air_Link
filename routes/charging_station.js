const express = require("express");
const { chargingCtrl } = require("../controllers/chargingControl");
const { auth } = require("../middlewares/auth");
const router = express.Router();
router.get("/",chargingCtrl.getAllCharging_Base);
router.get("/:id",chargingCtrl.getChargingTonnageById);
router.put("/edit/:id",chargingCtrl.editCharging_stationDetails)
router.put("/editStatus/:idEdit",chargingCtrl.updateStatusChargingStation)
router.delete("/remove/:baseId/:chargingId",chargingCtrl.removeCharging_station);
router.post("/add",auth,chargingCtrl.addChargingStation);

module.exports = router;