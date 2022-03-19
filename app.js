const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
app.use(express.json()); //JSON形式でExpressを記述するという宣言

const PORT = 5001;

//ルーティング設計
app.use("/api/v1/tasks", taskRoute);

//データベースと接続
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, console.log("サーバーが起動しました"));
  } catch (err) {
    console.log(err);
  }
};

start();
