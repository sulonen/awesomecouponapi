'use strict';

let test = require('ava').test;
let app = require('../../server');
let coupons = require('../../lib/coupons.json');
let request = require('supertest');

test.cb.serial('api_router:post', t => {
  request
    .post('/coupons')
    .send(coupons[0])
    .set('Accept', 'application/json')
    .end((err, res) => {
      t.is(err, '');
      t.is(res.body.service, 'awesomecouponapi');
      t.end();
    });
});



