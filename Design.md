## **Problem Statement**
Slack is now the most popular and fastest growing instant messaging system. It wouldn’t be wrong to call it the operating system for business. Slack lets colleagues communicate in a shorter, smarter and more modern fashion thus replacing email for project collaboration in many organizations. Slack members chat and share information, files and URLs in real time. With this level of content flowing into Slack from users, there is no security or data filtering protection on the content today. The content can be malicious and could end up spreading across your organization in no time. At this time your entire slack can click on it and suddenly everybody is compromised. Furthermore, Slack’s more casual form of communication can lead to the team members including some material that is inappropriate for the workspace. Almost all organizations are committed to providing a positive environment where everyone can be a successful contributor. To that end, it is essential for the HR to dig deep into how the new technologies are being used for communication. Though these rules are there, some people still tend to lose their mind as to where the boundaries lie. People fail to report such incidents because the behavior incurs no injury and may be organizationally sensitive, especially when it concerns the misuse of power by the perpetrator, such as when an employee is bullied by a supervisor. The employee may fear the loss of job and reputation and may remain silent forever. 

## **Bot Description**

## **Use Cases**

Use Case : Check if a file is corrupted
```
1 Preconditions:
Users must have VirusTotal API tokens and bot must be a part of the slack channel for which you need document scanning.
2 Mainflow
User will upload a file [S1], the bot will scan the file for malware[S2]. Bot will warn and remove the file if it is corrupted [S3].
3 Subflows:
[S1] User will upload a file to the slack channel
[S2] Bot will scan file to check if there’s any malware present 
[S3] Bot will report and remove the corrupted file using VirusTotal API
4 Alternate Flows:
[E1] File is not corrupted

```                 
Use case : Check if an image is inappropriate
```
1 Preconditions:
User must have ModerateContent API and bot must be a part of the slack channel
2 Mainflow
User will upload an image [S1], the bot will scan the file to check [S2]. Bot will warn and remove the file if it is corrupted [S3].
3 Subflows:
[S1] User will upload an image to the slack channel
[S2] Bot will scan file to check if the content is inappropriate
[S3] Bot will warn and remove the inappropriate image, using ModerateContent API
4 Alternate Flows:
[E1] Image is appropriate
```


## **Design Sketches**

### **Wireframe**
- Scanning for malware

No malware is detected:
![SE-1](https://media.github.ncsu.edu/user/10647/files/a859d600-e0ab-11e9-9e63-5cc5bbf5074c)

Malware is detected:
![SE-2](https://media.github.ncsu.edu/user/10647/files/adb72080-e0ab-11e9-9738-429ad50fd043)

![SE-3](https://media.github.ncsu.edu/user/10647/files/c0315a00-e0ab-11e9-8b07-be6a53372d43)

- Scanning for inappropriate content 

Image scanned for inappropriate content:
![SE-4](https://media.github.ncsu.edu/user/10647/files/c58ea480-e0ab-11e9-9e90-58611b6cb0f8)

![SE-5](https://media.github.ncsu.edu/user/10647/files/c9bac200-e0ab-11e9-8b5e-51bbea7ad2ae)


### **Storyboard**

<p align="center">
<img src="https://media.github.ncsu.edu/user/12215/files/53b95980-e0b1-11e9-8bf7-f60ccaa1e069" height="600" width="600">
</p>

<p align="center">
<img src="https://media.github.ncsu.edu/user/12215/files/8ca4fe80-e0b0-11e9-8670-e5b1a71a5aa6" height="350" width="600" >
</p>

## **Architecture Design**

<p align="center">
<img width="600" border="5" src="https://media.github.ncsu.edu/user/10694/files/8a40a580-e0ac-11e9-8975-4801efd23818">
</p>

