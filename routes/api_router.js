'use strict';

const MONGO_DB = process.env.MONGO_DB || 'mongodb://localhost/awesomecouponapi';
const mongoose = require('mongoose');
const Coupon = require('../models/coupon_model');
const qs = require('querystring');

mongoose.connect(MONGO_DB);
let router = new (require('koa-router'))({prefix: '/coupons'});

module.exports.router = router
  .get('/', async (ctx) => {
    let params = qs.parse(ctx.request.querystring);
    
    if (Object.keys(params).length === 0) { 
      ctx.body = 'All coupons';
    }
    if (params.state) {
      if (params.state == 'valid') {
        ctx.body = 'Valid coupons';
      } else if (params.state == 'invalid') {
        ctx.body = 'Invalid coupons';
      } else {
        ctx.body = 'Invalid parameter';
      }
    }
  })
  .get('/:couponId', async (ctx) => {
    ctx.body = ctx.params.couponId;  
  })
  .post('/', async (ctx) => {
    let newCoupon = new Coupon(ctx.request.body);
    await newCoupon.save((err, res) => {
      if (err) {
        console.error(err);
        ctx.body = err;
      }
      ctx.body = 'New coupon added'; 
    });
  })
  .put('/:couponId', async (ctx) => {
    // update coupon
    ctx.body = ctx.params.couponId;  
  })
  .delete('/:couponId', async (ctx) => {
    // delete coupon
    ctx.body = ctx.params.couponId;
  });

