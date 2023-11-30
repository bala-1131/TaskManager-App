const mongoose = require("mongoose");

/**
 * Connect the server to the MongoDB
 * @param {*} server 
 */

module.exports = async (server) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo connection successfull..".yellow.underline.bold);

    await server.listen(process.env.PORT || 5000, () =>
      console.log(
        `Server running on ${process.env.NODE_ENV} mode, port ${process.env.PORT}...`
          .cyan.bold
      )
    );
  } catch (error) {
    console.log("mongo connection failed...".red);
    console.log(error);
    process.exit(1);
  }
};
