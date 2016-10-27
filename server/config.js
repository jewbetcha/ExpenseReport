const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://react:react@ds031257.mlab.com:31257/expense',
  port: process.env.PORT || 8000,
};

export default config;
