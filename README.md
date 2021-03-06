<MainGrid>

<HeaderTitle>
  
# Realtime Chat Web Application
<TitleAction href="https://github.com/stefanosAgelastos/chatNodejs" label="Go to github repo" />
  
<TitleAction href="https://chat.stefworks.ml" disabled label="Go to demo" />
</HeaderTitle>

<InfoGrid>

<InfoPaper>

## Description
Exam project for third Semester elective: Full-Stack web development with Node.js and jQuery at KEA.
By **Stefanos Agelastos, June 2018**.

</InfoPaper>

<InfoPaper>
<MyChip label="Fullstack Web Development"/>
<MyChip label="Javascript"/>
<MyChip label="Node.js"/>
<MyChip label="jQuery"/>
<MyChip label="Css"/>
<MyChip label="HTML"/>
<MyChip label="Sockets.io"/>
<MyChip label="Authentication & Authorization"/>
</InfoPaper>

</InfoGrid>

<PanelGrid>
<Panel id="1" heading="About" secondaryHeading="What can this app do?" >

### Features
- Chat room, where users post messages on a common wall.
- System allows users to signup and login.
- Persists encrypted password.
- It makes use of JWT and expiring tokens for user sessions.
- Persists message history.
- Real-time messages using web-sockets.
![Login-SignUp screen](https://raw.githubusercontent.com/stefanosAgelastos/chatNodejs/master/screenshots/login.png)
![Chat screen](https://raw.githubusercontent.com/stefanosAgelastos/chatNodejs/master/screenshots/chat.png)

</Panel>

<Panel id="2" heading="How?" secondaryHeading="What technologies does it use?" >

### Built With  
- [Node.js](https://nodejs.org/en/) javascript Runtime.  
- [Express](https://expressjs.com/) web framework.  
- [socket.io](https://socket.io) real-time bidirectional event-based communication.  
- [Knex.js](http://knexjs.org/) SQL query builder.   
- [objection.js](https://vincit.github.io/objection.js/) object relational mapping for Node.js.  
 
</Panel>

<Panel id="3" heading="For Devs" secondaryHeading="Before you start" >

## Getting Started
 
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites:

You need to have Node.js and NPM installed on your system. To check if you have them installed run these commands in your terminal:

```
node -v
node -v
```
You also need to a local or remote SQL server up and running. To set up one (XAMPP) on your local machine click [here](https://www.apachefriends.org/download.html). Create a database and a user.

</Panel>

<Panel id="4" heading="For Devs" secondaryHeading="Clone and install, the usual" >

### Installing:

Clone the repository
 
```
git clone https://github.com/stefanosAgelastos/chatNodejs.git
cd .\chatNodejs\
 ```

Install dependencies

```
npm i 
``` 
</Panel>
<Panel id="5" heading="For Devs" secondaryHeading="Details about the database setup" >

### Setting up the local database
Now you need to provide the endpoint of your database, database name, and user before starting the app. Go to `database_credentials\local_credentials.js` and copy paste the following lines of code:

```
exports.host = "localhost";
exports.database = "YOUR_DATABASE_NAME";
exports.user = "YOUR_USER_NAME";

/* exports.host = process.env.DB_HOST;
exports.database = process.env.DB_NAME;
exports.user = process.env.DB_USER;
exports.password = process.env.DB_PASSWORD; */
```

The app is now ready to connect to the databse, but before running the app, you need run a few commands on your terminal. These commands will create and run a migration that will set up the tables of your database. The last command will seed the database with some data.

```
npm run create-migration
npm run migrate
npm run seed
```
 
</Panel>
<Panel id="6" heading="For Devs" secondaryHeading="You are ready to go" >

### Run: 

You are ready to start the app, run
```
npm start
```
or run 
```
npm run start-dev
```
for development and hot reloading. The port is printed on the console.
</Panel>

</PanelGrid>


</MainGrid>
