const mongoose = require('mongoose');
const { setDBString } = require('./constants');

const dataBaseConnector = (dataBaseName, dataBaseUser, dataBasePassword, cluster) => {
    const connectionOptions = {
      useNewUrlParser:true,
      useCreateIndex:true,
      useUnifiedTopology:true
  };
  const connectionString = setDBString(dataBaseName, dataBaseUser, dataBasePassword, cluster);
  mongoose.connect(connectionString, connectionOptions);
  
  mongoose.connection.on('open', () => {
    console.log('connected');
  });
  
  mongoose.connection.on('error', error => {
    console.error('Something happened: ', error);
  });
  
};

module.exports = dataBaseConnector;