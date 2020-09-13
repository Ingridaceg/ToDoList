const whiteList = ['http://localhost:3000','http://localhost:5000'];

const corsOptions= {
  origin: (origin, callback) => {
    if(origin){
      if (whiteList.indexOf(origin) !== -1){
        callback(null, true);
      } else {
        callback(new Error(`This origin is not allowed: ${origin}`));
      }
    } else {
      callback(null, true);
    }
  },
};

module.exports= corsOptions;