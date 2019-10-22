## **Bot Platform and Implementation**
> [Bot Platform and Implementation](https://github.ncsu.edu/csc510-fall2019/CSC510-8/blob/master/Milestone2/bot.js)

<p align="justify">SecBot is fully operational within Slack. The code is written in node.js. Our bot makes requests to Virus Total API and API for Image Moderation; the reponses have been mocked for this milestone. SecBot is integrated with Slack API.

The bot can perform all the functions as mentioned in the use cases. When files(or images) are uploaded, it scans for virus. When a file contains virus, the file is removed and entries, consisting of names of the file and the person who uploaded the file, are logged in report.csv file. A threshold is set on the number of entries in the file. If the threshold is reached, the file is sent to the primary owner of the workspace and the file is cleared. When images are uploaded, it initially checks if the image is corrupted. If it is not, it then checks if the image is inappropriate. </p>

Few things to be noted are:

- Files that are to be tested for malware and inappropriate content should have the keywords 'corrupted' and 'inappropriate' respectively.

- Files/Images have to be uploaded in the 'general' channel.

- For Selenium Testing purposes, 'management' channel has been created for the primary owner to receive the corrupted files report.

- SLACK_ACCESS_TOKEN corresponds to OAuth Access Token and SLACK_BOT_TOKEN corresponds to Bot User OAuth Access Token under 'Tokens for Your Workspace' on Slack.

## **Use Cases Refinement**

**Use Case 1 : Check if a file is corrupted**
```
1 Preconditions:
Users must have VirusTotal API tokens and bot must be a part of the slack channel for which you need document scanning.
2 Mainflow:
User will upload a file [S1], the bot will scan the file for malware[S2]. Bot will warn and remove the file if it is corrupted [S3].
3 Subflows:
[S1] User will upload a file to the slack channel
[S2] Bot will scan file to check if there’s any malware present 
[S3] Bot will report and remove the corrupted file using VirusTotal API
4 Alternate Flows:
[E1] File is not corrupted

```
**Use case 2 : Check if an image is inappropriate**
```
1 Preconditions:
User must have ModerateContent API and bot must be a part of the slack channel
2 Mainflow:
User will upload an image [S1], the bot will scan the file to check [S2]. Bot will warn and remove the file if it is corrupted [S3].
3 Subflows:
[S1] User will upload an image to the slack channel
[S2] Bot will scan file to check if the content is inappropriate
[S3] Bot will warn and remove the inappropriate image, using ModerateContent API
4 Alternate Flows:
[E1] Image is appropriate
```

**Use case 3 : Reporting to the HR and IT Team**
```
1 Preconditions:
User must have ModerateContent API and bot must be a part of the slack channel
2 Mainflow:
User will upload an image or file [S1], the bot will scan the file or image uploaded to check for any virus or inappropriate content [S2]. Bot will send an email to the HR if any inappropriate content was found [S3]. Bot will also send daily reports to the IT team for all the viruses [S4].
3 Subflows:
[S1] User will upload an image or file to the slack channel
[S2] Bot will scan file or the image uploaded to check for any virus or inappropriate content.
[S3] Bot will send an email to the HR if any inappropriate content was shared on the slack channel. The email will have details of the person sharing such content.
[S4] Bot will send report to the IT team when a threshold, on number of entries in the report, is reached. Name of the person and the file will be sent.
4 Alternate Flows:
[E1] Image or file uploaded is appropriate
```

## **Mocking Infrastructure**
We have used nock to intercept the API calls to VirustTotal(used to scan for virus in files) and WebPurify(to check if the image is inappropriate). 
- We have mocked the response from virusTotal as either {"virus":true} or {"virus":false} by checking the name of the files uploaded. All files with 'corrupted' in their names will get {"virus":true} response from the API. 
- Similarly, the response from Webpurify will be {"inappropriate" : true} if the name of the image contains the word "inappropriate", otherwise {"inappropriate" : false} will be returned. Only image files are checked for inappropriate content. For this milestone, we have used WebPurify instead of ModerataContent to check if the uploaded image is down as moderateContent webpage is down at the moment.These responses are defined in bot.js. 
- As for the third usecase, the bot should send an email containing logs of corrupted files to the security team. It should also send a complaint to the HR via email when inappropriate content is posted on the channel. For this milestone, instead of using the gmail API, SecBot sends the report and complaint to the primary owner of the workspace instead. (We are also sending these on #management channel for testing purposes). 

## **Selenium Testing For Each Use Case**
> [Selenium Testing](https://github.ncsu.edu/csc510-fall2019/CSC510-8/blob/master/Milestone2/selenium/secbot.java)

> *For Selenium testing we have taken into account two users*
1) Normal User - Uploads files and images to #general channel of a slack workspace
2) ADMIN User - Owner of the slack workspace and is a member of #management channel along with the SecBot app. This channel would receive the reports of all the malpractices from SecBot app.

The SecBot requires integration of your slack workspace with the google drive containing files(corrupted, normal and inappropriate) to be used for uploading.The SecBot also needs to be invited to the #general channel where the test case will be executed. The user's email address and password,slack's workspace URL and the chromedriver path are accessed with the help of the environment variables and need to set as a prerequiste for this testing.The environment variables used in the testing are explained below:

* CHROMEDRIVER : The exact path for the chromedriver executable
* SLACK_WORKSPACE_URL : The URL for the slack workspace where SecBot is invited to the channel
* SELENIUM_USER_EMAIL : The email id of the normal user and who is the member of the #general channel
* SELENIUM_USER_PASSWORD : The password for normal user account
* ADMIN_EMAIL : The email id of the admin user who is the member of #general channel as well as the member of the #management channel
* ADMIN_PASSWORD : The password for the admin user

The following cases are covered in the selenium testing:

### Use Case 1: File checking for viruses
***Happy Path : Normal file upload***
> *Steps:*
1) Login slack workspace as normal user
2) Go to the #general channel
3) Upload a normal(not corrupted) file to the channel

