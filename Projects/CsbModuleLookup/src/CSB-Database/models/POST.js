const mongoose = require("mongoose");

const POSTSchema = mongoose.Schema({
  Courses: [
    {
      id: Number,
      school: String,
      code: String,
      name: String,
      students: [String],
      id: Number
    }
  ]
});

module.exports = mongoose.model("POSTS", POSTSchema);
