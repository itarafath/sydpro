import { createServer } from 'http';
import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import cors from 'cors';

dotenv.config();
const app: express.Application = express();
const server = createServer(app);

const port = process.env.PORT || 3000;

app.use(cors()); // enable cors

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
server.listen(port);
