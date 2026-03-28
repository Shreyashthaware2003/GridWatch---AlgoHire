import { Server } from "socket.io";

let io: Server;

export const initSocket = (server: any) => {
    io = new Server(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);
    });
};

export const getIO = () => {
    if (!io) throw new Error("Socket not initialized");
    return io;
};