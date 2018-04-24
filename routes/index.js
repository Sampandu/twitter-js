'use strict';

const express = require('express');
const router = express.Router();
const tweetBank = require('../tweetBank');

router.get('/', function(req, res){
	let allOfTweets = tweetBank.list();
	res.render('index', { 
		tweets: allOfTweets,
		showForm: true
	});
});


// single-user page
  // router.get('/users/:username', (req, res, next) => {
  //   const tweetsForName = tweetBank.find({ name: req.params.username });
  //   res.render('index', {
  //     title: 'Twitter.js',
  //     tweets: tweetsForName,
  //     showForm: true,
  //     username: req.params.username
  //   });
  // });

router.get('/users/:name', (req, res) => {
	let name = req.params.name;
	let tweetsForName = tweetBank.find({name: name});
	res.render('index', {
		tweets: tweetsForName,
		showForm: true,
		userName: req.params.name
	});
});

router.get('/tweets/:id', (req, res, next) => {
	console.log(req.params);
	let tweetsForId = tweetBank.find({id: Number(req.params.id)}); //req.params返回的是字符串‘1’，‘2’...
	res.render('index', {
		tweets: tweetsForId
	});
});

router.post('/tweets', (req, res, next)=>{
	let name = req.body.name;
	let text = req.body.text;
	tweetBank.add(name, text);
	res.redirect('/');
});



// 以下内容被app.js里面的express.static代替
// router.get('/stylesheets/style.css', function(req, res) {
// 	res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/'});
// });  

module.exports = router;