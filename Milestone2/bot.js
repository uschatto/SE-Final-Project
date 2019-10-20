require('dotenv').config();
request = require('request');

const SlackBot = require('slackbots');
const image_types = ["jpeg" , "jpg" , "jpe" , "jfif" , "jif" , "jfi" , "png" , "svg" , "webp" , "tiff" , "tif" , "psd" , "raw" , "arw" , "cr2" , "nrw" , "k25" , "bmp"] 

const bot = new SlackBot({
	token: process.env.SLACK_BOT_TOKEN,
	name: 'SecBot'
});

//Start Handler
bot.on('start', () => {
	bot.postMessageToChannel('general', 'Be Assured. Be Secured.');
});

//Error Handler
bot.on('error', (err) => {console.log(err)});

//Message Handler
bot.on('message', (data) => {
	console.log(data);
	if("files" in data ) {
		//Use Case 1 ( Image checking)
		if ( image_types.includes(data["files"][0]['filetype'].toLowerCase()) ) { 
			if ( (data["files"][0]['name']).match(/corrupted/i) ){
				bot.postMessageToChannel('general', "The image is corrupted");
				file=data["files"][0]['id'];
				request.post({
    					url: 'https://slack.com/api/files.delete',
    					form: {
      						token: process.env.SLACK_ACCESS_TOKEN,
    						file: file	
				}
				});
		}}
		//Use Case 2 ( File checking )
		else {
			if ( (data["files"][0]['name']).match(/corrupted/i) ) {
				bot.postMessageToChannel('general', "The file is corrupted");
				file=data["files"][0]['id'];
                                request.post({
                                        url: 'https://slack.com/api/files.delete',
                                        form: {
                                                token: process.env.SLACK_ACCESS_TOKEN,
                                                file: file
                                }
                                });

			}
		}
	}
	//Use Case 3 ( Report requesting )
	else {
		if ( (data["type"] == "message") & ("client_msg_id" in data) ) {
			if (data["text"].match(/request/i) )  {
				bot.postMessageToChannel('general', "The report is here");
		}
		}}

});

