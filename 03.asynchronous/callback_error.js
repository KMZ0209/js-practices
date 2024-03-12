import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run("INSERT INTO books (title) VALUES (null)", (err) => {
      if (err) {
        console.error(`エラー1 inserting record: ${err.message}`);
      } else {
        console.log(`Inserted row with ID: ${this.lastID}`);
      }
      db.run("INSERT INTO books (title) VALUES (null)", (err) => {
        if (err) {
          console.error(`エラー2 inserting record: ${err.message}`);
        } else {
          console.log(`Inserted row with ID: ${this.lastID}`);
        }
        db.run("INSERT INTO books (title) VALUES (null)", (err) => {
          if (err) {
            console.error(`エラー3 inserting record: ${err.message}`);
          } else {
            console.log(`Inserted row with ID: ${this.lastID}`);
          }
          db.all(
            "SELECT * FROM nonexistent", (err, rows) => {
              if (err) {
                console.error(`エラー selecting record: ${err.message}`);
              } else {
                rows.forEach((row) => {
                  console.log(row.id, row.title);
                });
              }
              db.run("DROP TABLE books", () => {
                db.close();
              });
            })
            }
          );
        });
      });
    });
