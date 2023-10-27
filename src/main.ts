import express from 'express';
import dotenv from 'dotenv';
import { config } from './config/config';
import router from './router';
dotenv.config();

const app = express();
const port = config.port || 3000;

app.use('/v1', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});