import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function runPromise(param, callback) {
  return new Promise((resolve, reject) => {
    db.run(param, callback, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ lastID: this.lastID });
      }
    });
  });
}

function eachPromise(param, callback) {
  return new Promise((resolve, reject) => {
    db.each(param, callback, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

runPromise(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
)
  .then(() => {
    return runPromise("INSERT INTO books (title) VALUES (?)", [null]);
  })
  .catch((err) => {
    console.error(`エラー1 inserting record: ${err.message}`);
  })
  .then(() => {
    return eachPromise("SELECT * FROM nonexistent", (err, row) => {
      console.log(row.id, row.title);
    });
  })
  .catch((err) => {
    console.error(`エラー selecting record: ${err.message}`);
  })
  .then(() => {
    return runPromise("DROP TABLE books", () => {
      db.close();
    });
  });
