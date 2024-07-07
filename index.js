import express from "express";
import { fileURLToPath } from 'node:url';
import { dirname , join } from 'node:path';
import { clearInterval } from "node:timers";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
// This dirname is just so we can directly send html file as a response to that API call
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.get('/sse', (req,res)=> {
    // Setup relevant headers as we need to send an event stream actually
    res.setHeader('Content-Type','text/event-stream');
    res.setHeader('Connection','keep-alive');
    // You need to keep the connection as keep live cuz browser automatically cancels the API after a "timeout" of no response
    res.setHeader('Cache-Control','no-cache')

    res.write('data: welcome tp server sent event \n\n');

    const intervalId = setInterval(()=> {
        // At this point, some heavy operation maybe done like fetching huge data from the DB, we are mocking it with interval instead
        res.write(`data: Server Time ${new Date().toLocaleDateString()} \n\n`)
    }, 5000);

    req.on('close', () => {
        clearInterval(intervalId)
    })
})

app.listen(3000, () => {
    console.log("Server is running da")
})