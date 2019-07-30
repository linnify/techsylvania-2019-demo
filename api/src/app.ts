import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import * as api from './controllers/api';
import * as locationsController from './controllers/locations';
//aab
/**
 * Create Express App
 */
const app = express();
//testdb
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

/**
 * Get all the neighbourhoods
 */
app.get('/locations', locationsController.getAll);

/**
 * Calculate the max mean
 */
app.get('/max-mean', api.getMaxMeanValue);

app.get('/modified', api.getLastModified);

/**
 * Get the averages between 2 neighbourhoods
 * Pass the source and destination as query parameters
 */
app.get('/averages', locationsController.getAveragesPerHour);

export default app;
