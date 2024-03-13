import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

import { runPromise, allPromise, closePromise } from "./promise_functions.js";

runPromise(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
)
  .then(() => runPromise(db, "INSERT INTO books (title) VALUES (null)"))
  .then((result) => {
    console.log(`Inserted row with ID: ${result.lastID}`);
  })
  .catch((err) => {
    console.error(`エラー1 inserting record: ${err.message}`);
    return runPromise(db, "INSERT INTO books (title) VALUES (null)");
  })
  .then((result) => {
    console.log(`Inserted row with ID: ${result.lastID}`);
  })
  .catch((err) => {
    console.error(`エラー2 inserting record: ${err.message}`);
    return runPromise(db, "INSERT INTO books (title) VALUES (null)");
  })
  .then((result) => {
    console.log(`Inserted row with ID: ${result.lastID}`);
  })
  .catch((err) => {
    console.error(`エラー3 inserting record: ${err.message}`);
  })
  .then(() => allPromise(db, "SELECT * FROM nonexistent"))
  .then((rows) => {
    rows.forEach((row) => {
      console.log(row.id, row.title);
    });
  })
  .catch((err) => {
    console.error(`エラー selecting record: ${err.message}`);
  })
  .then(() => runPromise(db, "DROP TABLE books"))
  .then(() => closePromise(db));
