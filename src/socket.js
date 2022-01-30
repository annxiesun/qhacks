import React from 'react';
import socketio from "socket.io-client";

export const Socket = socketio.connect("http://localhost:3000/");
export const SocketContext = React.createContext();