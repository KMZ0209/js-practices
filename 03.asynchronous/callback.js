import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory");

db.run(
  "CREATE TABLE IF NOT EXISTS books_table (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  function () {
    db.run(
      "INSERT INTO books_table (title) VALUES (?)",
      ["Cherry Book 1"],
      function () {
        const lastID1 = this.lastID;
        console.log("lastID:" + lastID1);
        db.run(
          "INSERT INTO books_table (title) VALUES (?)",
          ["Cherry Book 2"],
          function () {
            const lastID2 = this.lastID;
            console.log("lastID:" + lastID2);
            db.run(
              "INSERT INTO books_table (title) VALUES (?)",
              ["Cherry Book 3"],
              function () {
                const lastID3 = this.lastID;
                console.log("lastID:" + lastID3);
                db.each(
                  "SELECT id, title FROM books_table",
                  function (err, row) {
                    console.log(row.id, row.title);
                  },
                );
                db.run("DROP TABLE IF EXISTS books_table", function () {});
              },
            );
          },
        );
      },
    );
  },
);
