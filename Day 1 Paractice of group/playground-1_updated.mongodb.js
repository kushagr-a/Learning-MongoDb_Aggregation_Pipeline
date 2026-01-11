// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("MongoDB_Aggregation");

// Find a document in a collection.
// db.getCollection("car").aggregate([
//   {
//     $group: {
//       _id: "$maker", // common khojo jo sb mei ho ji and group ke basis pe hi calculation krte hai
//       totalCars: { $sum: 1 }, // --> sum operator and 1 means number of documents count krta hai
//       AvgPrice: { $avg: "$price" },
//     },
//   }, // Stage 1
//   // {}// Satge 2
// ]);

// Match
// db.getCollection("car").aggregate([
//   {
//     $match: {
//       maker: "Hyundai",
//       "engine.cc": {$gt: 1200}
//     },
//   },
// ]);

// Count
// db.getCollection("car").aggregate([
//   {
//     $match: {
//       maker: "Hyundai",
//     },
//   },
//   {
//     $count: "Total_cars",
//   },
// ]);

// Count no. of diesel and petrol cars of Hyundai brand
// db.getCollection("car").aggregate([
//   {
//     $match: {
//       maker: "Hyundai",
//     },
//   },
//   {
//     $group: {
//       _id: "$fuel_type",
//       totalCar: { $sum: 1 },
//     },
//   },
// ]);

// Projection
db.getCollection("car").aggregate([
    {
        $match: {
          maker: "Hyundai"
        }
    },
    {
        $project: {
          maker: 1,
          model: 1,
          fule_type: 1,
        }
    }
])

/**
 Herarchy of pipeLines
 1. $match
 2. $group
 3. $project
 4. $sort
 5. $limit
 6. $unwind
 7. $lookup
 8. $addFields
 9. $count
 10.$skip

 */

/**
 feild pe lgane ke liye "$--> name of field"
 "engine.cc": --> used for finding in array .
 */
