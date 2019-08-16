const { db, CONSTANTS } = require('./info');

exports.findFirst = () => {
  return db.cronContents.findOne({}).lean();
};