// const http = require('http');

// const server = http.createServer((req, res) => {
//     if (req.method === 'GET' && req.url === '/') {
//         res.end()
//     }
// })

// server.listen(3001, () => {
//     console.log('server on http://localhost:3001');
// });

import * as dotenv from 'dotenv';
dotenv.config();
import config from './config';
import app from './server';

app.listen(config.port, () => {
    console.log(`hello from localhost:${config.port}`)
})