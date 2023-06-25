const express = require("express");
const { orderCtrl } = require("../controllers/orderControll");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/",orderCtrl.getAllOrders);
router.post("/add/:droneId",auth,orderCtrl.addOrder);
router.delete("/remove/:idDel",auth,orderCtrl.removeOrder)
router.get("/:id",orderCtrl.getOrderById)
module.exports = router;