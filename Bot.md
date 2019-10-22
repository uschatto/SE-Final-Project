## **Bot Platform Implementation**
> [Bot Implementation](https://github.ncsu.edu/csc510-fall2019/CSC510-8/blob/master/Milestone2/bot.js)

## **Use Cases Refinement**

## **Mocking Infrastructure**

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

***Alternative Path 2 : Inappropriate Image Report***
> *Steps:*
1) Login slack workspace as ADMIN user
2) Go to the #management channel

> *Output:*
A report will be uploaded to this channel by the SecBot.

### Use Case 3: On demand report
***Happy Path : Requested for report***
> *Steps:*
1) Login slack workspace as ADMIN user
2) Go to the #management channel
2) Send a message "Send the corrupted files report"

> *Output:*
A report will be uploaded to this channel by the SecBot.

## **Screencast** 
