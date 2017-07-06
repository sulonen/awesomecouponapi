'use strict';

let test = require('ava').test;
let app = require('../../server');
let service = require('../../package.json');
let request = require('supertest').agent(app.listen());

test.cb('server:permitted methods', t => {
  request
    .delete('/status')
    .end((err, res) => {
      t.not(res.error, '');
      t.is(res.status, 405);
      t.end();
    });
});

test.cb('server:status route', t => {
  request
    .get('/status')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.is(res.body.service, 'awesomecouponapi');
      t.end();
    });
});

