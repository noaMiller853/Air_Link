const indexR = require("./index");
const base_stationR = require("./base_station");
const drone = require("./drone");
const charging_station = require("./charging_station")
const parking_station = require("./parking_station");
const user = require("./user");
const order=require("./order");
const products=require("./product");

exports.routesInit = (app) => {
    app.use("/", indexR);
    app.use("/users", user);
    app.use("/base_station", base_stationR);
    app.use("/drone", drone);
    app.use("/order",order);
    app.use("/parking_station",parking_station);
    app.use("/charging_station", charging_station);
    app.use("/products",products);
}
