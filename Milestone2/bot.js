require('dotenv').config();
request = require('request');
requestp = require('request-promise')
const fs = require('fs');
const SlackBot = require('slackbots');
const path = require('path');
var nock = require("nock");

const image_types = ["jpeg" , "jpg" , "jpe" , "jfif" , "jif" , "jfi" , "png" , "svg" , "webp" , "tiff" , "tif" , "psd" , "raw" , "arw" , "cr2" , "nrw" , "k25" , "bmp"] 

const bot = new SlackBot({
	token: process.env.SLACK_BOT_TOKEN,
	name: 'SecBot'
});

var name_log;
var csvWriter = require('csv-write-stream');
var writer = csvWriter({sendHeaders: false}); 
var csvFilename = "report.csv";
var imagecsvFilename = "imgReport.csv";

var virusTotal;
var moderateContent;
var vtGet;
var vtPost;
var vt_json = {"queued": true};
var modcontent_get;

var Report = path.join(__dirname,'', 'report.csv')
var imageReport = path.join(__dirname, '', 'imgReport.csv')

//Start Handler
bot.on('start', () => {
	bot.postMessageToChannel('general', 'Be Assured. Be Secured.');
	// If CSV file does not exist, create it and add the headers
	if (!fs.existsSync(csvFilename)) {
		writer = csvWriter({sendHeaders: false});
	  	writer.pipe(fs.createWriteStream(csvFilename));
	  	writer.write({
	    		header1: 'MEMBER NAME',
	    		header2: 'FILE NAME'
	  	});
	  	writer.end();
	} 

});

//Error Handler
bot.on('error', (err) => {console.log(err)});

//Message Handler
bot.on('message', (data) => {
	if("files" in data ) {
		if (data["files"][0]['name'] !== 'report.csv' && data["files"][0]['name'] !== 'imgReport.csv'){
			//Setting Mock response from VirusTotal API
			if ((data["files"][0]['name']).match(/corrupted/i)){ 
				virusTotal = {virus : true };
			}
			else
				virusTotal = {virus : false};
			//Setting Mock response from Inappropriate image checking API
			if(image_types.includes(data["files"][0]['filetype'].toLowerCase())) {	
				if ((data["files"][0]['name']).match(/inappropriate/i))
					moderateContent = {inappropriate : true};
				else
					moderateContent = {inappropriate : false};
			}
			
		 	const options = {
		  		headers: {
		    			'Content-Type': 'application/json'
		  		}
			}

			//To retrieve file ID, user ID, file name and file type
			file = data["files"][0]['id'];      
			user_id = data["files"][0]['user']; 
			file_name = data["files"][0]['name'];
			filetype = data["files"][0]['filetype'].toLowerCase();
		
			//Using nock to intercept virusTotal POST request
			var mockPostVt = nock("https://www.virustotal.com")
			   .persist() 
			   .post('/vtapi/v2/url/scan', {
				apikey: 'abcd1234',  //Random API key
				url: 'https://thencsu.slack.com/files/'+ user_id + '/'+ file + '/' + file_name
			   })
			   .reply(200, JSON.stringify(vt_json.queued));

			//Using nock to intercept virusTotal GET request
			var mockGetVt = nock("https://www.virustotal.com")
			   .persist() 
			   .get('/vtapi/v2/url/report', {
				apikey: 'abcd1234',   //Random API key
				resource: 'https://thencsu.slack.com/files/'+ user_id + '/'+ file + '/' + file_name
			   })
			   .reply(200, JSON.stringify(virusTotal.virus));

			//Using nock to intercept Inappropriate image checking GET request
			var mockGetMod = nock("http://im-api1.webpurify.com")
			  .persist() 
			  .get('/services/rest/', {
				method: 'webpurify.live.imgcheck',
				api_key: 'abcd1234',    //Random API key
				imgurl: 'https://thencsu.slack.com/files/'+ user_id + '/'+ file + '/' + file_name,
				format: 'json'
			  })
			  .reply(200, JSON.stringify(moderateContent.inappropriate));

			//To check for corrupt files and inappropriate images 	
			fileCheck(file, user_id, file_name, filetype);
		}
	}
	else if("text" in data){
		//Report to primary owner and 'management' channel on demand 
		if(data["text"] == 'Send the corrupted files report'){
			var user_identity = data["user"];
			reportOnDemand(user_identity);
		}
	}
});

async function fileCheck(file, user_id, file_name,filetype){
	//Checking a file or an image if it is corrupted
	vtPost = await virusTotalScan();
	if (vtPost.match(/true/i))
		vtGet = await virusTotalReport();		
	if (vtGet.match(/true/i)){
		bot.postMessageToChannel('general', "The file is corrupted");
		//To log the name of the user and file name in a csv file
		createReport(file_name);
		//To delete the image if it contains virus
		deleteFile(file);
		//To report logs 
		report();
	}
	//Checking if an image is inappropriate
	modcontent_get = await inappropriateCheck();	
	if (modcontent_get.match(/true/i)){
		bot.postMessageToChannel('general', 'Image is inappropriate');
		//To retrieve file ID and user ID				
		//To delete the image if it is inappropriate
		deleteFile(file);
		//To report the person who uploaded the image
		reportPerson();				
	}
	//Neither corrupted nor inappopriate
	if (vtGet.match(/false/i) && modcontent_get.match(/false/i)){
		if (image_types.includes(filetype))
			bot.postMessageToChannel('general', 'Scanning complete. Image safe to download.')
		else
			bot.postMessageToChannel('general', 'Scanning complete. File safe to download.')
	}
}

