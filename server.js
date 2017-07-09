'use strict';

let PORT = process.env.PORT || (process.argv[2] || 3000);
PORT = (typeof PORT === 'number') ? PORT : 3000;

const service = require('./package.json');
const app_router = require('koa-router')();
const api_router = require('./routes/api_router').router;
const logger = require('koa-morgan');
const body = require('koa-body');

const app = module.exports = new (require('koa'))();

app_router.get('/status', (ctx) => {
  ctx.status = 200;
  ctx.body = {
    service: service.name,
    version: service.version,
    status: 'up'
  };
});

app.use(logger('dev'));
app.use(body());
app.use(app_router.routes());
app.use(app_router.allowedMethods());
app.use(api_router.routes());
app.use(api_router.allowedMethods());

if (!module.parent) app.listen(PORT);
console.info('Server listening on port ' + PORT);
