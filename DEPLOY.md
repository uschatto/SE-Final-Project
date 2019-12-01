# DEPLOY

## INSTRUCTIONS FOR ACCEPTANCE TESTING
We have deployed our SecBot in the following Slack [channel](https://thencsu.slack.com). The users and their credentials that can be used to login to the channel are given below,

```
slack_username: User1  password: secbot123 email: secbottest@gmail.com 
slack_username: User2  password: secbot123 email: secbottest1@gmail.com 
slack_username: User3  password: secbot123 email: secbottest2@gmail.com 
```

### USECASE TESTING
Secbot has already been invited to the channel. Doing @secbot is not needed.

#### USECASE 1: Check if a file is corrupted
```
- Upload a file to the channel. 
- Wait for the bot to respond with the message 'Scanning complete. File <filename> safe to download' to download and view the file. 
- If the file contains virus, the Bot will respond with the message, 'The file <filename> has <threat type>. SecBot will delete the file. 
- The bot will go on to delete the file.
```
  
#### USECASE 2: Check if an image is inappropriate
```
- Upload an image to the channel. 
- Wait for the bot to respond with the message 'Scanning complete. Image <imagename> safe to download' to download and view the file. 
- If the image is inappropriate(and not corrupted), the Bot will respond with the message, 'The image <imagename> is inappropriate. SecBot will delete the image. 
- The bot will go on to delete the image.
```
#### USECASE 3: Reporting to the HR and IT team
```
- Whenever an inappropriate image is uploaded to the channel, the bot deletes the image and sends a complaint to the HR team via email. 
- A table is created in the database which contains the details of corrupted files that are uploaded and their uploaders. 
- Each time a user uploads a file with virus, the bot deletes it and updates the table with the corresponding filename and username. When the number of entries in the table reaches a particular threshold(the threshold value is defined as environment variable code), an email with the contents in the table is sent to the IT team. 
- To make testing a little easier, the current threshold value is set to 3. 
- The following are the email account details of SecBot, HR Team and IT Team that can be used to check if the emails are sent correctly.
  Secbot:
     email: secbotforslack@gmail.com  password: secbot1234
  HR:
     email: hrforslack@gmail.com password: hrforslack
  IT:
     email: itdepartmentforslack@gmail.com password: it1234_1234
 ```
