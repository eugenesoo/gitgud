const mongoose = require('mongoose');
const Promise = require('bluebird');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017', {
  useMongoClient: true
});
const Users = new Schema({
  username: String,
  email: String,
  texteditor: String
});

const User = mongoose.model('User', Users);

const findUser = (email) => {
  return new Promise ((resolve, reject) => {
    User.find({email: email}, (err, docs) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
};

const createUser = (username, email, texteditor) => {
  return new Promise ((resolve, reject) => {
    User.create({username: username, email: email, texteditor: texteditor}, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

module.exports.findUser = findUser;
module.exports.createUser = createUser;