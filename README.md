# Awesome Coupon API

## Observations

* Node 8 will be LTS soon - I'm anticipating that by requiring Node 7.x
* If Node 7.x is problematic, I've found transpilation on deployment to be a
  practical technique
* I used MongoDB for a variety of reasons; I'm aware of several reasons not to,
  and would recommend a review of the persistence method prior to moving this
  application to a production environment 
* Given that I'm using Mongoose as an ORM, I decided not to abstract data layer
  functionality away from application routing
* Speaking of ORMs, I wanted to discuss the use of an ORM with respect to
  application security in addition to other reasons
* Along similar lines, I decided not to use integers for object keys; my
  implementation uses MongoDB native autonumbering instead of direct ID
  assignment

## Requirements

- Node version 7.6.0 or better - or consider running with the `--harmony` flag
- MongoDB version 3.4.5 or better

## Setup/Run

1. After cloning the repository, `cd` into the directory and run `npm install`
2. Start a datababase instance with `npm run startdb`
3. To run the application, run `npm start`
4. To run associated tests, run `npm test`

## REST routes

### GET /coupons

#### Retrieve all coupons
```
GET /coupons
GET /coupons?state=valid
GET /coupons?state=invalid
```
state param is use for filtering coupons that are valid (not expired) or invalid (expired)

**Response**

- Return HTTP status 200 with a list of coupons
- If no coupons exist, return HTTP status 200 with an empty array.
- If server error, return HTTP status 500 with a reason payload.
- Otherwise, return the appropriate standard HTTP status.

**Examples**

Input:
```
curl -k http://localhost:3000/coupons
```

Output:
returns 200 OK

```
[
  {
    "_id": "595daaa340f2bc3572b3ab4e",
    "category": "Coupons & Special Offers",
    "couponcode": "60 31261",
    "description": "Offer limited to in-store purchase only.",
    "merchant": "Super Sporting Goods",
    "title": "20% Off 2 Regular-Priced Items and/or 10% Off 2 Sale-Priced Items",
    "store": {
      "lat": 47.66001,
      "long": -122.31313,
      "city": "Seattle",
      "phone": "547-2445",
      "state": "Wa",
      "street": "4315 UNIVERSITY WAY N.E.",
      "zip": "98105"
    },
    "expire_at": "2016-08-05T08:40:51.620Z",
    "published_at": "2016-03-05T08:40:51.620Z"
  },
  {
    "_id": "595f08363b58091946ca12e2,
    "category": "Coupons & Special Offers",
    "couponcode": "PETS",
    "description": "Offer limited to in-store purchase only.",
    "merchant": "Pets R Us",
    "title": "30% Off 2 Regular-Priced Items",
    "store": {
      "lat": 47.66001,
      "long": -122.31313,
      "city": "Seattle",
      "phone": "547-2445",
      "state": "Wa",
      "street": "123 Main WAY N.E.",
      "zip": "98105"
    },
    "expire_at": "2016-04-05T08:40:51.620Z",
    "published_at": "2016-03-05T08:40:51.620Z"
  }
]
```

### GET /coupons/:couponId

#### Retrieve a specific coupon

```
GET /coupons/:couponId
```

**Response**

- Return HTTP status 200 with a payload of the requested coupon.
- If invalid coupon ID like "coupons/abc", return HTTP status 400.
- If non exist coupon ID, return HTTP status 404.
- If server error, return HTTP status 500 with a reason payload.
- Otherwise, return the appropriate standard HTTP status.

**Examples**

Input:
```
curl -k  http://localhost:3000/coupons/595f08363b58091946ca12e2
```
Output:
returns 200 OK

```
{
  "_id": "595f08363b58091946ca12e2",
  "category": "Coupons & Special Offers",
  "couponcode": "60 31261",
  "description": "Offer limited to in-store purchase only.",
  "merchant": "Super Sporting Goods",
  "title": "20% Off 2 Regular-Priced Items and/or 10% Off 2 Sale-Priced Items",
  "store": {
    "lat": 47.66001,
    "long": -122.31313,
    "city": "Seattle",
    "phone": "547-2445",
    "state": "Wa",
    "street": "4315 UNIVERSITY WAY N.E.",
    "zip": "98105"
  },
  "expire_at": "2016-08-05T08:40:51.620Z",
  "published_at": "2016-03-05T08:40:51.620Z"
}
```


