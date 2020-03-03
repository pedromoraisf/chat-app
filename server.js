const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = module.exports.io = require('socket.io')(server)

const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist`));

let saveMessages = [];

io.on('connection', socket => {
    console.log(`Socket conectado >> ${socket.id}`);

    socket.emit('receiveData', saveMessages);

    socket.on('sendMessage', data => {
        saveMessages.push(data);

        socket.emit('receiveData', saveMessages);
        socket.broadcast.emit('receiveData', saveMessages);
    });
});

server.listen(PORT, () => {
    console.log(`Listen on >>${PORT}<<`);
});