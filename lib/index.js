import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import Router from '../router';
import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongo');

// APP setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
Router(app);

// SERVER setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server running on port', port);
