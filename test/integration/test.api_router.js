'use strict';

let test = require('ava').test;
let app = require('../../server');
let coupons = require('../../lib/coupons.json');
let request = require('supertest').agent(app.listen());
let coupon_id;

test.cb.serial('api_router:post', t => {
  request
    .post('/coupons')
    .send(coupons[0])
    .end((err, res) => {
      coupon_id = res.body._id;
      t.not(err);
      t.is(res.status, 201);
      t.end();
    });
});

test.cb.serial('api_router:get /', t => {
  request
    .get('/coupons')
    .end((err, res) => {
      t.not(err);
      t.is(res.status, 200)
      t.end();
    });
});

test.cb.serial('api_router:get /:couponId - 200', t => {
  request
    .get(`\/coupons\/${coupon_id}`)
    .end((err, res) => {
      t.not(err);
      t.is(res.status, 200)
      t.is(res.body[0]._id, coupon_id)
      t.end();
    });
});

test.cb.serial('api_router:get /:couponId - 400', t => {
  request
    .get('/coupons/abc')
    .end((err, res) => {
      t.not(err);
      t.is(res.status, 400)
      t.end();
    });
});

test.cb.serial('api_router:get /:couponId - 404', t => {
  request
    .get('/coupons/123456789012345678901234')
    .end((err, res) => {
      t.not(err);
      t.is(res.status, 404)
      t.end();
    });
});

test.cb.serial('api_router:put - 400', t => {
  request
    .put('/coupons/abc')
    .end((err, res) => {
      t.not(err);
      t.is(res.status, 400)
      t.end();
    });
});

test.cb.serial('api_router:put - 404', t => {
  request
    .put('/coupons/123456789012345678901234')
    .end((err, res) => {
      t.not(err);
      t.is(res.status, 404)
      t.end();
    });
});

test.cb.serial('api_router:put - 200', t => {
  request
    .put(`\/coupons\/${coupon_id}`)
    .send({category: 'test'})
    .end((err, res) => {
      t.not(err);
      t.is(res.status, 200)
      t.end();
    });
});

test.cb.serial('api_router:delete /:couponId - 404', t => {
  request
    .delete('/coupons/123456789012345678901234')
    .end((err, res) => {
      t.not(err);
      t.is(res.status, 404)
      t.end();
    });
});

