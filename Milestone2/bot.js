require('dotenv').config();
request = require('request');
requestp = require('request-promise')
const fs = require('fs');
const SlackBot = require('slackbots');
const path = require('path');

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
		//To check if a file(or an image) has virus. If yes, the file is removed and the details of username and filename are reported when a threshold is reached.
			if ( (data["files"][0]['name']).match(/corrupted/i) ){
				bot.postMessageToChannel('general', "The file is corrupted");
				//To retrieve file ID, file name and user ID
				file = data["files"][0]['id'];      
				user_id = data["files"][0]['user']; 
				file_name = data["files"][0]['name'];
				
				//To log the name of the user and file name in a csv file
				createReport(file_name);
				//To delete the image if it contains virus
				deleteFile(file);
				//To report logs 
				report();			 
			}
			//To check if an image is inappropriate. If yes, the person who uploaded the file is reported immediately.
			else if( image_types.includes(data["files"][0]['filetype'].toLowerCase()) ) {	
				if ((data["files"][0]['name']).match(/inappropriate/i)){
					bot.postMessageToChannel('general', 'Image is inappropriate');
					//To retrieve file ID and user ID				
					file = data["files"][0]['id'];
					user_id = data["files"][0]['user'];
					//To delete the image if it is inappropriate
					deleteFile(file);
					//To report the person who uploaded the image
					reportPerson();				
				}
				else{
					bot.postMessageToChannel('general', 'Scanning complete. Image safe to download.');
				}
			}
			else{
				bot.postMessageToChannel('general', 'Scanning complete. File safe to download');
			}
		}
	}
	else if("text" in data){
		if(data["text"] == 'Send the corrupted files report'){
			var user_identity = data["user"];
			reportOnDemand(user_identity);
		}
	}
});

//Sending report on demand to the primary owner
async function reportOnDemand(user_identity){
	const owner_id = await listIdofOwner();
	if (user_identity == owner_id){
		reportLogs(Report);
	}
}

//To report user name and file name if a threshold is reached
async function report(){
	if(totalEntries() >= 15){
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
				i=i+1;
			}
			owner_id=info.members[i].id;
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
