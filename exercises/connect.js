const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// const connect = (url) => Promise.reject();

const connect = (url) => {
  return mongoose.connect(url, {
    poolSize: 10,
    bufferMaxEntries: 0,
    reconnectTries: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connect;
