var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    // http://localhost:3000/data
    // hit above URL in api development tools like postman or insomnia with get request in response will get the JSON data

    if (request.url == '/data') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        var json = {
            name : "Rakesh Sharma",
            age : "25",
            purchase : {
                "2017":"BMW Car",
                "2018":"3BHK House"
            },
            profession : "Software Engineer"
        }
        response.write(JSON.stringify(json));  
        response.end();  
    }

    // http://localhost:3000 or http://localhost:3000/index.html or  http://localhost:3000/blog-single.html
    // Will get actual website page
    var filePath = '.' + request.url;
    if (filePath == './' || filePath == './index.html') {
        filePath = './public/index.html';
    }
    if (filePath == './blog-single.html') {
        filePath = './public/blog-single.html';
    }

    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content, 'utf-8');        
    });

}).listen(3000);
console.log('Server is running on port 3000');