require('dotenv').config();
request = require('request');
const fs = require('fs');
const SlackBot = require('slackbots');

const image_types = ["jpeg" , "jpg" , "jpe" , "jfif" , "jif" , "jfi" , "png" , "svg" , "webp" , "tiff" , "tif" , "psd" , "raw" , "arw" , "cr2" , "nrw" , "k25" , "bmp"] 

const bot = new SlackBot({
	token: process.env.SLACK_BOT_TOKEN,
	name: 'SecBot'
});

var name_log;
var csvWriter = require('csv-write-stream');
var writer = csvWriter({sendHeaders: false}); //Instantiate var
var csvFilename = "report.csv";

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

//Start Handler
bot.on('start', () => {
	bot.postMessageToChannel('general', 'Be Assured. Be Secured.');
});

//Error Handler
bot.on('error', (err) => {console.log(err)});

//Message Handler
bot.on('message', (data) => {
	//console.log(data);
	if("files" in data ) {
		//UseCase 1 - To check if a file(or an image) has virus. If yes, the file is removed and the details of username and filename are logged in a csv file.
		if ( (data["files"][0]['name']).match(/corrupted/i) ){
			bot.postMessageToChannel('general', "The image is corrupted");
			file = data["files"][0]['id'];      
			user_id = data["files"][0]['user'] 
			token = process.env.SLACK_BOT_TOKEN;
			console.log(token);
			file_name = data["files"][0]['name'];
			//To log the name of the user and file name in a csv file
			reportLogs(file_name);
			//To delete the image if it contains virus
			deleteFile(file);				
		}
		//Use Case 2
		//if ( image_types.includes(data["files"][0]['filetype'].toLowerCase()) ) {		
	}
	//Use Case 3 ( Report requesting )
	else {
		if ( (data["type"] == "message") & ("client_msg_id" in data) ) {
			if (data["text"].match(/request/i) )  {
				bot.postMessageToChannel('general', "The report is here");
		}
		}}

});
//To get the name of the user using user ID
function listNameofUser(){
	return new Promise(function(resolve, reject){
		request.get('https://slack.com/api/users.info?token=' + token + '&user=' + user_id + '&pretty=1', function(error, response, body){
		const info = JSON.parse(body);
		name_log = info.user.name;
		resolve(name_log);
		});

	});
}
//To log the entries in a csv file 
async function reportLogs(){
try{
	const result = await listNameofUser();
	console.log(result);
	writer = csvWriter({sendHeaders: false});
	writer.pipe(fs.createWriteStream(csvFilename, {flags: 'a'}));
	writer.write({
		header1: result,
		header2: file_name		
	});
	writer.end();
}catch (error) {
       	console.error('ERROR:');
        console.error(error);
    	}
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

