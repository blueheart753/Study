var fs = require('fs');
fs.readFile('semple.txt','utf-8', function(err, data) {
    console.log(data);
});