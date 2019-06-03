import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import * as api from './controllers/api';
import * as locationsController from './controllers/locations';

/**
 * Create Express App
 */
const app = express();

/**
 * Express Configuration
 */
app.enable('trust proxy');
app.set('port', process.env.PORT || 8080);

app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cors());

/**
 * App Routes
 */
app.get('/', api.checkHealth);
app.get('/locations', locationsController.getAll);
app.get('/max-mean', api.getMaxMeanValue);

export default app;
