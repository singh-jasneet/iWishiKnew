

var beg_text = ["What is Javascript?<ul><li>Designed to add interactivity to HTML pages</li><li>Is a scripting language</li><li>Embedded directly into HTML pages</li><li>Is an interpreted language</li></ul>","What are the uses for javascript?<ul><li>Put 'snippets' of code into HTML code</li><li>Can read and write HTML elements</li><li>Used to validate data</li><li>Used to create cookies</li></ul>"];

var beg_prereq = ["HTML","CSS"];

var inter_text = ["To detect a person's browser: use the navigator object.<ul><li>Browser CodeName: navigator.appCodeName</li><li>Browser Name: navigator.appName</li><li>Browser Version: navigator.appVersion</li><li>Platform: navigator.platform</li></ul>"];

var inter_prereq = ["Beginning javascript"];

var quiz = ["http://w3schools.com/js/js_quiz.asp"];

this.getBegText = function(){
	return beg_text;
}

this.getBegPrereq = function(){
	return beg_prereq;
}

this.getInterText = function(){
	return inter_text;
}

this.getInterPrereq = function(){
	return inter_prereq;
}

this.getQuiz = function(){
	return quiz;
}

this.getText = function(){
	var text = new Array();
	text['quiz'] = quiz;
	text['inter_prereq'] = inter_prereq;
	text['inter_text'] = inter_text;
	text['beg_prereq'] = beg_prereq;
	text['beg_text'] = beg_text;

	return text;
}
