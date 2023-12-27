import express from 'express';
import { config } from './config/config';
import router from './router';
import cors from 'cors';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';

const app = express();
const port = config.port || 3000;
const version = config.version || '';
const allowedOrigin = config.allowedHost || '';


const options = {
  key: fs.readFileSync('./private-key.pem', { encoding: "utf8" }),
  cert: fs.readFileSync('./cert.pem', { encoding: "utf8" })
};

const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(version, router);

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
