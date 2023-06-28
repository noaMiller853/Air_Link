const express= require("express");
const {auth, authAdmin} = require("../middlewares/auth");
const {authCtrl  } = require("../controllers/authControl");
const { userCtrl } = require("../controllers/userControl");
const router = express.Router();


 router.get("/myInfo",auth,userCtrl.myInfo)
router.get("/",userCtrl.getUrl)
router.get("/usersList",authAdmin ,userCtrl.userList)
router.post("/login", authCtrl.login)
router.put("/:idEdit",auth,userCtrl.editUser);
router.delete("/:idDel" ,auth, userCtrl.deleteAccount);
router.post("/signUp",authCtrl.signUp)





module.exports = router;
