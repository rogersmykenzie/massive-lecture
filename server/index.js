const express = require ('express');
const massive = require('massive');
require('dotenv').config(); //dotenv setup
const controller = require('./controller');

const app = express(); //does server setup.

app.use(express.json()); //gives us access to req.body

massive(process.env.CONNECTION_STRING) //our connection string to connect massive to the database
.then(dbInstance => {
    app.set('db', dbInstance); //saves instance of database
    console.log('Database Connected :)'); //lets us know the database was connected
}).catch(e => console.log(e));


app.post('/api/person', controller.addPerson)
app.get('/api/person/:name', controller.getPersonByName)


app.listen(process.env.SERVER_PORT, () => console.log('Listening on Port ' + process.env.SERVER_PORT)) //runs the server on the given port