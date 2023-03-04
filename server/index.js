const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const http = require("http");
const socketio = require("socket.io");
const SocketServer = require("./SocketServer");

app.get("/", (req, res) => {
  res.json({ msg: "Hello" });
});

//
//SOCKET
//

// const http = require("http");
// const socketio = require("socket.io");
// const SocketServer = require("./socketServer");

// const server = http.createServer(app);

// const io = socketio(server, { cors: { origin: "*" } }); //for omit cors error

// io.on("connection", (socket) => {
//   SocketServer(socket);

//   socket.on("disconnect", () => {
//     // console.log("A user disconnected");
//   });
// });

//
//ROUTES
//

app.use("/api", require("./routes/authRouter"));
app.use("/api", require("./routes/userRouter"));
app.use("/api", require("./routes/postRouter"));
app.use("/api", require("./routes/commentRouter"));

// Create HTTP server and Socket.io instance
const server = http.createServer(app);
const io = socketio(server, {
  cors: { origin: "*" },
});

// Set up WebSocket communication
io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  // Call SocketServer function to handle incoming WebSocket events
  SocketServer(socket);

  socket.on("disconnect", () => {
    console.log("WebSocket disconnected");
  });
});
//To show images in frontend
app.use(express.static("public/upload"));

const URI = process.env.MONGODB_URL;
const port = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(port, () => console.log("server is running", port, URI));
  })
  .catch((err) => console.log(err));
