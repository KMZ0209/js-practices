import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory");

db.run(
  "CREATE TABLE IF NOT EXISTS books_table (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  function () {
    db.run(
      "INSERT INTO books_table (title) VALUES (null)",
      function (insertErr) {
        if (insertErr) {
          console.error("エラー1 inserting record: " + insertErr.message);
        } else {
          console.log("Inserted row with ID: " + this.lastID);
        }
        db.run(
          "INSERT INTO books_table (title) VALUES (null)",
          function (insertErr) {
            if (insertErr) {
              console.error("エラー2 inserting record: " + insertErr.message);
            } else {
              console.log("Inserted row with ID: " + this.lastID);
            }
            db.run(
              "INSERT INTO books_table (title) VALUES (null)",
              function (insertErr) {
                if (insertErr) {
                  console.error(
                    "エラー3 inserting record: " + insertErr.message,
                  );
                } else {
                  console.log("Inserted row with ID: " + this.lastID);
                }
                db.each(
                  "SELECT id, title FROM books_table",
                  function (selectErr, row) {
                    if (selectErr) {
                      console.error(
                        "エラー2 selecting record: " + selectErr.message,
                      );
                    } else {
                      console.log(row.id, row.title);
                    }
                  },
                  (completeErr) => {
                    if (completeErr) {
                      console.error(
                        "エラー3 completing select operation: " +
                          completeErr.message,
                      );
                    } else {
                      db.run(
                        "DROP TABLE IF EXISTS books_table",
                        function () {},
                      );
                    }
                  },
                );
              },
            );
          },
        );
      },
    );
  },
);
