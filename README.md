# NodeJS Authentication App

## Abstract

The NodeJs authentication app is the NodeJs-based authentication utility prepared to be used in any application as an authentication model. The normal and OAUTH (Google) both are implemented in this project.
The OTP-based password reset for the *Forget Password* Functionality is implemented.
More details with screenshots is given in the following sections. 

## AWS Hosted Link

I have deployed this project in an AWS Linux machine. The hosted Link is given below. 

**AWS Hosted Link:** http://ec2-13-53-168-150.eu-north-1.compute.amazonaws.com:3001/

Kindly note: If above link is not working then might be I terminate server due to AWS resource limit.
The reason behind doing this is I am using the Free tier version of AWS hence, to stay within the limit I will remove the deployment of the previous project. But all the screenshots from the Deployment are added below.

## Technology Used:

1. NodeJs
2. Passport JS
3. EJS
4. Express
5. MongoDB
6. Mongoose
7. HTML
8. CSS
9. Vanilla Javascript
10. AWS (for hosting)
11. Nodemailer


## Explanation

This is NodeJs based authentication system. In this system, the user can get authenticated either via registering to the application itself or by using OAUTH Google authentication system.
Once the user has performed the login we have given the feature to Reset the password as well. There is one more feature called Forget Password. For this feature the user will get OTP on his email id.
OTP-based verification will then lead to the reset of forgotten passwords.

The backend code is implemented using NodeJs, Mongoose, MongoDB, and other required technologies.
The Frontend code is implemented using HTML, EJS, CSS, Vanilla JavaScript, and Bootstrap.

## Features:

**Home Page and Sign-In Interface**

![image](https://github.com/Ninad100/NodeJs-Authentication/assets/63588506/823b2188-398a-4cd4-bae8-1fb2254e14e2)

![image](https://github.com/Ninad100/NodeJs-Authentication/assets/63588506/cf76ab73-d660-45ad-b93e-f3132f91493e)



**Sign UP**

![image](https://github.com/Ninad100/NodeJs-Authentication/assets/63588506/ae437e4f-1eb8-4b1a-94b2-ab27110e4a44)

**Forget Password**

![image](https://github.com/Ninad100/NodeJs-Authentication/assets/63588506/0b4c75c9-25d8-4ed6-a6f6-4321b2d9793d)

**After Clicking on Generate OTP**
![image](https://github.com/Ninad100/NodeJs-Authentication/assets/63588506/ae4c9ef1-b1e2-4bf1-8653-768a297dba03)

**OTP Received in Email ID**
![image](https://github.com/Ninad100/NodeJs-Authentication/assets/63588506/d3b852c3-b00c-456c-9b6e-5a0406d1ac54)



**After Entering OTP**
![image](https://github.com/Ninad100/NodeJs-Authentication/assets/63588506/27dbcb17-5d7c-4c48-a1c9-67720c3b3f1d)

**Reseting the Forget Password**
![image](https://github.com/Ninad100/NodeJs-Authentication/assets/63588506/17157d83-b69d-4001-9260-4fc7f1ce473d)


**Successful Login**
![image](https://github.com/Ninad100/NodeJs-Authentication/assets/63588506/3e03e3e8-e5d2-44ee-8360-cf838567ae08)

**Reset Password**
![image](https://github.com/Ninad100/NodeJs-Authentication/assets/63588506/920ed24e-121a-4006-9829-328471f583dd)

![image](https://github.com/Ninad100/NodeJs-Authentication/assets/63588506/2d689cb0-7b7e-4a2e-9840-6bd28a2de596)

## Google Authentication

Click on Google to do Google Login:
![image](https://github.com/Ninad100/NodeJs-Authentication/assets/63588506/6428e998-5ba5-4c7c-8816-eafba61000f5)

![image](https://github.com/Ninad100/NodeJs-Authentication/assets/63588506/8586aa04-42ec-4f9f-842a-34a69a8197b1)

![image](https://github.com/Ninad100/NodeJs-Authentication/assets/63588506/82c0fc2a-aad5-4e2f-9aff-c45ef7e28530)


In this way google authentication successfully implemented.

## Setup
To run this project
- Clone repository to your system
- run **npm i** to install all dependencies
- run **server.js** to run the application
- Ensure to have your own DB URL and other secrets to use this properly.











