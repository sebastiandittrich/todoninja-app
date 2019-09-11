import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';

let socket

if(process.env.NODE_ENV === 'production') {
  socket = io('https://api.lvps91-250-116-188.dedicated.hosteurope.de');
} else {
  socket = io('http://' + window.location.hostname + ':3030', { transports: ['websocket'] });
}

const feathersClient = feathers()

feathersClient.configure(socketio(socket))

feathersClient.configure(auth({ storage: window.localStorage, timeout: /* 5 minutes */ 300000 }));

export default feathersClient;
