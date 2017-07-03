'use strict';

const PORT = process.env.PORT || 3000;
let service = require('./package.json');
let app = module.exports = new (require('koa'))();
let router = require('koa-router')();
let logger = require('koa-morgan');

router.get('/status', async (ctx) => {
  ctx.status = 200;
  ctx.body = await {
    service: service.name,
    version: service.version,
    status: 'up'
  };
});

app.use(logger('dev'));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.info('Server listening on port ' + PORT);
});

