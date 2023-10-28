import express from 'express';
import { config } from './config/config';
import router from './router';


const app = express();
const port = config.port || 3000;
const version = config.version || '/v1';

app.use(version, router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
