## Code Challenge
Build Awesome Coupons API that can Create/Read/Update/Delete coupon data.

### Awesome Coupons API Specification

### /coupons GET

#### Get all coupons within the system
```
GET /coupons
GET /coupons?state=valid
GET /coupons?state=invalid
```
state param is used to filter out coupons that are valid (not expired) or invalid (expired)

**Response**

- Return HTTP status 200 with a payload of the coupons list. The content type is "application/json".
- If no coupons exist, return HTTP status 200 with an empty array.
- If server error, return HTTP status 500 with a reason payload.
- Otherwise, return the appropriate standard HTTP status.

**Examples**

Input:
```
curl -k http://localhost:3600/coupons
```

Output:
returns 200 OK

```
[
  {
    "id": 1,
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
    "id" : 2,
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

### /coupons/:couponId  GET/

#### Getting a specific coupon

```
GET /coupons/:couponId
```

**Response**

- Return HTTP status 200 with a payload of the requested coupon. The content type is "application/json".
- If invalid coupon ID, return HTTP status 400.
- If non exist coupon ID, return HTTP status 404.
- If server error, return HTTP status 500 with a reason payload.
- Otherwise, return the appropriate standard HTTP status.

**Examples**

Input:
```
curl -k  http://localhost:3600/coupons/2
```
Output:
returns 200 OK

```
{
  "id" : 2,
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
### Create a specific coupon
```
POST /coupons with {:data} like

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

- Return HTTP status 201. The content type is "application/json".
- If invalid post data, return HTTP status 400.
- If no or invalid content type header, return HTTP status 415.
- If server error, return HTTP status 500 with a reason payload.
- Otherwise, return the appropriate standard HTTP status.

**Examples**

Input:
```
curl -ik  -H "Content-Type: application/json" http://localhost:3600/coupons -X POST -d '
{"category":"Coupons & Special Offers","couponcode":"60 31261","description":"Offer limited to in-store purchase only.","merchant":"Super Sporting Goods","title":"20% Off 2 Regular-Priced Items and/or 10% Off 2 Sale-Priced Items","store":{"lat":47.66001,"long":-122.31313,"city":"Seattle","phone":"547-2445","state":"Wa","street":"4315 UNIVERSITY WAY N.E.","zip":"98105"},"expire_at":"2016-08-05T08:40:51.620Z","published_at":"2016-03-05T08:40:51.620Z"}'
```

Output:
returns 201 Created & set location response with /coupons/new_id.
```
{"id": 7}
```

### Update a specific coupon
```
PUT /coupons with {:data} like

{
  "couponcode": "UPDATED_COUPON"
}

```

**Response**

- Return HTTP status 200 with a payload of specific coupon.
The content type is "application/json".
- If invalid coupon ID or invalid payload, return HTTP status 400.
- If non exist coupon ID, return HTTP status 404.
- If no or invalid content type header, return HTTP status 415.
- If server error, return HTTP status 500 with a reason payload.
- Otherwise, return the appropriate standard HTTP status.

**Examples**

Input:
```
curl -k  -H "Content-Type: application/json"
http://localhost:3600/coupons/1 -X PUT  -d '{"couponcode": "UPDATED_COUPON"}'
```

Output:
returns 200 OK

```
{
  "id": 2;
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
curl -k  -X DELETE http://localhost:3600/coupons/1
```
Output:
returns 204 No Content

#### Things we are looking for

- Clear, simple code
- Explanatory comments for beginners
- Consistent Naming Conventions

#### Deliverables

- Please send us back a link to a git repo with the completed code challenge.
- Include a README.md file in your repo with a link to your application deployed on Heroku or Digital Ocean.
