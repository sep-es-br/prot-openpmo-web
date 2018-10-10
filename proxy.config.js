const proxy = [
    {
      context: '/api',
      target: 'http://10.179.7.1:8080'//,
      //pathRewrite: {'^/api' : ''}
    }
  ];
  module.exports = proxy;