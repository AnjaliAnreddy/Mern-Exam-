const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

let votes = { optionA: 0, optionB: 0 };

io.on("connection", (socket) => {
    console.log("User connected");

    socket.emit("voteUpdate", votes);

    socket.on("vote", (option) => {
        votes[option]++;
        io.emit("voteUpdate", votes);
    });

    socket.on("disconnect", () => console.log("User disconnected"));
});

server.listen(5000, () => console.log("Server running on port 5000"));