# DEPLOY

Our Bot is deployed on an AWS EC2 instance and is up and running.

## DEPLOYMENT

**PREREQUISITES TO RUN THE ANSIBLE-PLAYBOOK**

*INSTALL ANSIBLE*

Ansible can be installed using the following commands:
- sudo apt-add-repository ppa:ansible/ansible
- sudo apt update
- sudo apt install ansible

*RUNNING THE PLAYBOOK*

The [yaml playbook](https://github.ncsu.edu/csc510-fall2019/CSC510-8/blob/master/Milestone4/INITIAL_CONFIGURATION.yml) is used to fully provision and configure a remote environment for our bot. The playbook will do the following tasks :
- Install nodejs and npm
- Install forever
- Install mySQL and setup the database and tables
- Install npm packages
- Set Environment variables for API keys,gmail passwords,database credentials,threshold value,workspace URL
- Start the bot with forever

[Screencast](https://drive.google.com/file/d/13Ovh_LjDCxtMtnHFpOpHTf8Q5O4mCtyG/view?usp=sharing) showing the deployment script successfully running.

## INSTRUCTIONS FOR ACCEPTANCE TESTING
We have deployed our SecBot in the following Slack [channel](https://thencsu.slack.com). The users and their credentials that can be used to login to the channel are given below,

```
slack_username: User1  password: secbot123 email: secbottest@gmail.com 
slack_username: User2  password: secbot123 email: secbottest2@gmail.com 
slack_username: User3  password: secbot123 email: secbottest3@gmail.com 
```

## EXPLORATORY TESTING AND CODE INSPECTION

*Edge cases handled by our team:*

We have successfully handled the following edge cases 
- An user upload multiple files. These files are of varied nature like virus infected file, virus inspected image, inappropriate image, normal file and normal image. 
- An user uploads a file with filename having characters other than alphanumeric characters.

### LINK FOR VIRUS INFECTED FILES ###
We have used the below mentioned links to test our Use Case 1.

[VIRUS TEXT FILES](https://www.eicar.org/?page_id=3950)

[VIRUS IMAGE FILES](https://github.com/fuzzdb-project/fuzzdb/blob/master/attack/file-upload/malicious-images/POC_phpinfo-metadata.jpg)

### USECASE TESTING
Secbot has already been invited to the channel. Doing @secbot is not needed.

#### USECASE 1: Check if a file is corrupted
```
- Upload a file to the channel from local file system. 
- Wait for the bot to respond with the message 'Scanning complete. File <filename> safe to download' to download and view the file. 
- If the file contains virus, the Bot will respond with the message, 'The file <file-name> has WebsiteThreatType <threat-type> and VirusName <virus-name>.SecBot will delete the file.' 
- The bot will go on to delete the file.

Note: Since this is a free-tier API, please upload files smaller than 4MB.
```
  
#### USECASE 2: Check if an image is inappropriate
```
- If we reach this step, we can guarantee that the image is virus protected.
- Upload an image to the channel from the local file system.Note the image has to be one of these types - "jpeg","jpg","png","bpm","gif","webp" .
- Wait for the bot to respond with the message 'Scanning complete. Image <imagename> safe to download' to download and view the file. 
- If the image is inappropriate, the Bot will respond with the message, 'The image <imagename> is inappropriate. SecBot will delete the image. 
- The bot will go on to delete the image.
```

#### USECASE 3: Reporting to the HR and IT team
```
- Whenever an inappropriate image is uploaded to the channel, the bot deletes the image and sends a complaint to the HR team via email. 
- A table is created in the database which contains the details of corrupted files that are uploaded and the usernames of the uploaders'. 
- Each time a user uploads a file with virus, the bot deletes it and updates the table with the corresponding filename and username. When the number of entries in the table reaches a particular threshold (the threshold value is defined as an environment variable), an email with the contents in the table is sent to the IT team. 
- To make testing a little easier, the current threshold value is set to 3. 
- The following are the email account details of SecBot, HR Team and IT Team that can be used to check if the emails are sent correctly.
  Secbot:
     email: secbotforslack@gmail.com  password: secbot1234
  HR:
     email: hrforslack@gmail.com password: hrforslack1234
  IT:
     email: itdepartmentforslack@gmail.com password: it1234_1234
 ```

## OVERVIEW OF OUR FINAL CODE
The [bot.js](https://github.ncsu.edu/csc510-fall2019/CSC510-8/blob/master/Milestone4/bot.js) is the main code which will take care of all the usecases.The basic overview is :

- Whenever an user uploads anything on the slack channel from the local file system, bot checks if it is a file/image and sends to the CloudMersive API to check if it contains any virus.Bot will parse the response from the API and if it finds a virus, it will log into the database, check if a threshold is reached for the report (if yes it will send a report to the IT team and database will be cleared). It will then delete the file from the channel with the message "The file <file-name> has WebsiteThreatType <threat-type> and VirusName <virus-name>.SecBot will delete the file". If no virus is found then it will send a message "Scanning Complete.File <file-name> safe to download."
  
- If the file/image does not have virus, then the bot checks if its an image and sends it to ModerateContent API for checking any inappropriate content. Bot will parse the response from the API and if inappropriate content is found , then it will delete the file from the channel with the message "The image <image-name> is inappropriate.SecBot will delete the file." It will send an email to the HR team. If the image is appropriate , a message will be sent to the channel "Scanning complete. Image <image-name> safe to download."
  
## CONTINUOUS INTEGRATION SERVER

- We've used [this repository](https://github.com/CSC-510/Jenkins-Ansible) to setup Jenkins server.
- Jenkins server is set up and github integration plugin is added to trigger build for our bot when a commit is made.

- CI testing is done using Selenium testing and the respective shell commands are also configured in the Jenkins server job.

- This is the link for the [screencast](https://drive.google.com/file/d/1sa_67aB_csmgHNcvsUO3ru7ZOlRVK5e_/view?usp=sharing) showing the Jenkins Job.

**Set Up for Selenium Testing**

- Install Java
- Download the chromedriver, selenium jar files
- Run the selenium testing via the below commands : 
	- javac -cp "/usr/share/java/junit4.jar:/home/vagrant/libs_for_selenium/selenium-server-standalone-3.141.59.jar" slackintegration/secbot.java
	- java -cp "/usr/share/java/junit4.jar:/home/vagrant/libs_for_selenium/selenium-server-standalone-3.141.59.jar:." slackintegration/secbot
