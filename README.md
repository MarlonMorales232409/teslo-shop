# Next Js Teslo-E-comerce

## Clone the repository and install dependencies

You can use **yarn** or **npm**

with yarn:

```
yarn dev
```

with npm:

```
nmp isntall
```

To run the app it's needed the data base

```
    docker-compose up -d
```

-   -d means **detashed**

*   Mongo DB local URL

## Set the enviroment variables

Rename the file **.env.template** to **.env**

copy and paste the following url into your .env file

```
mongodb://localhost:27017/teslodb
```

Now your .env file should looks like this

```
MONGO_URL=mongodb://localhost:27017/teslodb
```

## Fill the database with test info

You can use the **seed-data.ts** file and fill the entries[]

## Make a request

make a request to this test endpoint:

```
http://localhost:3000/api/seed
```
