import { runPromise, allPromise, closePromise } from "./functions.js";

runPromise(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
)
  .then(() =>
    runPromise("INSERT INTO books (title) VALUES (?)", ["CherryBook1"])
  )
  .then((result) => {
    console.log(`lastID1: ${result.lastID}`);
    return runPromise("INSERT INTO books (title) VALUES (?)", ["CherryBook2"]);
  })
  .then((result) => {
    console.log(`lastID2: ${result.lastID}`);
    return runPromise("INSERT INTO books (title) VALUES (?)", ["CherryBook3"]);
  })
  .then((result) => {
    console.log(`lastID3: ${result.lastID}`);
    return allPromise("SELECT * FROM books");
  })
  .then((rows) => {
    rows.forEach((row) => {
      console.log(row.id, row.title);
    });
    return runPromise("DROP TABLE books");
  })
  .then(() => closePromise());
