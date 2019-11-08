# PROCESS

## SCRUMBAN

<p align="justify">Scrumban methodology was followed to track the team's progress. 10 stories were created to be completed by the end of this milestone of which 8 were done in pairs. Tasks were delegated equally among the team members. The kanban board was continously updated and the tasks were moved from - TO DO, IN PROGRESS and DONE. Another category called REVIEW was added and tasks which were a bit difficult to finish were moved to this category. After a task was completed, we discussed how the pair implemented it, if the pair faced any obstacles in their task and what is to be done next by the pair. The kanban board gave us a clear picture of what each member had to do. The structured planning helped us complete the tasks efficiently.Stories assigned at the beginning of this milestone in GitHub.</p>

### <a name="1st Iteration"></a> 1st Iteration

| Story   | Item/Status   |  Issues/Tasks
| ------------- | ------------  |  ------------
|  Analyzing input message and calling appropriate usecase  | Completed | [Story Link](https://github.ncsu.edu/csc510-fall2019/CSC510-8/projects/1#card-14644)
|  Moderate Content API Integration   | Completed | [Story Link](https://github.ncsu.edu/csc510-fall2019/CSC510-8/projects/1#card-14630)
|  Image Scanning for Inappropriate Content    | Completed | [Story Link](https://github.ncsu.edu/csc510-fall2019/CSC510-8/projects/1#card-14355)
|  VirusTotal API Integration    | Incomplete | [Story Link](https://github.ncsu.edu/csc510-fall2019/CSC510-8/projects/1#card-14327)


### <a name="2nd Iteration"></a> 2nd Iteration

| Story   | Item/Status   |  Issues/Tasks
| ------------- | ------------  |  ------------
|  VirusTotal API Integration    | Completed | [Story Link](https://github.ncsu.edu/csc510-fall2019/CSC510-8/projects/1#card-14327)
|  Implement file Scanning  | Completed | [Story Link](https://github.ncsu.edu/csc510-fall2019/CSC510-8/projects/1#card-14351)
|  Logging the data (Database Integration)   | Completed | [Story Link](https://github.ncsu.edu/csc510-fall2019/CSC510-8/projects/1#card-14633)
|  Send Email to HR   | Completed | [Story Link](https://github.ncsu.edu/csc510-fall2019/CSC510-8/projects/1#card-14640)
|  Send Email to IT team   | Completed | [Story Link](https://github.ncsu.edu/csc510-fall2019/CSC510-8/projects/1#card-14643)
|  Archive the report file after sending an email   | Completed | [Story Link](https://github.ncsu.edu/csc510-fall2019/CSC510-8/projects/1#card-14637)
|  Testing the working of file/image scanning   | Completed | [Story Link](https://github.ncsu.edu/csc510-fall2019/CSC510-8/projects/1#card-14646)


A detailed description of our work is given below:

### Iteration 1 : 

#### Niveditha Shankar and Sruthi Kannan
<p align="justify">We checked how an image file can be uploaded to ModerateContent API and how their response can be parsed in our bot integration. First, we analysed the way ModerateContent API categorises appropriate and inappropriate content before moving on to the implementation. When we tried to implement image scanning, we faced a few issues. We could not get the right public URL of the image uploaded in slack. It took a considerable amount of time to figure out the right image URL that can be given to ModerateContent. We took the help of the support team of the API for this part. Once this was sorted, we were able to integrate ModerateContent API with our SecBot smoothly.</p>

Things to note:
- The images marked as inappropriate by our bot might hold adult content or extreme violence and bloodshed.
- The image formats that ModerateContent API (and hence our bot too) accept are "jpeg", "jpg", "png", "bmp", "gif", "webp".

#### Ramandeep Kaur and Udita Chattopadhyay
<p align="justify">Our end goal for this iteration was to come up with a way to detect virus/malware in the file uploads to the Slack channel. We came across VirusTotal API and started testing the URLs of the file uploads. It took us some time to figure out the incapabilities of this API to detect malware in the URL comprising of a virus infected file. The issue here was the downloaded file might be flagged by the antivirus signatures but the corresponding URL scanner might still have no knowledge that a given URL is distributing such file. We confirmed the same with the support team of the API over email. We decided on finishing the VirusTotal API integration in this iteration however because of the above mentioned issue we moved the story to Review. Then we came across another API called CloudMersive which serves the same purpose of detecting virus in the download URL of the file.</p>


### Iteration 2 : 

#### Niveditha Shankar and Sruthi Kannan
<p align="justify">In the second iteration, we sent emails to the HR and IT team, depending on the usecase. For this, we used node-mailer  and nodemailer-smtp-transport modules. If an inappropriate image was detected, the name of the person who posted the image is retrieved and an email is sent to the HR team immediately. If a corrupted file or image is detected and number of such files exceeds the threshold set, a report consisting of the name of the person who posted such files and the respective file names are sent via email to the IT team. This part was straightforward and we did not face any issues.</p>

#### Ramandeep Kaur and Udita Chattopadhyay
<p align="justify">In this iteration we decided to go ahead with CloudMersive API for virus/malware detection purpose. We managed to integrate it with our Slack platform and were able to parse the response given by the API to flag a file or an image as virus/malware infected or not. On detecting the presence of virus in the file or an image we delete the file from the Slack channel. Our final use case was reporting to the HR/IT department regarding the inappropriate content or the malware file uploads on the Slack channel. This involved maintaining a record of the wrongdoers. We hosted a mySql server for this purpose and logged all records in the database. This was used to create and send reports to the concerned recipients and also clear the database on reaching a threshold level.</p>

A screenshot of the completed tasks is attached below:

![Screenshot from 2019-11-07 22-50-37](https://media.github.ncsu.edu/user/10647/files/14eae900-01b1-11ea-8438-95a14e854a14)

**PAIR PROGRAMMING:**

<p align="justify">The core software process that we used was 'pair programming'. Both the pairs took turns to be the driver and the observer.
From our experience of pair programming, we found some pros and cons.</p>

**PROS:**

- Easier to find a solution for the given problem
- Took considerably less amount of time to finish a task as it was easier to debug when two people are involved

**CONS:**

- Since most of the tasks involved pair programming, it was essential that both of them were free at the same time.

**SINGLE CODE BASE:**

The corollary software process that we used was 'single code base'. We divided the deliverables in terms on four different functionalities namely:
- Integrating CloudMersive API to detect malware
- Integrating ModerateContent API to detect inappropriate content
- Integrating MySql server for logging records of the wrongdoers
- Integration Gmail API for sending emails to HR/IT department

All of the above tasks needed independent work and attention. Therefore we decided on committing all our code changes to the master  branch itself therefore maintaining a single code base.
