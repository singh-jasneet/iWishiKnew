var request = require('request');
var fs = require('fs');
var utility = require('util');
var $ = require('jquery');

//aggregates youtube videos given a search topic
var requestVideos = function(searchTerm,cb){
	var result = [];
	url = "https://gdata.youtube.com/feeds/api/videos?alt=json&q="+searchTerm+"&start-index=1&max-results=50&v=2";
	request(url,function(error,response,body){
		console.log(error);
		console.log(url);
		var youtube_list = JSON.parse(body);
		list = youtube_list['feed']['entry'];
		for(i=0;i<list.length;i++){
			var entry = new Array();
			entry['id'] = list[i]['media$group']['yt$videoid']['$t'];
			entry['date'] = list[i]['published']['$t'];
			entry['comments'] = list[i]['gd$comments']['gd$feedLink']['countHint'];
			entry['keywords'] = list[i]['media$group']['media$keywords']['$t'];
			entry['url'] = list[i]['media$group']['media$player']['url'];
			entry['length'] = list[i]['media$group']['yt$duration']['seconds'];
			entry['title'] = list[i]['title']['$t'];
			entry['author'] = list[i]['author'][0]['name']['$t'];
			entry['description'] = list[i]['media$group']['media$description']['$t'];
			entry['rating'] = list[i]['gd$rating']['average'];
			entry['viewCount'] = list[i]['yt$statistics']['viewCount'];
			entry['favCount'] = list[i]['yt$statistics']['favoriteCount'];
			entry['likes'] = list[i]['yt$rating']['numLikes'];
			entry['dislikes']=list[i]['yt$rating']['numDislikes'];
			result.push(entry);
		}
		cb(filter(sort(result)));
	});
}

function sort(playlist){
	var keywords_freq = new Array();
	for(i=0;i<playlist.length;i++)
	{
		words = playlist[i]['keywords'].split(",");
		for(j=0;j<words.length;j++)
		{
			word = $.trim(words[j].toLowerCase());
			if (word in keywords_freq)
				keywords_freq[word] = keywords_freq[word]+1;
			else
				keywords_freq[word] = 1;
		}
	}
	//console.log(keywords_freq);
	for(i=0;i<playlist.length;i++)
	{
		if((playlist[i]['keywords']).search(/begin/i)!=-1||(playlist[i]['keywords']).search(/first/i)!=-1){
			//console.log(playlist[i]);
			playlist[i]['type'] = 'beginner';
		}
		else
			playlist[i]['type'] = 'inter';
	}
	return playlist;

}

function filter(playlist){
	var beg_list = [];
	var inter_list = [];
	var inter_final = [];
	for(i=0;i<playlist.length;i++){
		if(playlist[i]['type'] =='beginner')
			beg_list.push(playlist[i]);
		else
			inter_list.push(playlist[i]);
	}
	if(inter_list.length>10)
	{
		inter_top=[];
		inter_num = [];
		for(i=0;i<inter_list.length;i++)
			inter_num.push(inter_list[i]['rating']);
		inter_num.sort();
		for(j=0;j<10;j++)
		{
			inter_top.push(inter_num.pop());
		}
		inter_final = [];
		for(i=0;i<playlist.length;i++)
		{
			if(playlist[i]['rating']>4.9 && inter_final.length!=10)
				inter_final.push(playlist[i]);
		}
	}
	
	console.log(inter_final.length);
	for(i=0;i<beg_list.length;i++)
	{	
		inter_final.push(beg_list[i]);
	}

	return inter_final;
}

exports.request = requestVideos;
		
