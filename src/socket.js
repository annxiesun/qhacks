import React from 'react';
import socketio from "socket.io-client";

export const Socket = socketio.connect("https://vast-hollows-69004.herokuapp.com/");
export const SocketContext = React.createContext();