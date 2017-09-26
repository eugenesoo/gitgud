const mongoose = require('mongoose');
const Promise = require('bluebird');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017', {
  useMongoClient: true
});

const Features = new Schema({
  featurename: {
   type: String,
   unique: true
  },
  featuretype: String,
  usage1: String,
  usage2: String,
  usage3: String,
  popularity: Number
})

const Feature = mongoose.model('Feature', Features);

const Editors = new Schema({
  editorname: {
    type: String,
    unique: true
  },
  popularity: Number,
  features: [Features]
});

const Editor = mongoose.model('Editor', Editors);

const createFeature = (featurename, featuretype, usage1, usage2, usage3, editor) => {
  return getEditors({editorname: editor}).then(docs => {
    console.log(docs[0]);
    docs[0].features.push({featurename: featurename, featuretype: featuretype, usage1: usage1, usage2: usage2, usage3: usage3, popularity: 0});
    console.log(docs[0]);
    docs[0].save((err) => {
      console.log(err);
    })
  })
};

const createEditor = (editorname) => {
  return new Promise ((resolve, reject) => {
    Editor.create({editorname: editorname, popularity: 0}, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const getEditors = (editor = {}) => {
  return new Promise ((resolve, reject) => {
    Editor.find(editor, (err, docs) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
}

const getFeatures = (editor = {}) => {
  return new Promise ((resolve, reject) => {
    Editor.find({editorname : editor}, (err, docs) => {
      if (err) {
        reject(err);
      } else {
        console.log(docs[0]);
        resolve(docs[0]);
      }
    }).then(docs => {
      return docs[0];
    });
  });
}

const updateFeature = (featureid, popularity, editor) => {
  return getEditors({editorname: editor}).then(docs => {
    var featuretoUpdate = docs[0].features.id(featureid);
    featuretoUpdate.popularity = popularity;
    docs[0].save((err) => {
      if (err) {
        console.log(err);
      } else {
        return featuretoUpdate;
      }
    })
  })
}

module.exports.createFeature = createFeature;
module.exports.createEditor = createEditor;
module.exports.getEditors = getEditors;
module.exports.getFeatures = getFeatures;
module.exports.updateFeature = updateFeature;