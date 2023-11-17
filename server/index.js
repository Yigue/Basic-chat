import express from 'express'
import morgan from 'morgan'
//Nos muestra las peticiones que se hacen a la web
import {Server as SocketServer} from 'socket.io'
import http from 'http'
import cors from 'cors'

import {PORT} from './config.js'

const app=express()
const server=http.createServer(app)
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors())
app.use(morgan("dev"))
 
io.on('connection',(socket)=>{
    console.log(socket.id);
    socket.on('message',(message)=> {
      console.log(message);
      socket.broadcast.emit("message",{
        from:socket.id,
        body:message
        }
        );
    })
})

server.listen(PORT)
console.log("server starte ", PORT);
