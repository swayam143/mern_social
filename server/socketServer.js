let rawData = [];
let user = [];

const SocketServer = (socket) => {
  //   socket.on("joinUser", (id) => {
  //     rawData.push({ id, socketId: socket.id });

  //     for (i = 0; i < rawData.length; i++) {
  //       if (user.find((item) => item.id === rawData[i].id)) {
  //         return;
  //       } else {
  //         user.push(rawData[i]);
  //       }
  //     }

  //     console.log(rawData);
  //   });

  //   socket.on("disconnect", () => {
  //     rawData = rawData.filter((user) => user.socketId !== socket.id);
  //     console.log(rawData);
  //   });
  socket.on("joinUser", (id) => {
    rawData.push({ id, socketId: socket.id });
    console.log(rawData);
    // Do something with the user ID, such as adding them to a room or sending them a message
  });

  socket.on("disconnect", () => {
    rawData = rawData.filter((user) => user.socketId !== socket.id);
    console.log(rawData);
  });
};

module.exports = SocketServer;
