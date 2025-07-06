# README

This starting point uses Vite+React for the frontend, Express.js for the backend with Drizzle as an ORM+DB migration handler.

## Set Up

Start the postgres database in docker with:

```bash
docker compose up -d
```

The user and password are both postgres, the database name is `weird_salads_javascript_development`, and it's listening on port 6679 (to try avoid conflict in case you have another postgres server running). In short:

```bash
postgresql://postgres:postgres@localhost:6679/weird_salads_javascript_development
```

Install dependencies and start serving the backend:

```bash
# In the same directory as this README
cd backend
npm install
npm run dev
```

The backend should now be listening on http://localhost:3000/, and can leave this running while you develop, as it'll autoload any changes you make. For details on the backend, see the [express js docs](https://expressjs.com/).

Next, set up the frontend:

create `.env` file in `frontend` directory and add following to the file:

`VITE_API_HOST=http://localhost:3000`

run in terminal:

```bash
# In the same directory as this README
cd frontend
npm install
npm run dev
```

You should now be able to reach the frontend on http://localhost:5173. If you're not seeing data in the staff table, make sure you've still got the backend running.

## Adding models

Add your model in `backend/drizzle/schema/`, following the staff example or the [drizzle docs](https://orm.drizzle.team/docs/get-started/postgresql-new#step-4---create-a-table).

You can then generate and run a migration with:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

## DB design
You can find an image of DB entity relationship diagram for your reference in `backend/project_assets` directory.

![DB Diagram](backend/project_assets/database-er-diagram.png)

## Seeding DB with data
To populate DB with initial data, we use .csv files imported from provided Google Sheet

Some tables are depending on other tables (foreign keys), and therefore, should be seeded first.

Run below commands from `backend` directory in following order:


```bash
npm run import:data
```

It will import all tables in required order. Sometimes, you may want to import particular table, then run from `backend` directory:

```bash
npm run import:data -- <table_name>
```

for example:

```bash
npm run import:data -- location
```

## Postman
There is a Postman collection included in `bakcend/postman` directory, to help test all available API endpoints easily


## PROJECT NOTES:

What I have done:

- implemented required functionality as per assignment


Tradeoffs (due to time constraints):

In favour of better data modelling and more functionality I did not spent enough time on: 

- design (could do so much more!)
- frontend (removed as much duplicatioin, did some cleanup but would do much better given more time)
- testing (only implemented 2 test suits on backend to demonstrate that I know how to do it)
- manual testing (only teste in Chrome)


What would I do differently if I had more time:

- usability
- accessibility
- edge cases
- responsiveness
- performance
- manual testing in different browsers (normally use BrowserStack)