> *Output:*
File will be uploaded on the channel and a message will be sent by the SecBot saying "Scanning complete. File safe to download" 

***Alternative Path : Corrupted file upload***
> *Steps:*
1) Login slack workspace as normal user
2) Go to the #general channel
3) Upload a corrupted file to the channel

> *Output:*
File will be not be uploaded on the channel and a message will be sent by the SecBot saying "The file is corrupted" 

### Use Case 2: Image checking for viruses or inappropriateness
***Happy Path : Normal Image upload***
> *Steps:*
1) Login slack workspace as normal user
2) Go to the #general channel
3) Upload a normal(not corrupted and not inappropriate) image to the channel

> *Output:*
Image will be uploaded on the channel and a message will be sent by the SecBot saying "Scanning complete. Image safe to download" 

***Alternative Path 1 : Corrupted Image upload***
> *Steps:*
1) Login slack workspace as normal user
2) Go to the #general channel
3) Upload a corrupted image to the channel

> *Output:*
Image will be not be uploaded on the channel and a message will be sent by the SecBot saying "The file is corrupted"

***Alternative Path 2 : Inappropriate Image upload***
> *Steps:*
1) Login slack workspace as normal user
2) Go to the #general channel
3) Upload an inappropriate image to the channel

> *Output:*
Image will be not be uploaded on the channel and a message will be sent by the SecBot saying "Image inappropriate".

### Use Case 3: Report
***On demand report***
> *Steps:*
1) Login slack workspace as ADMIN user
2) Go to the #management channel
2) Send a message "Send the corrupted files report"

> *Output:*
A report will be uploaded to this channel by the SecBot.

***Inappropriate Image Report***
> *Steps:*
1) Login slack workspace as normal user
2) Go to the #general channel
3) Upload an inappropriate image to the channel
4) Login slack workspace as ADMIN user
5) Go to the #management channel

> *Output:*
A report will be uploaded to this channel by the SecBot.

## **Screencast** 
