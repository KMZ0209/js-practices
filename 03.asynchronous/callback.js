import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run(
      "INSERT INTO books (title) VALUES (?)",
      ["CherryBook1"],
      function () {
        console.log(`lastID: ${this.lastID}`);
        db.run(
          "INSERT INTO books (title) VALUES (?)",
          ["CherryBook2"],
          function () {
            console.log(`lastID: ${this.lastID}`);
            db.run(
              "INSERT INTO books (title) VALUES (?)",
              ["CherryBook3"],
              function () {
                console.log(`lastID: ${this.lastID}`);
                db.all("SELECT * FROM books", (_, rows) => {
                  rows.forEach((row) => {
                    console.log(row.id, row.title);
                  });
                  db.run("DROP TABLE books", () => {
                    db.close();
                  });
                });
              }
            );
          }
        );
      }
    );
  }
);
