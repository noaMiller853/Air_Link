const mongoose = require("mongoose");
const { config } = require("../config/secret")

main().catch(err => console.log(config.userDb, config.passDb, err));

async function main() {
  await mongoose.connect(`mongodb+srv://${config.userDb}:${config.passDb}@cluster0.5fkj3p6.mongodb.net/airLink`);
  console.log("mongo connect")
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
