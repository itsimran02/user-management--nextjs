const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  const URL = "";

  mongoose
    .connect(URL)
    .then(() => {
      console.log("database is connected");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export default connectDB;
