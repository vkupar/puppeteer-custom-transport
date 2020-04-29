const puppeteer = require('puppeteer');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

class WSTransport {
    constructor(ws) {
        this.ws = ws;
        this.ws.on("message", (message) => {
            if (this.onmessage) {
                this.onmessage(message);
            }
        });

        this.ws.on("close", () => {
            if (this.onclose) {
                this.onclose();
            }
        });
        this.onmessage = null;
        this.onclose = null;
    }

    send(message) {
        this.ws.send(message);
    }

    close() {
        this.ws.close();
    }
}

wss.on('connection', (ws) => {
    const browser = await puppeteer.connect({
        transport: new WSTransport(ws),
        defaultViewport: null
    });

    const page = await browser.newPage();
    await page.goto('https://www.google.com');
});
