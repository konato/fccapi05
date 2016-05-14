'use strict';
var path = process.cwd();

var filesizeApi = require(path + '/app/controllers/filesizeApi.server.js');

// using memory storage can be changed for a custom storage engine.
var multer  = require('multer')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

module.exports = function (app) {

	var filesize = new filesizeApi();
	
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});


	app.post('/api/filesize', upload.single('fileName'), filesize.getFilesize)
	
	

	
	
	
};
