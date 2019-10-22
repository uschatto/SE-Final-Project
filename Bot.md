## **Bot Platform Implementation**
> [Bot Implementation](https://github.ncsu.edu/csc510-fall2019/CSC510-8/blob/master/Milestone2/bot.js)

## **Use Cases Refinement**

## **Mocking Infrastructure**

## **Selenium Testing For Each Use Case**
> [Selenium Testing](https://github.ncsu.edu/csc510-fall2019/CSC510-8/blob/master/Milestone2/selenium/secbot.java)

The SecBot requires integration of the google drive containing files(corrupted,normal and inappropriate) to be used for uploading.The SecBot also needs to invited to the #general channel where the test case will be executed. The following cases are covered in the selenium testing:

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
Image will be not be uploaded on the channel and a message will be sent by the SecBot saying "Image inappropriate".A message will also be sent to the owner of the channel for this inappropriate image.

### Use Case 3: On demand report
***Happy Path : Requested for report***
> *Steps:*
1) Login slack workspace as the owner
2) Request for the report from the SecBot

> *Output:*
A report file will se sent to the user. 







## **Screencast** 
