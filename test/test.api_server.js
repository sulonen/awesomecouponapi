'use strict';

let test = require('ava').test;
let app = require('../api_server').listen();
let service = require('../package.json');
let request = require('supertest');

test.cb('api_server:permitted methods', t => {
  request(app)
    .delete('/status')
    .end((err, res) => {
      t.not(res.error, '');
      t.is(res.status, 405);
      t.end();
    });
});

test.cb('api_server:status route', t => {
  request(app)
    .get('/status')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.is(res.body.service, 'awesomecouponapi');
      t.end();
    });
});
