import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run(
      "INSERT INTO books (title) VALUES (?)",
      ["Cherry Book 1"],
      function () {
        console.log(`lastID: ${this.lastID}`);
        db.run(
          "INSERT INTO books (title) VALUES (?)",
          ["Cherry Book 2"],
          function () {
            console.log(`lastID: ${this.lastID}`);
            db.run(
              "INSERT INTO books (title) VALUES (?)",
              ["Cherry Book 3"],
              function () {
                console.log(`lastID: ${this.lastID}`);
                db.each(
                  "SELECT * FROM books",
                  (_, row) => {
                    console.log(row.id, row.title);
                  },
                  () => {
                    db.run("DROP TABLE books", () => {
                      db.close();
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  }
);
