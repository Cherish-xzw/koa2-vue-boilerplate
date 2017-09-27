require('babel-core/register')({
  presets: [
    ['env', {
      targets: {
        node: true
      }
    }]
  ],
  ignore: /node_modules\/(?!koa-*)/,
});
require('./server/app.js');
