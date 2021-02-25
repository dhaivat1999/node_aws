const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
// const cors = require("cors");
const app = express();

require("dotenv/config");
// app.use(cors());
app.use(bodyparser.json());
app.use("/posts", postsRoute);
app.use("/recipes",receipeRoute);
const postsRoute = require("./routes/posts");
const receipeRoute = require("./routes/recipes");
const port = process.env.port ||8080 ;



app.listen(port, ()=>{
  console.log("Connected to server");
});


// app.use('/posts',function(){
//     console.log("middleware logic will run here each and everytime the api is called")
// })

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("connected to db");
});

app.get("/", (req, res) => {
  res.send("Home page");
});

//"start": "NODE_ENV=production node app.js"

//package.json prod remember before sending it to aws