// import WebSocket from 'ws';
var WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 80 });

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

wss.on('connection', function(ws)  {
    console.log('Connected Client');
    ws.on('message', function incoming(data) {
        // Broadcast to everyone else.
        console.log('Received', data);
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});