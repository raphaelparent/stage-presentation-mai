module.exports= function(app) {
	var express = require('express');
	var path = require('path');

	/* GET home page. */
	app.get('/', function(req, res, next) {
	  res.sendFile(path.join(app.get('basePath'), '/views/index.html'));
	});

}