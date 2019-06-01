import express from 'express';
import bodyParser from 'body-parser';
import * as api from './controllers/api';

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

/**
 * App Routes
 */
app.use('/', api.health);

export default app;
