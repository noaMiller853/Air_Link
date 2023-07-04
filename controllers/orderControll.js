const { OrderModel } = require("../models/orderModel");
const { validateOrder } = require("../validation/validOrder")

exports.orderCtrl = {
   addOrder: async (req, res) => {
        let validBody = validateOrder(req.body);
        if (!validBody) {
            res.status(400).json(validBody.error.details);
        }
        try {
            let order = new OrderModel(req.body);
          order.user_id = req.tokenData._id;
        await order.save();
            res.status(201).json(order);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ err: "there error try again later", err })
        }
    },
    removeOrder: async (req, res) => {
        try {
            let { idDel } = req.body;
            let orderDel;
            if (req.tokenData.role === "admin") {
                orderDel = await OrderModel.deleteOne({ _id: idDel });
            }
            else {
                orderDel = await OrderModel.deleteOne({ _id: idDel });
            }

            res.status(201).json(orderDel);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ err: "there error try again later", err })
        }
    },

    getAllOrders: async (req, res) => {
        let perPage = req.query.perPage || 5;
        let page = req.query.page || 1;
        let sort = req.query.sort || "_id";
        let reverse = req.query.reverse == "yes" ? 1 : -1;
        try {
            let orders = await OrderModel.find({})
                .limit(perPage)
                .skip((page - 1) * perPage)
                .sort({ [sort]: reverse })
            res.status(201).json(orders);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ err: "there error try again later", err })
        }
    },
    getOrderById:async(req,res)=>{
        try{
        let {id}=req.params;
        let order=await OrderModel.findOne({_id:id});
        res.status(201).json(order);
    }
        catch (err) {
            console.log(err);
            res.status(500).json({ err: "there error try again later", err })
        }
    }
}

