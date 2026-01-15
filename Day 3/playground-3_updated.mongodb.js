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

// Projection and Sort
// db.getCollection("car").aggregate([
//   {
//     $match: {
//       maker: "Hyundai",
//     },
//   },
//   {
//     $project: {
//       _id: 0,
//       model: 1,
//       maker: 1,
//       fuel_type: 1,
//     },
//   },
//   {
//     $sort: {
//       model: 1,
//     },
//   },
// ]);

// Group the cars by maker and then sort based on cout(no. of cars)
// db.getCollection("car").aggregate([
//   {
//     $group:{
//       _id: "$maker",
//       totalCar: { $sum: 1 }
//     }
//   },
//   {
//     $sort: {
//       totalCar: -1
//     }
//   }
// ])

// Group the cars by maker and then sort based on cout(no. of cars)
// we are doing same thing by using sort by count
// db.getCollection("car").aggregate([
//   {
//     $sortByCount: "$maker",
//   },
// ]);

// we do have multiple owners for each car right
// (Owner are list of documents), now if you want to work on
// each owner then we can use (Unwind)
// $unwind

// db.getCollection("car").aggregate([{ $unwind: "$owners" }]);

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

//  ----------------- STRING operators --------------

/**
$concat
$toUper
$toLower
$regexMatch
$itrim
$split
 */

// $concat
// db.getCollection("car").aggregate([
//   {
//     $project: {
//       _id: 0,
//       fullname: { $concat: ["$maker", " ", "$model"] },
//     },
//   },
//   {
//     $group:{
//       _id: "$fullname",
//       totalSum: {$sum: 1}
//     }
//   }
// ]);

// List down all the hyndai cars and print the name as
// maker + model i.e. Carname Hyundai creta

/*
db.getCollection("car").aggregate([
  {
    $match: {
      maker: "Hyundai",
    },
  },
  {
    $project: {
      _id: 0,

      // Concatination
      carName: {
        $concat: ["$maker", " ", "$model"],
      },
      total: { $sum: 1 },

      // Printing Model value using upperCase
      model: {
        $toUpper: "$model",
      },
    },
  },
]);

*/

// Case Where Seeing nested or Sub pipeline aggregation
// db.getCollection("car").aggregate([
//   {
//     $match: {
//       maker: "Hyundai",
//     },
//   },
//   {
//     $project: {
//       _id: 0,
//       carName: {
//         $toUpper: {
//           $concat: ["$maker", " ", "$model"],
//         },
//       },
//     },
//   },
// ]);

/**
{
$regexMatch:{
input: <string_expression>,
regex: <regex_pattern>,
options : "<options>" // Optional, e.g., "i" case-insensitive search
}
}

--> Performs a regular expressions (regex) pattern matching and returns true or false

 */

// Add a flag is_diesel = true/false for each car in the collection of cars
// db.getCollection("car").aggregate([
//   {
//     $project: {
//       model: 1,
//       fuel_type: 1,
//       _id: 0,
//       is_diesel: {
//         $regexMatch: {
//           input: "$fuel_type",
//           regex: "Die",
//         },
//       },
//     },
//   },
// ]);

// Out Stage --> use for making temporary collections and storing the data in it.
// After aggregating, store the result in an another collection 'Hyundai_cars'

// db.getCollection("car").aggregate([
//   {
//     $match: {
//       maker: "Hyundai",
//     },
//   }, // satage 1
//   {
//     $project: {
//       _id: 0,
//       carName: {
//         $concat: ["$maker", " ", "$model"],
//       },
//     },
//   },
//   {
//     $out: "Hyundai_car", // collection bna ke store krwa dega ye temporary database mein.
//   },
// ]);
