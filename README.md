## Simple Chat Webapp

#### June, 2018
### [Go to github repo](https://github.com/stefanosAgelastos/chatNodejs) or ~~[Open app](https://chat.stefworks.ml)~~
## About the project

Exam project for third Semester **elective: Full-Stack web development with Node.js and jQuery** at KEA.

## Built With

 - [Node.js](https://nodejs.org/en/) javascript Runtime
 - [Express](https://expressjs.com/) web framework
 - [socket.io](https://socket.io) real-time bidirectional event-based communication
 - [Knex.js](http://knexjs.org/) SQL query builder
 - [objection.js](https://vincit.github.io/objection.js/) object relational mapping for Node.js
 - ~~Docker compose containerization~~
 
 
## Getting Started
 
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need to have Node.js and NPM installed on your system. To check if you have them installed run these commands in your terminal:

```
node -v
node -v
```
You also need to a local or remote SQL server up and running. To set up one (XAMPP) on your local machine click [here](https://www.apachefriends.org/download.html). Create a database and a user.

### Installing

Clone the repository
 
```
git clone https://github.com/stefanosAgelastos/chatNodejs.git
cd .\chatNodejs\
 ```

Install dependencies

```
npm i 
```
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

You are ready to start the app, run
```
npm start
```
or run 
```
npm run start-dev
```
for development and hot reloading. The port is printed on the console.

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