//To upload a file for virus scan
function virusTotalScan(){
	return new Promise(function(resolve, reject){
		request.post({
			url: "https://www.virustotal.com/vtapi/v2/url/scan",
			form: {
				apikey: "abcd1234", //Random API key
				url: 'https://thencsu.slack.com/files/'+ user_id + '/'+ file + '/' + file_name
		},
		},function(options, response) {
		resolve(JSON.stringify(response.body));
		});
	});
}

//To get the report of scanned file
function virusTotalReport(){
	return new Promise(function(resolve, reject){
		request.get({
			url: "https://www.virustotal.com/vtapi/v2/url/report",
			form: {
				apikey: 'abcd1234', //Random API key
				resource: 'https://thencsu.slack.com/files/'+ user_id + '/'+ file + '/' + file_name
		}, 
		}, function(options, response) {
			resolve(JSON.stringify(response.body));
		});
	});
}		

//To check if an image is inappropriate using API
function inappropriateCheck(){
	return new Promise(function(resolve, reject){
		request.get({
			url: "http://im-api1.webpurify.com/services/rest/",
			form: {
				method: 'webpurify.live.imgcheck',
				api_key: 'abcd1234', //Random API key
				imgurl: 'https://thencsu.slack.com/files/'+ user_id + '/'+ file + '/' + file_name,
				format: 'json'
		}, 
		},function(options, response) {
			modcontent_get = JSON.stringify(response.body);
			resolve(modcontent_get);
		});
	});	
}		

//Sending report on demand to the primary owner
async function reportOnDemand(user_identity){
	const owner_id = await listIdofOwner();
	if (user_identity == owner_id){
		reportLogs(Report);
	}
}

//To report user name and file name if a threshold is reached
async function report(){
	if(totalEntries() >= 20){
		const response_res = await reportLogs(Report);
		fs.writeFileSync(Report, '', function(){console.log('done')});
		if(totalEntries() <= 0){	
			writer = csvWriter({sendHeaders: false});
			writer.pipe(fs.createWriteStream(csvFilename));
			writer.write({
				 header1: 'MEMBER NAME',
				 header2: 'FILE NAME'
			});
			writer.end();
		}
	}
}

//To get the name of the user, given the userID
function listNameofUser(){
	token = process.env.SLACK_BOT_TOKEN;
	return new Promise(function(resolve, reject){
		request.get('https://slack.com/api/users.info?token=' + token + '&user=' + user_id + '&pretty=1', function(error, response, body){
		const info = JSON.parse(body);
		name_log = info.user.name;
		resolve(name_log);
		});
	});
}


//To get the ID of the primary owner
function listIdofOwner(){
	token = process.env.SLACK_BOT_TOKEN;
	return new Promise(function(resolve, reject){
		request.get('https://slack.com/api/users.list?token=' + token + '&pretty=1', function(error, response, body){
		const info = JSON.parse(body);
		if ("members" in info){
			i = 0;
			while(info.members[i].is_primary_owner === false){
				i = i+1;
			}
			owner_id = info.members[i].id;
		}
		resolve(owner_id);
		});

	});
}

//To log the entries in a csv file 
async function createReport(file_name){
	const result = await listNameofUser();
	writer = csvWriter({sendHeaders: false});
	writer.pipe(fs.createWriteStream(csvFilename, {flags: 'a'}));
	writer.write({
		header1: result,
		header2: file_name		
	});
	writer.end();
}

//Reporting the logs
async function reportLogs(filepath){
	const owner_id = await listIdofOwner();
	const multiple_channels = owner_id + ",management";
	return requestp.post({
		url: 'https://slack.com/api/files.upload',
		formData: {
			token: process.env.SLACK_BOT_TOKEN,
			channels: multiple_channels,
			file: fs.createReadStream(filepath),
			filename: "report.csv",
			title: "report.csv",
		},
		}, function (err, response) {
	});		
}

//To report the person who uploaded inappropriate content
async function reportPerson(){
	const owner_id = await listIdofOwner();
	const user_name = await listNameofUser();
	const multiple_channels = owner_id + ",management";
	
	writer = csvWriter({sendHeaders: false});
	writer.pipe(fs.createWriteStream(imagecsvFilename));
	writer.write({
		header1: user_name + " has posted inappropriate content. Please take necessary action."		
	});
	writer.end();
	request.post({
		url: 'https://slack.com/api/files.upload',
		formData: {
			token: process.env.SLACK_BOT_TOKEN,
			channels: multiple_channels, 
			file: fs.createReadStream(imageReport),
			filename: "imgReport.csv",
		}, 
		}, function(err, response){
	});
}

//Delete a file
function deleteFile(file){
	request.post({
    		url: 'https://slack.com/api/files.delete',
    		form: {
      			token: process.env.SLACK_ACCESS_TOKEN,
    			file: file	
		}
	});
}

//To get number of CSV file entries
function totalEntries(){
	var csvFile = fs.readFileSync(Report);
	to_string = csvFile.toString();
	lines = to_string.split('\n');
	var rowsn = lines.length-1;
	return rowsn;
}
