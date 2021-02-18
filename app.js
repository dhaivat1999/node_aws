const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const app = express();
require("dotenv/config");

const postsRoute = require("./routes/posts");
const port = process.env.port || 3000;
app.use(bodyparser.json());
app.use("/posts", postsRoute);

app.listen(port);

// app.use('/posts',function(){
//     console.log("middleware logic will run here each and everytime the api is called")
// })

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("connected to db");
});

app.get("/", (req, res) => {
  res.send("Home page");
});
