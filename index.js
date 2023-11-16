const express = require("express");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
require("dotenv").config();
const port = process.env.PORT || 5000;

const { connectToServer } = require("./utils/dbConnect");

const registerRoutes = require("./routes/register.routes")
const blogPostRoutes = require("./routes/blogPost.routes")
const aboutRoutes = require("./routes/about.routes")


const app = express();

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());

app.use("/api/register", registerRoutes)
app.use("/api/blogPost", blogPostRoutes)
app.use("/api/profile", aboutRoutes)




app.options("*", cors(corsConfig));

connectToServer((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(port)
      console.log(`listening on port  ${port}`);
    });
  }
  else {
    console.log(err)
  }
})


app.all("*", (req, res) => {
  res.send("no route found")
})

  /

  app.get("/", (req, res) => {
    res.send("hello world");
  });
