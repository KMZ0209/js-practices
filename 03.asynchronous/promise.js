import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

export function runPromise(sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (!err) {
        resolve(this);
      } else {
        reject(err);
      }
    });
  });
}

export function allPromise(sql, params) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, function (err, rows) {
      if (!err) {
        resolve(rows);
      } else {
        reject(err);
      }
    });
  });
}

runPromise(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    return runPromise("INSERT INTO books (title) VALUES (?)",
    ["CherryBook1"]);
  })
  .then((result) => {
    console.log(`lastID1: ${result.lastID}`);
    return runPromise("INSERT INTO books (title) VALUES (?)",
    ["CherryBook2"]);
  })
  .then((result) => {
    console.log(`lastID2: ${result.lastID}`);
    return runPromise("INSERT INTO books (title) VALUES (?)",
    ["CherryBook3"]);
  })
  .then((result) =>
  console.log(`lastID3: ${result.lastID}`)
  ) // result.lastIDが動くようにする
  .then(() =>
  allPromise("SELECT * FROM books")
  )
  .then((rows) =>
    rows.forEach((row) =>
      console.log(row.id, row.title)
    )
  )
  .then(() =>
    runPromise("DROP TABLE books")
  )
  .then(() =>
    db.close()
  );
