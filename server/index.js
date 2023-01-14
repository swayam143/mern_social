const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ msg: "Hello" });
});

const URI = process.env.MONGODB_URL;
const port = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log("server is running", port, URI));
  })
  .catch((err) => console.log(err));
