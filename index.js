import Socket from './Socket';
import Event from './Event';
import SocketChannel from './SocketChannel';

if (window) window.ReactSocketIO = { Socket, Event, SocketChannel };

export { Socket, Event, SocketChannel };