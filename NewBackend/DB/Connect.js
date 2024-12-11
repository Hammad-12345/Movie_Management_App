const mongoose = require('mongoose')
const connectiondb = async () => {
    try {
      await mongoose.connect(process.env.MONGOURL);
      console.log("Connected With MongoDb");
    } catch (error) {
      console.log(error);
    }
  };
  module.exports = { connectiondb };