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

  try {
    const result1 = await runPromise(
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
    const result2 = await runPromise(
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
    const result3 = await runPromise(
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
    const rows = await allPromise(db, "SELECT * FROM nonexistent");
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

  await runPromise(db, "DROP TABLE books");
  await closePromise(db);
}

main();
