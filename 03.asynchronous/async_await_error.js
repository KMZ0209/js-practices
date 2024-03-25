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

  try {
    const result1 = await runAsync(
      db,
      "INSERT INTO books (title) VALUES (NULL)"
    );
    console.log(`lastID: ${result1.lastID}`);
  } catch (err) {
    if (err) {
      console.error(`エラー1 inserting record: ${err.message}`);
    } else {
      throw err;
    }
  }

  try {
    const result2 = await runAsync(
      db,
      "INSERT INTO books (title) VALUES (NULL)"
    );
    console.log(`lastID: ${result2.lastID}`);
  } catch (err) {
    if (err) {
      console.error(`エラー2 inserting record: ${err.message}`);
    } else {
      throw err;
    }
  }

  try {
    const result3 = await runAsync(
      db,
      "INSERT INTO books (title) VALUES (NULL)"
    );
    console.log(`lastID: ${result3.lastID}`);
  } catch (err) {
    if (err) {
      console.error(`エラー3 inserting record: ${err.message}`);
    } else {
      throw err;
    }
  }

  try {
    const rows = await allAsync(db, "SELECT * FROM nonexistent");
    for (const row of rows) {
      console.log(row.id, row.title);
    }
  } catch (err) {
    if (err) {
      console.error(`エラー selecting record: ${err.message}`);
    } else {
      throw err;
    }
  }

  await runAsync(db, "DROP TABLE books");
  await closeAsync(db);
}

main();
