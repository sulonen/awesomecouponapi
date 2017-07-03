'use strict';

let test = require('ava').test;
let app = require('../api_server').listen();
let service = require('../package.json');
let request = require('supertest');

test.cb('Permitted methods', t => {
  request(app)
    .delete('/status')
    .end((err, res) => {
      t.not(res.error, '');
      t.is(res.status, 405);
      t.end();
    });
});

test.cb('Status route', t => {
  request(app)
    .get('/status')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.is(res.body.service, 'awesomecouponapi');
      t.end();
    });
});
