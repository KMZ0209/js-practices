import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function runPromise(sql, param) {
  return new Promise((resolve, reject) => {
    db.run(sql, param, function (err) {
      if (!err) {
        resolve(this);
      } else {
        reject(err);
      }
    });
  });
}
function allPromise(sql, param) {
  return new Promise((resolve, reject) => {
    db.all(sql, param, (err, rows) => {
      if (!err) {
        resolve(rows);
      } else {
        reject(err);
      }
    });
  });
}
runPromise(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE, content TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    return runPromise("INSERT INTO books (title, content) VALUES (null)", [
      "CherryBook1",
      "CherryBookContent1",
    ]); // SQLのパラメータが2つあっても動くようにする
  })
  .catch((err) => {
    console.error(`エラー1 inserting record: ${err.message}`);
  }) // エラーメッセージを出す
  .then((result) => {
    console.log(`lastID1: ${result.lastID}`);
    return runPromise("INSERT INTO books (title, content) VALUES (null)", [
      "CherryBook2",
      "CherryBookContent2",
    ]); // SQLのパラメータが2つあっても動くようにする
  })
  .catch((err) => {
    console.error(`エラー2 inserting record: ${err.message}`);
  })
  .then((result) => {
    console.log(`lastID2: ${result.lastID}`);
    return runPromise("INSERT INTO books (title, content) VALUES (null)", [
      "CherryBook3",
      "CherryBookContent3",
    ]);
  }) // result.lastIDが動くようにする
  .catch((err) => {
    console.error(`エラー3 inserting record:, ${err.message}`);
  })

  .then(() => {
    return allPromise("SELECT * FROM books", null);
  })
  .then((rows) => {
    rows.forEach((row) => {
      console.log(row.id, row.title, row.content);
    });
  })
  .then(() => {
    return runPromise("DROP TABLE books");
  })
  .then(() => {
    db.close();
  })
  .catch((err) => {
    console.error(`エラー selecting record: ${err.message}`);
  });
