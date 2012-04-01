var request = require('request');


var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=javascript&format=json';
request(url,function(error,response,body){
	console.log(body);
});
