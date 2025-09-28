const whiteListArr = ['http://localhost:5173'];

const options = {
  origin: (requestOrigin, callback) => {
    if (whiteListArr.includes(requestOrigin)) {
      callback(null, true);
    } else {
      callback(err, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

module.exports = options;
