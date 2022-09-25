import { io } from "socket.io-client";

export default class SocketClient {
    socket = null;

    constructor() {
        this.socket = io('ws://localhost:1337');
    }

    sendHello() {
        this.socket.emit('hello', '');
        console.log('Sent a hello.');
    }

    createRoom(id) {
        this.socket.emit('create', id);
        console.log('A room is being created');
    }

    liveUpdate(doc) {
        this.socket.emit("liveUpdate", doc);
    }
}