const environments = {
  development: 'development',
  production: 'production',
};

const setDBString = (dataBaseName, dataBasePassword, dataBaseuser, cluster) =>
  `mongodb+srv://${dataBaseuser}:${dataBasePassword}@${cluster}/${dataBaseName}?retryWrites=true&w=majority`;

const apiVersionPrefix = '/api/v1';

const toDoPrefix = '/todo';

module.exports = {
  environments,
  setDBString,
  apiVersionPrefix,
  toDoPrefix,
};
