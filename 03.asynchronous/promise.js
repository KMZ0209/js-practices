import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function runPromise(param, callback) {
  return new Promise((resolve) => {
    db.run(param, callback, function () {
      resolve({ lastID: this.lastID });
    });
  });
}

function eachPromise(param, callback) {
  return new Promise((resolve) => {
    db.each(param, callback, function () {
      resolve();
    });
  });
}

runPromise(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
)
  .then(() => {
    return runPromise("INSERT INTO books (title) VALUES (?)", [
      "Cherry Book 1",
    ]);
  })
  .then((result) => {
    console.log(`lastID: ${result.lastID}`);
    return eachPromise("SELECT * FROM books");
  })
  .then(() => {
    return runPromise("INSERT INTO books (title) VALUES (?)", [
      "Cherry Book 2",
    ]);
  })
  .then((result) => {
    console.log(`lastID: ${result.lastID}`);
    return eachPromise("SELECT * FROM books");
  })
  .then(() => {
    return runPromise("INSERT INTO books (title) VALUES (?)", [
      "Cherry Book 3",
    ]);
  })
  .then((result) => {
    console.log(`lastID: ${result.lastID}`);
    return eachPromise("SELECT * FROM books", (_, row) => {
      console.log(row.id, row.title);
    });
  })
  .then(() => {
    return runPromise("DROP TABLE books", () => {
      db.close();
    });
  });
