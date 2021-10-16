const express = require('express');
const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const server = express();

server.use(
	cors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	})
);
server.use(morgan('dev'));

server.use('/api', jsonServer.router(path.join(__dirname, 'db.json')));

server.listen(3010, () => {
	console.log('JSON Server is running');
});
