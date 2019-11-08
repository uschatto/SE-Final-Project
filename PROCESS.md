# PROCESS

## SCRUMBAN

Scrumban methodology was followed to track the team's progress. 10 stories were created to be completed by the end of this milestone of which 8 were done in pairs. Tasks were delegated equally among the team members. The kanban board was continously updated and the tasks were moved from - TO DO, IN PROGRESS and DONE. Another category called REVIEW was added and tasks which were a bit difficult to finish were moved to this category. After a task was completed, we discussed how the pair implemented it, if the pair faced any obstacles in their task and what is to be done next by the pair. The kanban board gave us a clear picture of what each member had to do. The structured planning helped us complete the tasks efficiently.
Stories assigned at the beginning of this milestone in GitHub.

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
|  Implement file Scanning  | Completed | [Story Link](https://github.ncsu.edu/csc510-fall2019/CSC510-8/projects/1#card-14351)
|  Logging the data (Database Integration)   | Completed | [Story Link](https://github.ncsu.edu/csc510-fall2019/CSC510-8/projects/1#card-14633)
|  Send Email to HR   | Completed | [Story Link](https://github.ncsu.edu/csc510-fall2019/CSC510-8/projects/1#card-14640)
|  Send Email to IT team   | Completed | [Story Link](https://github.ncsu.edu/csc510-fall2019/CSC510-8/projects/1#card-14643)
|  Archive the report file after sending an email   | Completed | [Story Link](https://github.ncsu.edu/csc510-fall2019/CSC510-8/projects/1#card-14637)
|  Testing the working of file/image scanning   | Completed | [Story Link](https://github.ncsu.edu/csc510-fall2019/CSC510-8/projects/1#card-14646)


A detailed description of our work is given below:

### Iteration 1 : 

#### Niveditha Shankar and Sruthi Kannan
We checked how an image file can be uploaded to ModerateContent API and how their response can be parsed in our bot integration. First, we analysed the way ModerateContent API categorises appropriate and inappropriate content before moving on to the implementation. When we tried to implement image scanning, we faced a few issues. We could not get the right public URL of the image uploaded in slack. It took a considerable amount of time to figure out the right image URL that can be given to ModerateContent. We took the help of the support team of the API for this part. Once this was sorted, we were able to integrate ModerateContent API with our SecBot smoothly. 

Things to note:
- The images marked as inappropriate by out bot might hold adult content or extreme violence and bloodshed.
- The image formats that ModerateContent API (and hence our bot too) accept are "jpeg", "jpg", "png", "bmp", "gif", "webp".

#### Ramandeep Kaur and Udita


### Iteration 2 : 

#### Niveditha Shankar and Sruthi Kannan
In the second iteration, we sent emails to the HR and IT team, depending on the usecase. For this, we used node-mailer  and nodemailer-smtp-transport modules. If an inappropriate image was detected, the name of the person who posted the image is retrieved and an email is sent to the HR team immediately. If a corrupted file or image is detected and number of such files exceeds the threshold set, a report consisting of the name of the person who posted such files and the respective file names are sent via email to the IT team. This part was straightforward and we did not face any issues.

#### Ramandeep Kaur and Udita


A screenshot of the completed tasks is attached below:

![Screenshot from 2019-11-07 22-50-37](https://media.github.ncsu.edu/user/10647/files/14eae900-01b1-11ea-8438-95a14e854a14)

**PAIR PROGRAMMING:**

The core software process that we used was 'pair programming'. Both the pairs took turns to be the driver and the observer.
From our experience of pair programming, we found some pros and cons.

**PROS:**

- Easier to find a solution for the given problem
- Took considerably less amount of time to finish a task as it was easier to debug when two people are involved

**CONS:**

- Since most of the tasks involved pair programming, it was essential that both of them were free at the same time.
