const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index.js');
const app = express();
const port = 1337;


app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(bodyParser.json());

app.post('/createuser', (req, res) => {
  console.log('Creating new user!');
  db.createUser(req.body.username, req.body.email, req.body.texteditor)
  .then(results => {
    res.sendStatus(200);
    console.log(results);
  })
  .catch(error => {
    res.sendStatus(400);
    console.log(error);
  })
});

app.post('/checkusername', (req, res) => {

  //check if user exists

  //if user exists

  //if user does not exist
    //redirect to signup page
  console.log('Checking if user exists!');
  db.findUser(req.body.email).then(results => {
    if (results.length === 0) {
      res.send(`/signup?email=${req.body.email}`);
    } else {
      res.send(results);  
    }
  });

})

app.listen(port, function() {
  console.log(`Server now listening on port ${port}!`);
})