### POST /coupons

#### Create a coupon
```
POST /coupons
{
  "category": "Coupons & Special Offers",
  "couponcode": "60 31261",
  "description": "Offer limited to in-store purchase only.",
  "merchant": "Super Sporting Goods",
  "title": "20% Off 2 Regular-Priced Items and/or 10% Off 2 Sale-Priced Items",
  "store": {
    "lat": 47.66001,
    "long": -122.31313,
    "city": "Seattle",
    "phone": "547-2445",
    "state": "Wa",
    "street": "4315 UNIVERSITY WAY N.E.",
    "zip": "98105"
  },
  "expire_at": "2016-08-05T08:40:51.620Z",
  "published_at": "2016-03-05T08:40:51.620Z"
}

```

**Response**

- Return HTTP status 201.
- If invalid post data, return HTTP status 400.
- If no or invalid content type header, return HTTP status 415.
- If server error, return HTTP status 500 with a reason payload.
- Otherwise, return the appropriate standard HTTP status.

**Examples**

Input:
```
curl -ik  -H "Content-Type: application/json" http://localhost:3000/coupons -X POST -d '
{
	"category": "Coupons & Special Offers",
	"couponcode": "PETS",
	"description": "Offer limited to in-store purchase only.",
	"merchant": "Coach",
	"title": "Up to 50% OFF select Winter sale items",
	"store": {
		"lat": 47.66001,
		"long": -122.31313,
		"city": "Seattle",
		"phone": "547-2445",
		"state": "Wa",
		"street": "123 Main WAY N.E.",
		"zip": "98105"
	},
	"expire_at": "2016-03-05T08:40:51.620Z",
  "published_at": "2016-03-05T08:40:51.620Z"
}
'
```

Output:
returns 201 Created & set location response with /coupons/new_id.
```
{"_id": "595f08363b58091946ca12e2"}
```

### PUT /coupons/:couponId

#### Update a specific coupon

```
PUT /coupons/:couponId with {:data} like

{
  "couponcode": "UPDATED_COUPON"
}

```

**Response**

- Return HTTP status 200 with a payload of specific coupon.
- If invalid coupon ID or invalid payload, return HTTP status 400.
- If non exist coupon ID, return HTTP status 404.
- If no or invalid content type header, return HTTP status 415.
- If server error, return HTTP status 500 with a reason payload.
- Otherwise, return the appropriate standard HTTP status.

**Examples**

Input:
```
curl -k  -H "Content-Type: application/json"
http://localhost:3000/coupons/595f0b247a74c01a3a31d47b -X PUT  -d '{"couponcode": "UPDATED_COUPON"}'
```

Output:
returns 200 OK

```
{
  "_id": "595daaa340f2bc3572b3ab4e",
  "category": "Coupons & Special Offers",
  "couponcode": "UPDATED_COUPON",
  "description": "Offer limited to in-store purchase only.",
  "merchant": "Super Sporting Goods",
  "title": "20% Off 2 Regular-Priced Items and/or 10% Off 2 Sale-Priced Items",
  "store": {
    "lat": 47.66001,
    "long": -122.31313,
    "city": "Seattle",
    "phone": "547-2445",
    "state": "Wa",
    "street": "4315 UNIVERSITY WAY N.E.",
    "zip": "98105"
  },
  "expire_at": "2016-08-05T08:40:51.620Z",
  "published_at": "2016-03-05T08:40:51.620Z"
}
```

### DELETE /coupons/:couponId
#### Delete a specific coupon

```
DELETE /coupons/:couponId
```

**Response**

- Return HTTP status 204.
- If server error, return HTTP status 500 with a reason payload.
- Otherwise, return the appropriate standard HTTP status.

**Examples**

Input:
```
curl -k  -X DELETE http://localhost:3000/coupons/595f0b247a74c01a3a31d47b
```
Output:
returns 204 No Content
