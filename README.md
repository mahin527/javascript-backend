### Initialize
```javascript
npm init 
```
## Backend Development

#### Packages and Services
1. [Nodemon](https://www.npmjs.com/package/nodemon)
2. [Prettier](https://www.npmjs.com/package/prettier)
3. [Dotenv](https://www.npmjs.com/package/dotenv)
4. [Mongoose](https://mongoosejs.com/docs/)
5. [Express](https://expressjs.com/en/starter/installing.html)
6. [Cookie parser](https://www.npmjs.com/package/cookie-parser)
7. [Cors](https://www.npmjs.com/package/cors)
8. [Mongoose aggregate paginate v2](https://www.npmjs.com/package/mongoose-aggregate-paginate-v2)
9. [Bcrypt](https://www.npmjs.com/package/bcrypt)
10. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
11. [Multer](https://www.npmjs.com/package/multer)
12. [Cloudinary](https://cloudinary.com/pricing)
13. [fs](https://www.tutorialspoint.com/nodejs/nodejs_file_system.htm)

#### Topics
1. [Mongodb aggregation pipelines](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/)
2. sub pipelines and routes


### [Mongoose](https://mongoosejs.com/docs/) 
[Mongoose](https://mongoosejs.com/docs/) is an Object Data Modeling (ODM) library for MongoDB. Simply put, it acts as a middleman between Node.js and MongoDB, making connecting to databases and managing data much easier and more streamlined.

Below are its main functions in point form:

1. Schema creation
MongoDB is inherently "Schemaless", meaning that data can be stored in any format. But in professional projects, it is important to have a specific structure. Using Mongoose, you can specify that a "User" object must contain a name (String), age (Number), and email.

2. Validation
Mongoose checks the data before saving it to the database to see if it is correct. For example, whether the email format is correct or whether the password is of a certain length.

3. Query simplification (Abstraction)
Mongoose functions (such as User.find(), User.create()) are much more readable and developer-friendly than writing raw MongoDB queries.


### [Express](https://expressjs.com/en/starter/installing.html)

[Express.js](https://expressjs.com/en/starter/installing.html) is the most popular and lightweight Web Framework for Node.js. It is basically a "Minimalist" framework, which can be used to create servers and APIs very quickly and easily.

Why use Express.js? (Key Features)
Routing: It is very easy to handle what response the server will give when sending a request to different URLs (such as /users or /products).

Middleware: This is the life of Express. Middleware is used to perform some work (such as checking whether the user is logged in or not) before the request reaches the server or before the response goes.

HTTP Utility Methods: It becomes much easier to create REST APIs using methods like GET, POST, PUT, DELETE.

Speed: It is built directly on Node.js, so it is very fast and best in terms of performance.


