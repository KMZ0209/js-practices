import sqlite3 from "sqlite3";
import { runPromise, allPromise, closePromise } from "./promise_functions.js";

const db = new sqlite3.Database(":memory:");

runPromise(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
)
  .then(() =>
    runPromise(db, "INSERT INTO books (title) VALUES (?)", ["CherryBook1"])
  )
  .then((result) => {
    console.log(`lastID1: ${result.lastID}`);
    return runPromise(db, "INSERT INTO books (title) VALUES (?)", [
      "CherryBook2",
    ]);
  })
  .then((result) => {
    console.log(`lastID2: ${result.lastID}`);
    return runPromise(db, "INSERT INTO books (title) VALUES (?)", [
      "CherryBook3",
    ]);
  })
  .then((result) => {
    console.log(`lastID3: ${result.lastID}`);
    return allPromise(db, "SELECT * FROM books");
  })
  .then((rows) => {
    rows.forEach((row) => {
      console.log(row.id, row.title);
    });
    return runPromise(db, "DROP TABLE books");
  })
  .then(() => closePromise(db));
