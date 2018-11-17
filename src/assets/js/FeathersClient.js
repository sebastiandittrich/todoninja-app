import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';
// import rest from '@feathersjs/rest-client'

const socket = io('http://' + window.location.hostname + ':3030', { transports: ['websocket'] });

const feathersClient = feathers()
  .configure(socketio(socket))
  // .configure(rest('https://api.todoninja.de').fetch(window.fetch))
  .configure(auth({ storage: window.localStorage }));

export default feathersClient;
