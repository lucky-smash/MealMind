MVP based

backend/
 ├── controllers/
 │    └── mealController.js
 ├── routes/
 │    └── mealRoutes.js
 ├── models/
 │    └── Food.js        👈 optional (future ready)
 ├── data/
 │    └── foods.js       👈 MVP data source
 ├── services/
 │    └── mealService.js 👈 BUSINESS LOGIC (important)
 ├── utils/
 │    └── optimizer.js   👈 CORE ENGINE
 ├── config/
 │    └── db.js          👈 later (Mongo)
 ├── server.js
 └── package.json