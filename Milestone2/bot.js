require('dotenv').config();
const SlackBot = require("slackbots");

const bot = new SlackBot({
	token: process.env.SLACK_BOT_TOKEN,
	name: 'secbot'});

//Start Handler
bot.on('start', () => {
	const params = 	{
		icon_emoji: ':panda_face:'
	}
	bot.postMessageToChannel('general', 'Be Assured. Be Secured.', params);
});

//Error Handler
bot.on('error', (err) => {console.log(err)});

//Message Handler
bot.on('message', (data) => {
	if(data.type !== 'message') {
		return; 
	}
	//Function to handle data and 3 use cases	
});
