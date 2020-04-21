const http = require('http');
const WebSocket = require('ws');

let data = '';
http.get('http://localhost:9223/json/version', (res) => {
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        const debuggerURL = JSON.parse(data).webSocketDebuggerUrl;
        const remoteDebuggerWS = new WebSocket(debuggerURL);
        const serverWS = new WebSocket("http://localhost:8080");

        remoteDebuggerWS.on('message', (data) => {
            serverWS.send(data);
        });

        serverWS.on('message', (data) => {
            remoteDebuggerWS.send(data);
        });
    });
});
