const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const hotelsRouter = require("./routes/hotels");
const roomsRouter = require("./routes/rooms");

const mongoose = require("mongoose");
dotenv.config();

const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});
// Middlewares

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/rooms", roomsRouter);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Smoething wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
  // next();
});

app.listen(8800, () => {
  connect();
  console.log("connect to server");
});
