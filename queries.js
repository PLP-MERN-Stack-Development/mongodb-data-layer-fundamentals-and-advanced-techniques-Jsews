// Basic CRUD Operations

// 1️⃣ Find all books in a specific genre
db.books.find({ genre: "Fiction" });

// 2️⃣ Find books published after a certain year
db.books.find({ published_year: { $gt: 2000 } });

// 3️⃣ Find books by a specific author
db.books.find({ author: "George Orwell" });

// 4️⃣ Update the price of a specific book
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 12.49 } }
);

// 5️⃣ Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" });


// Advanced Queries

// 6️⃣ Find books that are both in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// 7️⃣ Use projection to return only title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// 8️⃣ Sort books by price ascending
db.books.find().sort({ price: 1 });

// 9️⃣ Sort books by price descending
db.books.find().sort({ price: -1 });

// 🔟 Pagination (5 books per page)
db.books.find().skip(0).limit(5); // Page 1
db.books.find().skip(5).limit(5); // Page 2


// Aggregation Pipelines

// 11️⃣ Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
]);

// 12️⃣ Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
]);

// 13️⃣ Group books by publication decade and count them
db.books.aggregate([
  {
    $group: {
      _id: {
        $concat: [
          { $toString: { $subtract: [ { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] }, 0 ] } },
          "s"
        ]
      },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);


// Indexing

// 14️⃣ Create index on title
db.books.createIndex({ title: 1 });

// 15️⃣ Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// 16️⃣ Use explain() to see performance improvement
db.books.find({ title: "1984" }).explain("executionStats");
