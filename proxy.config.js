const proxy = [
  {
    context: '/api',
    target: 'http://localhost:8080'//,
    //pathRewrite: {'^/api' : ''}
  },
  {
    context: '/oauth',
    target: 'http://localhost:8080'//,
    //pathRewrite: {'^/api' : ''}
  }
];
  module.exports = proxy;