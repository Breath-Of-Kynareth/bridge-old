import express from 'express';
import { config } from './config/config';
import router from './router';
import cors from 'cors';

const app = express();
const port = config.port || 3000;
const version = config.version || '';
const allowedOrigin = config.allowedHost || '';

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
