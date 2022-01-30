import React from 'react';
import socketio from "socket.io-client";

export const Socket = socketio.connect("http://www.asdaafsa.space/");
export const SocketContext = React.createContext();