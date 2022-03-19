const mongoose = require("mongoose");
const TaskShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "タスク名を入れてください。"], //名前を入れないとエラーになる
    trim: true, //空白を削除してくれる
    maxlength: [20, "タスク名は20文字以内で入力してください。"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskShema);
