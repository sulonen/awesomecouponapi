'use strict';

const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  category: String,
  couponcode: String,
  description: String,
  merchant: String,
  title: String,
  store: {
    lat: Number,
    long: Number,
    city: String,
    phone: String,
    state: String,
    street: String,
    zip: String
  },
  expire_at: Date,
  published_at: Date
});

module.exports = mongoose.model('Coupon', couponSchema);

