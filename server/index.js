const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index.js');
const app = express();
const port = 1337;

app.use((req, res, next) => {
  console.log(`now serving ${req.url}!`);
  next();
})

app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/users', (req, res) => {
  db.findUser(req.url.slice(13)).then(results => {
    console.log(results);
    res.send(results);
  }).catch(err => console.log(err));
});

app.post('/createuser', (req, res) => {
  console.log('Creating new user!');
  db.createUser(req.body.username, req.body.email, req.body.texteditor)
  .then(results => {
    res.send(`/user?email=${req.body.email}`);
  })
  .catch(error => {
    res.send(`/signup?error=emailexists`);
    console.log(error);
  })
});

app.post('/checkusername', (req, res) => {
  console.log('Checking if user exists!');
  db.findUser(req.body.email).then(results => {
    console.log(results);
    if (results.length === 0) {
      res.send(`/signup?email=${req.body.email}`);
    } else {
      res.send(`/user?email=${req.body.email}`);  
    }
  });
})

app.listen(port, function() {
  console.log(`Server now listening on port ${port}!`);
})