import sqlite3 from "sqlite3";
import {
  runPromise,
  allPromise,
  closePromise,
} from "./sqlite_promise_functions.js";

async function main() {
  const db = new sqlite3.Database(":memory:");

  await runPromise(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
  );

  const result1 = await runPromise(db, "INSERT INTO books (title) VALUES (?)", [
    "CherryBook1",
  ]);
  console.log(`lastID: ${result1.lastID}`);

  const result2 = await runPromise(db, "INSERT INTO books (title) VALUES (?)", [
    "CherryBook2",
  ]);
  console.log(`lastID: ${result2.lastID}`);

  const result3 = await runPromise(db, "INSERT INTO books (title) VALUES (?)", [
    "CherryBook3",
  ]);
  console.log(`lastID: ${result3.lastID}`);

  const rows = await allPromise(db, "SELECT * FROM books");
  for (const row of rows) {
    console.log(row.id, row.title);
  }

  await runPromise(db, "DROP TABLE books");
  await closePromise(db);
}

main();
