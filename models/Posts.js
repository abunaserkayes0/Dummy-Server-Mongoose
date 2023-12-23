const mongoose = require("mongoose");

const UserPostSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: {
    type: Date,
    get: function (date) {
      return date.toLocalDateString();
    },
  },
});

const UserPostModel = mongoose.model("user_post", UserPostSchema);

module.exports = UserPostModel;
