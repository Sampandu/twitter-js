const express = require('express');
const morgan = require('morgan');

const app = express();

// app.use((req,res,next) => {
// 	morgan('tiny');
// 	next();	
// });

app.use(morgan('tiny'));


app.get('/', function(req, res){
	res.send('Hello');
	// console.log(req.method, '/', res.statusCode);
});


app.get('/news', function(req, res){
	res.send('Welcome');
});

app.listen(3000, ()=>console.log('working?'));