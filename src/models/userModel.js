const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    unique: true,
    required: true,
  },
  lastName: {
    type: String,
    unique: true,
    required: true,
  },
  email: { type: String, unique: true, required: true },
  address: { type: String, unique: true, required: true },
});

const User =
  mongoose.models.user ||
  mongoose.model("user", userSchema);

export default User;
