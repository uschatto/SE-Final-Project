# PROCESS

Stories assigned at the beginning of this milestone in github.

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

## SCRUMBAN
The core software process that we used was 'pair programming'. We followed scrumban methodology and tracked our progress. We created 10 stories to be completed by the end of this milestone of which 8 were done in pairs.
After a task was done, we discussed how we did it and if the pair faced any obstacles in their task. A detailed description of our work is given below:

### Iteration 1 : 

#### Niveditha Shankar and Sruthi Kannan
We checked how an image file can be uploaded to ModerateContent API and how their response can be parsed in our bot integration. First we analysed the way ModerateContent API categorises appropriate and inappropriate content before moving on to the implementation. When we tried to implement image scanning, we faced a few issues. We could not get the right public url of the image uploaded in slack. It took a considerable amount of time to figure out the right image url that can be given to ModerateContent. We took the help of the support team of the API for this part. Once this was sorted, we were able to integrate ModerateContent API with our SecBot smoothly. 

Things to note:
- The images marked as inappropriate by out bot might hold adult content or extreme violence and bloodshed.
- The image formats that ModerateContent API (and hence our bot too) accept are "jpeg", "jpg", "png", "bmp", "gif", "webp".

(Ramandeep Kaur and Udita)

### Iteration 2 : 

(Niveditha Shankar and Sruthi Kannan)

(Ramandeep Kaur and Udita)
