const express = require("express");
const { droneCtrl } = require("../controllers/droneControl");
const { auth } = require("../middlewares/auth");


const router = express.Router();
router.get("/",droneCtrl.getAlldrones);
router.post("/add/:idBase",auth,auth,droneCtrl.addDrones);
router.delete("/remove/:baseId/:id",auth,droneCtrl.deleteDrone);
router.put("/edit/:id",auth,droneCtrl.editDrone);
router.get("/:id",droneCtrl.getDroneById)
module.exports = router;