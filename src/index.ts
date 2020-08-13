import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes/index';
import {MONGODB_URI} from './config/keys';

const PORT = process.env.PORT || 8000;

const app = express();

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("", routes);
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => console.log('DB is connected'),
    (err: any) => console.log('DB connection failed')
  );

app.listen(PORT, () => console.log("listening on port: " + PORT.toString()));

