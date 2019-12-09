# REPORT

## PROBLEM SOLVED BY OUR BOT
Slack is now the most popular and fastest growing instant messaging system. It wouldn’t be wrong to call it the operating system for
business. Slack lets colleagues communicate in a shorter, smarter and more modern fashion thus replacing email for project collaboration
in many organizations. Slack members chat and share information, files and URLs in real time. With this level of content flowing into
Slack from users, there is no security or data filtering protection on the content today. The content can be malicious and could end up
spreading across your organization in no time. At this time your entire slack can click on it and suddenly everybody is compromised.
Furthermore, Slack’s more casual form of communication can lead to the team members including some material that is inappropriate for
the workspace. Almost all organizations are committed to providing a positive environment where everyone can be a successful contributor.
To that end, it is essential for the HR to dig deep into how the new technologies are being used for communication. Though these rules
are there, some people still tend to lose their mind as to where the boundaries lie. People fail to report such incidents because the
behavior incurs no injury and may be organizationally sensitive, especially when it concerns the misuse of power by the perpetrator,
such as when an employee is bullied by a supervisor. The employee may fear the loss of job and reputation and may remain silent forever.

## PRIMARY FEATURES AND SCREENSHOTS
Every person, team and organization deserves and expects their data to be secure and confidential. Safeguarding this data is a critical
responsibility that we try to achieve via our bot. By automating the identification, remediation, and archiving of all inappropriate and malicious content posted within Slack, SecBot helps an organization to enjoy all the benefits of Slack without worrying about regulatory or security concerns.

### **PRIMARY FEATURES OF OUR BOT**

1) Check if a file is corrupted
 - Whenever a user uploads a file to the Slack channel from the local file system, our bot checks if the file has any virus using     CloudMersiveAPI. If the file has any virus, our bot deletes the file from the Slack channel.
2) Check if an image is inappropriate
 - Whenever a user uploads an image to the Slack channel, our bot checks if the image has any inappropriate content using ModerateContent API. If the image has inappropriate content, our bot deletes the file from the Slack channel.
3) Report to HR and IT team
 - Whenever an inappropriate image is detected and deleted from the Slack channel, our bot sends a complaint to the HR team via email. 
 - When number of corrupted files reaches a certain threshold, our bot sends an email, consisting of the username and the file uploaded by that user, to the IT team reporting such incidents.

### SCREENSHOTS

* Use Case 1: File/Image is corrupted or not

After uploading normal file
![NORAML 1](https://media.github.ncsu.edu/user/12215/files/19ecd200-1aa8-11ea-8d8f-1eac6b326ff1)
<br>
After uploading corrupted file
![Corrupted 1](https://media.github.ncsu.edu/user/12215/files/a26b7280-1aa8-11ea-82bc-26ca68c284a1)

<br>

* Use Case 2: Image is inappropriate

After uploading normal image
![NORMAL IMAGE 2](https://media.github.ncsu.edu/user/12215/files/ea8a9500-1aa8-11ea-812a-2d3dfb3a7097)
<br>

After uploading inappropriate image
![INAPP IMAGE 2](https://media.github.ncsu.edu/user/12215/files/f7a78400-1aa8-11ea-8306-9eef98ec21af)

<br>

* Use Case 3: Reporting

For Corrupted file
![IMAGE EMAIL](https://media.github.ncsu.edu/user/12215/files/2aea1300-1aa9-11ea-99ef-65962e374a54)

<br>

For Inapproriate Image
![INAPPROPRIATE](https://media.github.ncsu.edu/user/12215/files/33dae480-1aa9-11ea-8502-68171a0aa4bd)

## Your reflection on the development process and project.


## LIMITATIONS AND FUTURE WORK
The following are some of the features that can be added to out bot:

1) Currently, our bot takes care of files uploaded to the slack channel from local system. In the future, it could be made to analyse files uploaded from Google Drive/DropBox.
 
2) As we are using API's that are free, our bot cannot analyse images that are more than 5MB. To solve this, either a paid verison of the API can be used or a custom algorithm can be written to analyse image content.

3) When an inappropriate image is posted, our bot deletes the image and sends an email to the HR with the uploader's name only. The image is not attached as proof in the email. To solve this, images marked inapproprite can be backed up in the database. When an email is sent to the HR, the image can be inlcuded along with it. 



