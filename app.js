const express = require("express");
const cors = require("cors")
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Importing Database Connection
const connectDB = require("./config/dbconnection");
connectDB();

app.use(express.static(__dirname + "/todoUser"));

const userRouter = require("./routers/userRouter");
app.use(userRouter);

const taskRouter = require("./routers/taskRouter");
app.use(taskRouter);

app.listen(90);

module.exports = app;