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
try {
  const result = await runPromise(
    db,
    "INSERT INTO books (title) VALUES (NULL)"
  );
  console.log(`lastID: ${result.lastID}`);
} catch (err) {
  if (err instanceof Error) {
    console.error(`エラー1 inserting record: ${err.message}`);
  } else {
    throw err;
  }
}
try {
  const result = await runPromise(
    db,
    "INSERT INTO books (title) VALUES (NULL)"
  );
  console.log(`lastID: ${result.lastID}`);
} catch (err) {
  if (err instanceof Error) {
    console.error(`エラー2 inserting record: ${err.message}`);
  } else {
    throw err;
  }
}
try {
  const result = await runPromise(
    db,
    "INSERT INTO books (title) VALUES (NULL)"
  );
  console.log(`lastID: ${result.lastID}`);
} catch (err) {
  if (err instanceof Error) {
    console.error(`エラー3 inserting record: ${err.message}`);
  } else {
    throw err;
  }
}
try {
  const rows = await allPromise(db, "SELECT * FROM nonexistent");
  rows.forEach((row) => {
    console.log(row.id, row.title);
  });
} catch (err) {
  console.error(`エラー selecting record: ${err.message}`);
}
await runPromise(db, "DROP TABLE books");
await closePromise(db);
