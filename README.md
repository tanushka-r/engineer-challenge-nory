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


## Testing
There are only few tests has been added for the purpose of this assignment - just to demonstrate the knowledge, full test coverage is out of scope

### Backend
From `backend` directory run:

```bash
npm run test
```

### Frontend
For unit testing from `frontend` directory run:

```bash
npm run test
```

For e2e testing from `frontend` directory run:

```bash
npm run e2e:run
```

or to open live view:

```bash
npm run e2e
```

**NOTE:**
Location ID and Staff ID is currently hardcoded in `frontend/src/contex/GlobalContext.tsx`, you can manually change it to fetch different location or/and staff data from DB.


## PROJECT NOTES:

### Brief Summary

What I have done:

- implemented required functionality as per assignment


Tradeoffs (due to time constraints):

In favour of better data modelling and more functionality I did not spent enough time on: 

- design (could do so much more!)
- frontend (removed as much duplicatioin, did some cleanup but would do much better given more time)
- testing (only implemented 2 test suits on backend to demonstrate that I know how to do it)
- manual testing (only tested in Chrome)


What would I do differently if I had more time:

- usability
- accessibility
- edge cases
- responsiveness
- performance
- manual testing in different browsers (normally use BrowserStack)

### Detailed breakdown

**DATA:**

I have started from reading spec in detail and examining the data provided. I have noticed some duplications, so to help with data modelling I have used Lucid Charts to create entity relationship diagram. That helped me to understand how to move data on spreadsheet to prepare it for importing into database.

I believe good data is a foundation and I choose not to skip this step and not to compromise on data quality.


**BACKEND:**

Next step was to develop backend services. I have started from "ingredient" service and implemented as most endpoints needed to manipulate data. However, before implementing the rest of endpoints for other services, I had to pause and think which ones we actually need for the assignment.

Tradeoff here is that I have implemented only services needed for required functionality. 

Data validations are only done on "write" operation into DB, as all data is validated at DB level, I omitted validations on "read".

I have only implemented few tests, just to demonstrate the understanding and ability, full test coverage is out of scope of the assignmenet.

I have included Postman collection in this project to help anyone new with endpoint testing.


**FRONTEND:**

Next step was frontend. Actually, I was moving back and foth between backend and frontend development, as it is easier to test end to end.

Initially I generated minimal markup and styling and left all the proper "look and feel" to the last.

Tradeoff here is that I have focused so much on data and backend functionality that I didn't have enough time to focus on frontend. Therefore, some code is brokend down into separate components and some is not and could still be optimised.

I have also did only few tests - unit and e2e, just to demonstrate the ability.

Layout is mostly responsive, but I did not cover some edge cases (but I have noted them). I have only tested it in Chrome browser, in real life projects I use BrowserStack.


**WISH LIST**

If I had more time and if I was in real life project setting, I would do following:

**Codebase:**

- more test coverage (identify what actually needs to be tested)
- accessibility and usability on frontend
- better thought out approaches for both frontend and backend
- performance
- security

**Business and Users:**

- usability testing (maybe there is a research or analytics data available)
- better understanding of business (how business makes money)
- better understanding on Users problems we are trying to solve
- how to combine business goals and user experience to deliver best results

**Reports:**

In this assignment reports are very basic, but it was the part that I would love to work on more.

For example, we could:

- break down data by date
- analyze waste by ingredient 
- we could add data point waste_type - e.g spoilage (chicken gone off) or mishandling (coffee spilled by staff), this would allow business to understand how to prevent wastage
- for sales we could also break down by recipe, for example we could see top 10 best sellers (or worst sellers), which location has most sales
- we are currently recording cost of delivery at the point of delivery, that is good foundation to allow us to track cost increases (should we change supplier?)

**Sales:**

If I had more time, I would implement feature that when recipe selected we would display all ingredients and for each ingredient we would have a tag "in stock", "low stock" or "out of stock", this would allow staff to see in real time, not just what ingredients they already missing, but what is getting low, so they could place timely orders.

We could also implement "ingredient substitude" feature - for example if customer wants skim milk capuccino, but skim milk is out of stock, we could offer to replace it with full-fat milk, this would allow business to not loose a sale.

Currently I am only processing one recipe sale at a time, I would like to allow user to select multiple recipes and process in single sale.

**Deliveries:**

Same as for sales, we only processing one item at a time, I wish I had time to implemnet multiple items delivery.

**Stock:**

I would add indicators that show visually if stock is getting low or if it is too high, as it can be helpful to determine what to order.

**General:**

I wich I had time to implement switching user and location on the interface (see note above about it being hardcoded).

**FINAL NOTE:**

I think this project notes got really long! If you have managed to read through all of this, thank you for reading and reviewing :)
