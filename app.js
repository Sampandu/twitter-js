const express = require('express');
// const morgan = require('morgan');  //log request and response info
const nunjucks = require('nunjucks');
const chalk = require('chalk');
const routes = require('./routes');
const path = require('path');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const socketio = require('socket.io'); //With sockets, the server can signal clients without waiting for a request.

const app = express(); //// creates an instance of an express application

const people = [{name: 'Hello'}, {name: 'Stacker'}, {name: 'Son'}];


app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', {noCache: true}); // point nunjucks to the proper directory for templates

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


let server = app.listen(3000, ()=>{console.log('listening on port 3000.')});
let io = socketio.listen(server);

// app.use(morgan('dev'));
app.use(volleyball);
app.use('/', routes(io));
app.use(express.static(path.join(__dirname, '/public'))); //这里需要先npm install path --save,
														  // .static可将public里的静态文件名自动当作identifier，request可以在url发出访问


