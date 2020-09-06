const dotenv = require('dotenv');
const { resolve }  = require('path');
const { environments } = require('./constants');

const environmentSetup = () => {
  if (process.env.NODE_ENV) {
    console.log('process.env.NODE_ENV ', process.env.NODE_ENV );
    const path = process.env.NODE_ENV === environments.production ? './.env.production' : './.env.development';
    dotenv.config({ path });
  }
 
};

module.exports = environmentSetup;
