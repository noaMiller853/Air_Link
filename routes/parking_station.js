const express = require("express");
const { auth } = require("../middlewares/auth");
const { parkingCtrl } = require("../controllers/parkingControl");


const router = express.Router();
router.get("/",parkingCtrl.getAllParkings);
router.post("/add/:idBase",auth,auth,parkingCtrl.addParking);
router.delete("/remove/:baseId/:id",auth,parkingCtrl.deleteParking);
router.put("/edit/:id",auth,parkingCtrl.editParking);
router.get("/:id",parkingCtrl.getParkingById);
module.exports = router;