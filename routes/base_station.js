const express = require("express");
const { baseCtrl } = require("../controllers/baseControl");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/",baseCtrl.getAllBase);
router.post("/",auth,baseCtrl.addBaseStation);
router.delete("/:idDel",auth,baseCtrl.deleteBase);
router.get("/:id",baseCtrl.getBaseStationById);


module.exports = router;


