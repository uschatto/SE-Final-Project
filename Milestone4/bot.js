require('dotenv').config();
request = require('request');
const SlackBot = require('slackbots');
const {table} = require('table');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var mysql = require("mysql");

var threshold = process.env.threshold;
var newurl;

const image_types = ["jpeg", "jpg", "png", "bmp", "gif", "webp"];

const bot = new SlackBot({
	
	token: process.env.SLACK_BOT_TOKEN,
	name: 'SecBot'
});

var name_log;

var cloudmersive;
var moderateContent;
var clPost;
var modcontent_get;

//Create database connection
var con = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "SECBOT"
});

con.connect(function(err) {
  if (err) throw err;
});


//Start Handler
bot.on('start', () => {
	bot.postMessageToChannel('general', 'Be Assured. Be Secured.');
});

//Error Handler
bot.on('error', (err) => {console.log(err)});


//Message Handler
bot.on('message', (data) => {
	if("files" in data ){
		number_files = data["files"].length
		console.log(number_files);
		for(i = 0; i < number_files; i++){
			//To retrieve file ID, user ID, file name and file type		
			file = data["files"][i]['id'];    
			initial_file = file;
			user_id = data["files"][i]['user']; 
			file_name = data["files"][i]['name'];
			permalink = data["files"][i]['permalink_public']
			filetype = data["files"][i]['filetype'].toLowerCase();

			//To enable public file sharing
			request.post({
				url: 'https://slack.com/api/files.sharedPublicURL',
				formData: {
					token: process.env.SLACK_ACCESS_TOKEN,
					file: file //fileID
				}, 
			}, function(err, response){
			});
			
			//To check for corrupt files and inappropriate images 	
			fileCheck(file, user_id, file_name, filetype, permalink);
		}
	}
});

async function fileCheck(file, user_id, file_name, filetype, permalink){
	var isImage;
	//Checking if a file or an image is corrupted
	if (image_types.includes(filetype)){
		isImage = "Y";
	}
	clPost = await cloudMersiveScan(user_id, file, file_name, permalink, isImage);
	cleanResult = clPost.CleanResult;
	threatType = clPost.WebsiteThreatType;

	if (cleanResult == false){
		bot.postMessageToChannel('general', "The file [" + file_name + "] has WebsiteThreatType [" + threatType + "]. SecBot will delete the file.");
		//To log the name of the user and file name in a csv file
		createReport(file_name,file);
		//To delete the image if it contains virus
		//deleteFile(file);
		//To report logs 
		//report();
	}
	else{
		//Checking if an image is inappropriate
		if (image_types.includes(filetype)){
			modcontent_get = await inappropriateCheck(user_id, file, file_name, permalink);
			prediction = modcontent_get.predictions;
			adult_prediction = prediction['adult'];
		}
		if (image_types.includes(filetype) && adult_prediction < 10){
			bot.postMessageToChannel('general', "Scanning complete. Image [" + file_name + "] safe to download.")}
		else if(image_types.includes(filetype) && adult_prediction >= 10){
			bot.postMessageToChannel('general', "The image [" + file_name + "] is inappropriate. SecBot will delete the file.");				
			//To delete the image if it is inappropriate
			deleteFile(file);
			//To report the person who uploaded the image
			reportPerson();			
		}
		else
			bot.postMessageToChannel('general', "Scanning complete. File [" + file_name + "] safe to download.");	
	}
	final_file = file;
}

//To check if the public/external URL of a file uploaded on Slack has malware
function cloudMersiveScan(user_id, file, file_name, permalink, isImage){
	//Changing file name according to URL format
        fileName = file_name.toLowerCase();
        fileName1 = fileName.replace(" ", "_");

        //URL link to upload on CloudMersive API
        linkArray = permalink.split('/')
        splitArray = linkArray[3].split('-')
	if (isImage == "Y")
	{
        	newurl = linkArray[0] + '//files.slack.com/files-pri/' + splitArray[0] + '-' + splitArray[1] +'/' + fileName1 + '?pub_secret=' + splitArray[2]
	}
	else
	{
		newurl = linkArray[0] + '//files.slack.com/files-pri/' + splitArray[0] + '-' + splitArray[1] +'/download/' + fileName1 + '?pub_secret=' + splitArray[2]
	}
	sleep(3000);
	//Getting response from CloudMersive API
	return new Promise(function(resolve, reject){
		const options5 = {
			url : 'https://api.cloudmersive.com/virus/scan/website',
			method : 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Apikey': process.env.URLSCANAPIKEY},
			body: JSON.stringify({"Url" : newurl})
		};
		request(options5, function(err, res, body) {
	 		clPost = JSON.parse(body);
			resolve(clPost);
		});
	});
}


