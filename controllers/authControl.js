const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const { validUser, loginUser } = require("../validation/validUser");
const { createToken } = require("../helpers.js/userHelper");

exports.authCtrl = {
  signUp: async (req, res) => {
    let validBody = validUser(req.body);
    if (validBody.error) {
      return res.status(400).json(validBody.error.details);
    }
    try {
      let user = new UserModel(req.body);

      user.password = await bcrypt.hash(user.password, 10);
      // We want to encrypt the password unidirectionally
      await user.save();
      user.password = "***";
      res.status(201).json(user);
    }
    catch (err) {
      if (err.code == 11000) {
        return res.status(500).json({ msg: "Email already in system, try log in", code: 11000 })

      }
      console.log(err);
      res.status(500).json({ msg: "err", err })
    }
  }
  ,
  login: async (req, res) => {
    let validBody = loginUser(req.body);
    let flagEmail=true;
    let flagPassword=true;
    if (validBody.error) {
      return res.status(400).json(validBody.error.details);
    }
    try {
      let user = await UserModel.findOne({ email: req.body.email })
      if (!user) {
        flagEmail=false;
        
      }
    
      let authPassword = await bcrypt.compare(req.body.password, user.password);
      if (!authPassword) {
        flagPassword=false;
       
      }
      if (!flagEmail || !flagPassword && !(!flagEmail && !flagPassword)) {
        let tel = await UserModel.findOne({ tel: req.body.tel })
        if (!tel) {
          return res.status(401).json({ msg: "You need to register on the site" })
        }
        
      }
      res.status(201).json(user);

    }
    catch (err) {
      console.log(err)
      res.status(500).json({ msg: "err", err })
    }
  }
}
