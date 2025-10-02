const whiteListArr = ['http://localhost:5173'];

const options = {
  origin: (requestOrigin, callback) => {
    if (!requestOrigin || whiteListArr.includes(requestOrigin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};
export default options;
