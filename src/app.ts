import express, { Request, Response } from "express";
import http from 'http';
import { PORT } from "./config";
import userRoutes from "./routes/index";
import messageRoutes from "./routes/messaging";
import cors from "cors";
import { Server } from 'socket.io';
import { addMessageModel } from './models/messaging';
import upload from "./routes/upload";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(cors());



// Routes
app.use("/", userRoutes);
app.use("/", messageRoutes);
app.use("/", upload)

// Socket.io connection
io.on('connection', (socket) => {
    socket.on('disconnect', () => {
    });
    socket.on('chat message', async (msg) => {
        try {
            const message = await addMessageModel(msg);
            io.emit('chat message', message);
        } catch (error) {
            console.error('Error handling chat message:', error);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
