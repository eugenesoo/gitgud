const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userDb = require('../database/users.js');
const editorDb = require('../database/editors.js');
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
  userDb.findUser(req.url.slice(13)).then(results => {
    console.log(results);
    res.send(results);
  }).catch(err => console.log(err));
});

app.post('/createuser', (req, res) => {
  console.log('Creating new user!');
  userDb.createUser(req.body.username, req.body.email, req.body.texteditor)
  .then(results => {
    res.send(`/user?email=${req.body.email}`);
  })
  .catch(error => {
    res.send(`error=emailexists`);
    console.log(error);
  })
});

app.post('/checkusername', (req, res) => {
  console.log('Checking if user exists!');
  userDb.findUser(req.body.email).then(results => {
    console.log(results);
    if (results.length === 0) {
      res.send(`/signup?email=${req.body.email}`);
    } else {
      res.send(`/user?email=${req.body.email}`);  
    }
  });
})

app.post('/editor', (req, res) => {

  console.log('Adding editor!');
  editorDb.createEditor(req.body.editorname)
  .then(results => editorDb.getEditors())
  .then(results => {
    res.send(results);
    console.log(results);
  });

})

app.get('/editor', (req, res) => {

  editorDb.getEditors()
  .then(results => res.send(results));

})

app.post('/feature', (req, res) => {
  console.log(req.body);
  editorDb.createFeature(req.body.featurename, req.body.featuretype, req.body.usage1, req.body.usage2, req.body.usage3, req.body.editor)
  .then(results => {
    res.sendStatus(200);
  })
})

app.get('/feature', (req, res) => {
  console.log(req.url.slice(16));
  editorDb.getFeatures(req.url.slice(16))
  .then(results => res.send(results.features));

})

app.listen(port, function() {
  console.log(`Server now listening on port ${port}!`);
})