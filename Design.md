## **Problem Statement**
<p align="justify">Slack is now the most popular and fastest growing instant messaging system. It wouldn’t be wrong to call it the operating system for business. Slack lets colleagues communicate in a shorter, smarter and more modern fashion thus replacing email for project collaboration in many organizations. Slack members chat and share information, files and URLs in real time. With this level of content flowing into Slack from users, there is no security or data filtering protection on the content today. The content can be malicious and could end up spreading across your organization in no time. At this time your entire slack can click on it and suddenly everybody is compromised. Furthermore, Slack’s more casual form of communication can lead to the team members including some material that is inappropriate for the workspace. Almost all organizations are committed to providing a positive environment where everyone can be a successful contributor. To that end, it is essential for the HR to dig deep into how the new technologies are being used for communication. Though these rules are there, some people still tend to lose their mind as to where the boundaries lie. People fail to report such incidents because the behavior incurs no injury and may be organizationally sensitive, especially when it concerns the misuse of power by the perpetrator, such as when an employee is bullied by a supervisor. The employee may fear the loss of job and reputation and may remain silent forever.</p>

## **Bot Description**

<p align="justify">Every person, team and organization deserves and expects their data to be secure and confidential. Safeguarding this data is a critical responsibility that we try to achieve via our bot. Whenever a user uploads a file to the slack channel, SecBot immediately scans the file, using VirusTotal API, to check if it is corrupted. If the file is corrupted, SecBot removes the file from the slack channel. Whenever a user uploads an image to the slack channel, instead of reviewing all the images uploaded by the user manually, the ModerateContent's API flags inappropriate images automatically and returns an appropriate feedback. This feedback, if not good, is reported to the HR.</p>

<p align="justify">It is time consuming and taxing to check every file and image manually for virus and inappropriate content respectively. By automating this task, the file is automatically checked for virus when it's uploaded and this helps in preventing the virus from spreading within the organization. Similarly, automating the task of checking if an image is inappropriate and reporting to HR ensures that such incidents are always brought to light. SecBot is continuously monitoring, auditing, and sharing the audit results with senior management. All findings are then tracked to resolution in a timely manner. By automating the identification, remediation, and archiving of all inappropriate and malicious content posted within Slack, SecBot helps an organization to  enjoy all the benefits of Slack without worrying about regulatory or security concerns.</p>

*Be Assured. Be Secured.*

## **Use Cases**

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
[S3] Bot will send an email to the HR if any inappropriate content was shared on the slack channel.The email will have details of the person sharing such content.
[S4] Bot will also send daily reports to the IT team for the viruses found with the details of the concerned person sending the file whose system might need to be checked.
4 Alternate Flows:
[E1] Image or file uploaded is appropriate
```

## **Design Sketches**

### **Wireframe**
- **Scanning for virus**

No virus is detected:
![SE-1](https://media.github.ncsu.edu/user/10647/files/a859d600-e0ab-11e9-9e63-5cc5bbf5074c)

Virus is detected:
![SE-2](https://media.github.ncsu.edu/user/10647/files/adb72080-e0ab-11e9-9738-429ad50fd043)

![SE-3](https://media.github.ncsu.edu/user/10647/files/c0315a00-e0ab-11e9-8b07-be6a53372d43)

- **Scanning for inappropriate content** 

Image scanned for inappropriate content:
![SE-4](https://media.github.ncsu.edu/user/10647/files/c58ea480-e0ab-11e9-9e90-58611b6cb0f8)

![SE-5](https://media.github.ncsu.edu/user/10647/files/c9bac200-e0ab-11e9-8b5e-51bbea7ad2ae)


### **Storyboard**

<p align="center">
<img src="https://media.github.ncsu.edu/user/12215/files/53b95980-e0b1-11e9-8bf7-f60ccaa1e069" height="600" width="800">
</p>

<p align="center">
<img src="https://media.github.ncsu.edu/user/12215/files/8ca4fe80-e0b0-11e9-8670-e5b1a71a5aa6" height="400" width="800" >
</p>

## **Architecture Design**

<p align="center">
<img width="840" alt="ARCH updated" src="https://media.github.ncsu.edu/user/10694/files/60ce5b00-e13a-11e9-88f4-ccb695b9317e">
</p>

### Components

The architectural components that are involved with SecBot are as follows,

**1) Slack API**

The platform our bot is embedded in is Slack. This is the interface in which the users will be communicating with one another and the bot as well.

**2) VirusTotal API**

This is the API our bot uses to scan the files that are uploaded on Slack. The corrupted files are removed by SecBot.

**3) ModerateContent API**

This API is used to identify images with inappropriate content from adult to violent. Such images are then removed by SecBot.

**4) Gmail API**

This API is used to send emails to the appropriate teams.The daily reports generated after virus scans are sent to the IT team and incidents involving inappropriate images are reported to the HR.

**5) Database**

SecBot needs a database to store the reponses collected from VirusTotal API and Moderate content API. Results collected here are used to generate a daily report. 

### Virus Scanning

<p align="center">
<img width="748" alt="Updated diagram" src="https://media.github.ncsu.edu/user/10694/files/2e246280-e13a-11e9-8261-fc1cbfde40c7">
</p>

### Image content Scanning

<p align="center">
<img width="756" alt="updated!!!" src="https://media.github.ncsu.edu/user/10694/files/db987580-e13c-11e9-8e26-076fc154b9e4">
</p>

### Reporting with Gmail

<p align="center">
<img width="617" alt="Diagram 3" src="https://media.github.ncsu.edu/user/10694/files/5b244580-e139-11e9-8718-ed0f92a551e4">
</p>



## **Architecture Patterns**

**Object-Oriented Pattern**

The bot will take the slack event(file or image shared) as an input, and send the file or image to the relevant API for checking. Polymorphic design helps providing a generic detection interface while delegating the request to relevant API module. It also enables easy addition of more module and tools in future.

**Publish and Subscribe Pattern**

SecBot will scan for virus and inappropriate content whenever a file and an image is uploaded respectively. In our case, Slack notifies SecBot whenever a file or an image is uploaded. Then, SecBot scans the uploaded file and gives a feedback regarding virus or inappropriate content.



