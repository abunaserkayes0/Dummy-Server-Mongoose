const mongoose = require("mongoose");

const UserPostSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    set: function (value) {
      return new Date(value);
    },
  },
});

const UserPostModel = mongoose.model("user_post", UserPostSchema);

module.exports = UserPostModel;
