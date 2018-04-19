const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const app = express();

const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];


app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', {noCache: true}); // point nunjucks to the proper directory for templates

app.use(morgan('tiny'));


app.get('/', function(req, res){
	res.render('index', {title: 'An Example', people: people});
	// console.log(req.method, '/', res.statusCode);
});


app.get('/news', function(req, res){
	res.send('Welcome');
});

app.listen(3000, ()=>console.log('working?'));