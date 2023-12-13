import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

// import {runPromise, allPromise} from "./common.js";

function runPromise () {
  return new Promise((resolve) => {
    db.run(
        "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
        () => {
          db.run(
            "INSERT INTO books (title) VALUES (?)",
            ["Cherry Book 1"],
            function () {
              const lastID1 = this.lastID;

          db.run(
            "INSERT INTO books (title) VALUES (?)",
            ["Cherry Book 2"],
            function () {
              const lastID2 = this.lastID;
              resolve([`lastID1: ${lastID1}`, `lastID2: ${lastID2}`]);
            }
            );
          }
        );
      }
    );
  });
}

function allPromise () {
  return new Promise((resolve) => {
      db.all(
        "SELECT * FROM books",
        (_, rows) => {
          resolve(rows);
        }
        );
      });
    }

    runPromise()
  .then((lastIDs) => {
    lastIDs.forEach((lastID) => {
      console.log(lastID);
    });
    return allPromise();
  })
    .then((rowsData) => {
      rowsData.forEach((row) => {
        console.log(row.id, row.title);
      });
    })
    .finally(() => {
      db.run("DROP TABLE books", () => {
        db.close();
      });
    });
