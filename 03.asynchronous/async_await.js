import sqlite3 from "sqlite3";
import {
  runPromise,
  allPromise,
  closePromise,
} from "./sqlite_promise_functions.js";

const db = new sqlite3.Database(":memory:");

await runPromise(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
);
let result = await runPromise(db, "INSERT INTO books (title) VALUES (?)", [
  "CherryBook1",
]);
console.log(`lastID: ${result.lastID}`);
result = await runPromise(db, "INSERT INTO books (title) VALUES (?)", [
  "CherryBook2",
]);
console.log(`lastID: ${result.lastID}`);
result = await runPromise(db, "INSERT INTO books (title) VALUES (?)", [
  "CherryBook3",
]);
console.log(`lastID: ${result.lastID}`);
const rows = await allPromise(db, "SELECT * FROM books");
rows.forEach((row) => {
  console.log(row.id, row.title);
});
await runPromise(db, "DROP TABLE books");
await closePromise(db);
