'use strict';

let test = require('ava').test;
let app = require('../../server');
let request = require('supertest').agent(app.listen());
let sinon = require('sinon');

test.cb('api_router:load', t => {
  request
    .get('/status')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      t.is(res.body.service, 'awesomecouponapi');
      t.end();
    });
});

