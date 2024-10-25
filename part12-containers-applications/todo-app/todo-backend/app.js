const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

// Custom middleware to log the called endpoint
app.use((req, res, next) => {
    console.log(`Called endpoint: ${req.method} ${req.url}`);
    next();
});

app.use('/', indexRouter);
app.use('/todos', todosRouter);

module.exports = app;
