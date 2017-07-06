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
      try {
        ctx.body = await Coupon.find({});
      } catch (err) {
        ctx.status = 500;
        ctx.body = err.stack;
        console.error(err);
      }
    }
    if (params.state) {
      let now = Date.now();
      if (params.state === 'valid') {
        ctx.body = await Coupon.find({$where: 'Date.parse(this.expire_at) > ' + now});
      } else if (params.state === 'invalid') {
        ctx.body = await Coupon.find({$where: 'Date.parse(this.expire_at) <= ' + now});
      } else {
        ctx.status = 400;
        ctx.body = 'Invalid parameter';
      }
    }
  })
  .get('/:couponId', async (ctx) => {
    try {
      if (ctx.params.couponId.length !== 24) {
        ctx.status = 400;
        ctx.body = 'Invalid parameter';
      } else {
        let result = await Coupon.find({_id: ctx.params.couponId});
        console.log(result);
        if (typeof result[0] === 'undefined') ctx.status = 404;
        ctx.body = result;
      }
    } catch (err) {
      ctx.status = 500;
      ctx.body = err.stack;
      console.error(err);
    }
  })
  .post('/', async (ctx) => {
    let newCoupon = new Coupon(ctx.request.body);
    try {
      await newCoupon.save();
      ctx.body = newCoupon;
    } catch (err) {
      ctx.status = 500;
      ctx.body = err.stack;
      console.error(err);
    }
  })
  .put('/:couponId', async (ctx) => {
     try {
    //   If invalid coupon ID or invalid payload, return HTTP status 400.
    //   If non exist coupon ID, return HTTP status 404.
    //   If no or invalid content type header, return HTTP status 415.
    //   If server error, return HTTP status 500 with a reason payload.
      ctx.body = await Coupon.findByIdAndUpdate(ctx.params.couponId, ctx.request.body, {new: true});
      ctx.status = 200;
    } catch (err) {
      ctx.status = 500;
      ctx.body = err.stack;
      console.error(err);
    }
  })
  .delete('/:couponId', async (ctx) => {
    // delete coupon
    ctx.body = ctx.params.couponId;
  });

