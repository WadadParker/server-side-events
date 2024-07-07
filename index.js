import express from "express";
import { fileURLToPath } from 'node:url';
import { dirname , join } from 'node:path';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
// This dirname is just so we can directly send html file as a response to that API call
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.get('/sse')

app.listen(3000, () => {
    console.log("Server is running da")
})