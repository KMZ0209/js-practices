import sqlite3 from "sqlite3";
import {
  runAsync,
  allAsync,
  closeAsync,
} from "./sqlite_async_await_functions.js";

async function main() {
  const db = new sqlite3.Database(":memory:");

  await runAsync(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
  );

  const result1 = await runAsync(db, "INSERT INTO books (title) VALUES (?)", [
    "CherryBook1",
  ]);
  console.log(`lastID: ${result1.lastID}`);

  const result2 = await runAsync(db, "INSERT INTO books (title) VALUES (?)", [
    "CherryBook2",
  ]);
  console.log(`lastID: ${result2.lastID}`);

  const result3 = await runAsync(db, "INSERT INTO books (title) VALUES (?)", [
    "CherryBook3",
  ]);
  console.log(`lastID: ${result3.lastID}`);

  const rows = await allAsync(db, "SELECT * FROM books");
  for (const row of rows) {
    console.log(row.id, row.title);
  }

  await runAsync(db, "DROP TABLE books");
  await closeAsync(db);
}

main();
