'use strict';




function FilesizeApi() {
   
   this.getFilesize = function (req, res,next) {
    console.log("getFilesize called")
    console.dir(req.file.originalname)
    console.dir(req.file.size)
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify([{file: req.file.originalname, size: req.file.size}]))

 
   }
   

  

}

module.exports = FilesizeApi;
