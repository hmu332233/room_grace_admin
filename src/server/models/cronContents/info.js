const mongoose = require('mongoose');

const CONSTANTS = {
};

const schema = mongoose.Schema({
  userId: { 
    type: String,
  },
  userPw: { 
    type: String,
  },
  title: { 
    type: String,
  },
  contents: { 
    type: String,
  },
});

const model = mongoose.model('cronContent', schema);

module.exports = {
  db: { cronContents: model },
  CONSTANTS
};