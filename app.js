
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')

var youtube = require('./youtube.js');
var ads = require('./adproducts.js');
var text = require('./w3text.js');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/:term', function(req,res){
        console.log('request made');
 	if(req.params.term=='Sketchetik-Light.tff')
	  return;
	youtube.request(req.params.term,function(response){
		ads.requestProds(req.params.term,function(products){
			res.render('index',{title:'iWishiKnew',videos:response,prods:products,term:req.params.term,words:text.getText()});
		});
	});
});

app.get('/',function(req,res){
	res.render('submit',{title:'Enter your search term'});
});

app.post('/',function(req,res){
	if(req.body.searchterm!='Sketchetik-Light.tff')
	res.redirect('/'+req.body.searchterm);	
});



app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

