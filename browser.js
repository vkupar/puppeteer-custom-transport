const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--start-maximized',
            `--remote-debugging-port=9223`
        ]
    })
    .then(() => {
        console.log("opening browser (ctrl + c to cancel)")
    })
    .catch((error) => {
        throw error
    });

})();
