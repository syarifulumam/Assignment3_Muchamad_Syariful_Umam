## Assignment 3 CRUD API
My task is to create a RESTful API, according to the given requirements.

> **Notes:**
> - Start with this boilerplate https://github.com/nabhannaufal/service-boilerplate, remove unused code
> - Add logger in code (error, debug or info)
> - Add Unit test, should be pass `coverageThreshold`
> - Use MYSQL Database
> - Create 2 version api
    - V1 using parameterized sql queries
    - V2 using ORM with [Prisma](https://www.prisma.io/docs/getting-started)
> - Add validation request
> - Add handle response status (200, 400, 500)
> - Create documentation on file README.md
> - Deploy your project
> - Submission
    - Repository [Github](https://github.com/) or [Gitlab](https://gitlab.com/)
    - Postman Collection

## Deployment
Deployment using render.com, [demo](https://assignment3-muchamad-syariful-umam.onrender.com/api/v1/product)

## Stack
The tech stack used in building RESTful API includes:
> - **express**: A fast and minimalist web framework for Node.js, providing a powerful set of features for building web applications and APIs.
> - **dotenv**: This library makes it easier to manage application configuration by using `.env` files to define environment variables, thus separating configuration from source code.
> - **boom**: This library is used to create HTTP-friendly errors in Node.js. Very useful for handling errors in web applications.
> - **joi**: A schema validation library that helps in defining and validating JavaScript object structures, especially useful for user input validation.
> - **mysql2**: A MySQL driver for Node.js that supports Promises and provides an API compatible with `mysql`. It is faster and more efficient than `mysql`.
> - **prisma**: A modern ORM (Object-Relational Mapping) for Node.js and TypeScript that simplifies interaction with databases through a powerful, type-safe query builder.
> - **lodash**: A JavaScript utility library that provides many useful functions for manipulating arrays, objects, and other data types.
> - **fs**: A built-in Node.js module that provides an interface for working with the file system, such as reading, writing, and deleting files.
> - **ioredis**: A library for interacting with Redis, a popular in-memory data store. Supports all Redis features including clusters, sentinels, and pipelines.
> - **JSONStream**: Library for working with JSON streams. Useful for processing large JSON data without having to load everything into memory.
> - **moment**: A library for manipulating and formatting dates and times in JavaScript, although it is no longer actively developed and users are advised to switch to other libraries such as `date-fns` or `Luxon`.
> - **pino**: A very fast and JSON-friendly logger for Node.js. Designed for high performance and large log volumes.

## Installation
1. Download or clone this repo.
2. Enter to the project directory.
3. Execute `npm install` to install the dependencies.
4. Copy `.env.example` to `.env` and set the environment variables.
5. Execute `prisma migrate dev`

## Configuration
Edit environment variables on .env

```env
# PRISMA
DATABASE_URL = 'mysql://USER:PASSWORD@HOST:PORT/DATABASE'
# DATABASE
PHONEBOOK_TABLE =
MYSQL_CONFIG_HOST =
MYSQL_CONFIG_USER =
MYSQL_CONFIG_PASSWORD =
MYSQL_CONFIG_DATABASE =
MYSQL_PORT =
```
## Unit Test
```
npm test
```
![unittest](https://i.ibb.co.com/XpyJL5s/unit-test.png)
## Usage
GET Products 
```
v1/product/
or
v2/product/
```
response
```json
{
    "status": "00000",
    "message": "Success",
    "data": {
        "count": 2,
        "list": [
            {
                "name": "Velocity Black Gum",
                "brand": "Compass",
                "price": 798000,
                "stock": 10
            },
            {
                "name": "Retrograde Low Triple Black",
                "brand": "Compass",
                "price": 538000,
                "stock": 10
            }
        ]
    },
    "transaction_id": "A3022407230902330820"
}
```
![products](https://i.ibb.co.com/5Tbz58T/get-v1.webp)
GET Products by id
```
v1/product/2
or
v2/product/2
```
response
```json
{
    "status": "00000",
    "message": "Success",
    "data": [
        {
            "id": 2,
            "name": "Velocity Black Gum",
            "brand": "Compass",
            "price": 798000,
            "stock": 10
        }
    ],
    "transaction_id": "A3022407230903500030"
}
```
![product](https://i.ibb.co.com/G3L2LFc/get-by-id-v1.webp)
POST Products
```
v1/product/
or
v2/product/
```
body
```json
{
    "name" : "Velocity Red",
    "brand": "Compass",
    "price": 598000,
    "stock": 10
}
```
response
```json
{
    "status": "00000",
    "message": "Success",
    "data": "Added 'Velocity Red' , 'Compass' , '598000' , '10' to product",
    "transaction_id": "A3022407230905287070"
}
```
![post](https://i.ibb.co.com/tp1XxfR/post-v1.webp)
PUT Products
```
v1/product/17
or
v2/product/17
```
body
```json
{
    "name" : "SEPATU SAMBA OG new",
    "brand": "Adidas new",
    "price": 2200000,
    "stock": 10
}
```
response
```json
{
    "status": "00000",
    "message": "Success",
    "data": "Edited 'SEPATU SAMBA OG new' , 'Adidas new' , '2200000' , '10' to product",
    "transaction_id": "A3022407230907341680"
}
```
![put](https://i.ibb.co.com/zFfc4WR/put-v1.webp)
DELETE Products
```
v1/product/17
or
v2/product/17
```
response
```json
{
    "status": "00000",
    "message": "Success",
    "data": "Delete id 17 successfully",
    "transaction_id": "A3022407230909496940"
}
```
![delete](https://i.ibb.co.com/rZbwMKP/delete-v1.webp)
![Database](https://i.ibb.co.com/LRWZhV7/Cuplikan-layar-2024-07-22-144022.webp)
![Diagram](https://i.ibb.co.com/qx2YrQR/API-Diagram-1.webp)
