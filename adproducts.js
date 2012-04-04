var request = require('request');
var $ = require('jquery');

var requestProducts = function(searchTerm, cb){
	var result = [];
	var googleapikey = '********';
	var url = 'https://www.googleapis.com/shopping/search/v1/public/products?key='+googleapikey+'&country=US&q='+searchTerm+'&alt=json';

	request(url,function(error,response,body){
		var product_list = JSON.parse(body);
		for(i=0;i<product_list['items'].length;i++)
		{
			var entry = new Array();
			base = product_list['items'][i]['product'];
			entry['id'] = base['googleId'];
			entry['store'] = base['author']['name'];
			entry['title'] = base['title'];
			entry['description'] = base['description'].substring(0,200)+"...";
			entry['link'] = base['link'];
			entry['price'] = base['inventories'][0]['price'];
			result.push(entry);
		}
		cb(result);
	});
}

exports.requestProds = requestProducts;
