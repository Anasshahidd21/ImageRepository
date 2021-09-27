## Image Repository

- In this challenge, I created an image repository with the following features:
  - user Authentication (Signin/Signup)
  - Guarded Routes - users not signed in can't access anything.
  - Adding single/bulk images to the repository.
  - Updating permissions for the images to be private or public.
  - Deleting single/bulk images.
  - View all public pictures.



## Running instructions
-   Clone the repo
-   cd shopify
-   run the command `npm install`
-   run the command `npm run dev`
-   Wait until the application says `Connected to Database`
-   Run the API on Postman.

## Endpoints with results</h1>
```
POST: http://localhost:3000/signup

body: {
    "username: "anas",
    "password: "test"
}

response: {
  "message": "User created successfully"
}


```

```
POST: http://localhost:3000/login

body: {
    "username: "anas",
    "password: "test"
}

response: {
  "accessToken": "eyJhbGciOiJIUzI1NiJ9.YW5hcw.zn5tj_wVmVKJy0Za3ib52ixMdH0MJODcmQgx6HMtyVY",
  "message": "Successfully Authenticated!"
}

This access token is in response, only for API testing.

```

```
POST: http://localhost:3000/add/

HEADER:
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.YW5hcw.zn5tj_wVmVKJy0Za3ib52ixMdH0MJODcmQgx6HMtyVY

body: {
    "name: "First Image",
    "permission: "PUBLIC"
    "file": SEND IMAGE   <------ The third parameter requires a sendFile i.e. an image
}


response: {
  "url": [
    "https://myshopifybucket.s3.amazonaws.com/image-1632732785700.jpeg"
  ],
  "_id": "615186713c7e27549cb0a159",
  "owner": "anas",
  "name": "First Image",
  "permission": 0,    <---------    0 = PUBLIC     1 = PRIVATE
  "__v": 0
}

```

```
POST: http://localhost:3000/add/all

HEADER:
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.YW5hcw.zn5tj_wVmVKJy0Za3ib52ixMdH0MJODcmQgx6HMtyVY

body: {
    "name: "Multiple Images",
    "permission: "PUBLIC"
    "file": SEND IMAGES   <------ The third parameter requires a sendFile i.e. multiple images, the cap is set to 10 to avoid overflow.
}


response: {
  "imageDB": {
    "url": [
      "https://myshopifybucket.s3.amazonaws.com/image-CPINLWBl91632733638140.jpeg",
      "https://myshopifybucket.s3.amazonaws.com/image-ESjZZcyMc61632733638141.jpeg",
      "https://myshopifybucket.s3.amazonaws.com/image-cqmtREhwT21632733638141.jpeg"
    ],
    "_id": "615189c60fee303e887914e9",
    "owner": "anas",
    "name": "Multiple Images",
    "permission": 0,
    "__v": 0
  },
  "message": "Successfully Posted!"
}

```

```
PUT: http://localhost:3000/add/615189c60fee303e887914e9

HEADER:
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.YW5hcw.zn5tj_wVmVKJy0Za3ib52ixMdH0MJODcmQgx6HMtyVY

body: {
    "permission: "PRIVATE"
}

response: {
  "url": [
    "https://myshopifybucket.s3.amazonaws.com/image-CPINLWBl91632733638140.jpeg",
    "https://myshopifybucket.s3.amazonaws.com/image-ESjZZcyMc61632733638141.jpeg",
    "https://myshopifybucket.s3.amazonaws.com/image-cqmtREhwT21632733638141.jpeg"
  ],
  "_id": "615189c60fee303e887914e9",
  "owner": "anas",
  "name": "Multiple Images",
  "permission": 1,
  "__v": 0
}


In case of an invalid ID, it returns a message saying: "No image associated with this ID"
```

```
Delete: http://localhost:3000/delete/615186713c7e27549cb0a159

HEADER:
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.YW5hcw.zn5tj_wVmVKJy0Za3ib52ixMdH0MJODcmQgx6HMtyVY

response: {
  "image": {
    "url": [
      "https://myshopifybucket.s3.amazonaws.com/image-1632732785700.jpeg"
    ],
    "_id": "615186713c7e27549cb0a159",
    "owner": "anas",
    "name": "First Image",
    "permission": 0,
    "__v": 0
  },
  "message": "Files successfully deleted!"
}

```

```
Delete: http://localhost:3000/delete/all

HEADER:
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.YW5hcw.zn5tj_wVmVKJy0Za3ib52ixMdH0MJODcmQgx6HMtyVY

response: {
  "message": "Deleted all the images from the repository!"
}

It only deletes images which are created by the user!
```

```
GET: http://localhost:3000/get

HEADER:
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.YW5hcw.zn5tj_wVmVKJy0Za3ib52ixMdH0MJODcmQgx6HMtyVY

response: {
  []
}

Gets all the public images
```

## Technology Used 
-   Node
-   Typescript
-   MongoDB
-   S3 buckets.

## Future Improvements 
-   Testing suite
-   More comprehensive features like search.
-   Deploy the app.

## Common code issues
-   Currently the database urls and aws tokens are exposed, it is because of issues with deployment 
-   In an ideal world, I'd have shifted them in process.env files.
