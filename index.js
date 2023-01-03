const express = require('express');
const app = express();
const server = require("http").createServer(app);
// const cors = require('cors')
const socket = require("socket.io")(server, {cors: {origin: "*"}});

const PORT = 9001;

app.get('', (req, res)=>{
    res.sendFile('index.html', {root: __dirname});
})

socket.on('connection', (skt)=>{
    console.log(`user ${skt.id} connected`);
    skt.on('disconnect', ()=>{
        console.log('user disconnected')
    })

    skt.on('sendHalfCode', ({code})=>{
        socket.except(skt.id).emit('halfCode', {code})
    })
})

server.listen(PORT, ()=>{
    console.log(`server is up and running in port ${PORT}`)
})