//To check if an image is inappropriate using API
function inappropriateCheck(user_id, file, file_name, permalink){
	//Changing file name according to URL format
	fileName = file_name.toLowerCase();
	fileName1 = fileName.replace(" ", "_");
	
	//URL link to upload on ModerateContent API
	linkArray = permalink.split('/')		
	splitArray = linkArray[3].split('-')		
	newurl = linkArray[0] + '//files.slack.com/files-pri/' + splitArray[0] + '-' + splitArray[1] +'/' + fileName1 + '?pub_secret=' + splitArray[2]

	//Getting response from ModerateContent API
	return new Promise(function(resolve, reject){
		const options5 = {
		    url: 'https://www.moderatecontent.com/api/v2?key=' + process.env.APIKEY + '&url=' + newurl ,
		    method: 'GET',
		    headers: {
			'Accept': 'application/json',
			'Accept-Charset': 'utf-8',
		    }
		};
		request(options5, function(err, res, body) {		
		    modcontent_get = JSON.parse(body);
		    resolve(modcontent_get);
		});
	});	
}		

//To report user name and file name if a threshold is reached
async function report(){

	const count = await totalEntries();
	if(count >= threshold){
		const response_res = await reportLogs();
		await deleteDataFromDB();	
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


//To log the entries in the database 
async function createReport(file_name,file){
	const result = await listNameofUser();
	var values  = [
		[result,file_name]];
	var sql = "INSERT INTO REPORT (username, filename) VALUES ?";
  	con.query(sql, [values], function (err, result) 
	{
    		if (err) throw err;
  	});
	await deleteFile(file);
	await report();

}

//Reporting the logs
async function reportLogs(){
	const user_name = await listNameofUser();
	const data = await getDataFromDB();

	//Placeholder for Sending email to IT department
	var transporter = nodemailer.createTransport(smtpTransport({
	  service: 'gmail',
	  host: 'smtp.gmail.com',
	  auth: {
	    user: 'secbotforslack@gmail.com',
	    pass: process.env.GMAIL_PASSWORD
	  }
	}));

	var mailOptions = {
	  from: 'secbotforslack@gmail.com',
	  to: 'itdepartmentforslack@gmail.com',
	  subject: 'REPORT FOR CORRUPTED FILES/IMAGES',
	  text: data
	};
	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  }
	}); 
}

//To report the person who uploaded inappropriate content
async function reportPerson(){
	const user_name = await listNameofUser();
	var transporter = nodemailer.createTransport(smtpTransport({
	  service: 'gmail',
	  host: 'smtp.gmail.com',
	  auth: {
	    user: 'secbotforslack@gmail.com',
	    pass: process.env.GMAIL_PASSWORD
	  }
	}));

	var mailOptions = {
	  from: 'secbotforslack@gmail.com',
	  to: 'hrforslack@gmail.com',
	  subject: 'Complaint against ' + user_name,
	  text: user_name + ' has posted inappropriate content. Please take necessary action.'
	};
	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  }
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

//To get number of entries in SECBOT.REPORT table
function totalEntries(){
	 return new Promise(function(resolve, reject){
		var rowsn = 'SELECT COUNT(*) as cnt from REPORT';
        	var count;
        	con.query(rowsn, function (err,rows,result)
        	{
                	if (err) throw err;
                	count = rows[0].cnt;
                	resolve(count);
        	});
	});
}

//To get the report from database and format it into tabular format
function getDataFromDB(){
	return new Promise(function(resolve, reject){
		var output; 
		var temp = [];
        	con.query("SELECT * FROM REPORT", function (err, result, fields) {
                	if (err) throw err;                                                                                                                                                 
			data = JSON.parse(JSON.stringify(result));
                	data.forEach(function(value){
				row = [];
				Object.keys(value).map(function(key){
                                	row.push(value[key]);
				});
				temp.push(row);
                	});
			output = table(temp);
                	resolve(output);
		}); 
	});
}

//To delete data from the database after sending an email to the IT department
function deleteDataFromDB(){
	return new Promise(function(resolve, reject){
		con.query("DELETE FROM REPORT", function (err, fields) {
                        if (err) throw err;});
	});
}

function sleep(milliseconds){
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while(currentDate - date < milliseconds);
}

