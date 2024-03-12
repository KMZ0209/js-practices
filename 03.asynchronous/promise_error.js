import { runPromise, allPromise, closePromise } from "./promise_functions.js";

runPromise(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)"
)
  .then(() => runPromise("INSERT INTO books (title) VALUES (null)"))
  .then((result) => {
    console.log(`Inserted row with ID1: ${result.lastID}`);
    return runPromise("INSERT INTO books (title) VALUES (null)");
  })
  .catch((err) => console.error(`エラー1 inserting record: ${err.message}`))
  .then((result) => {
    console.log(`Inserted row with ID2: ${result.lastID}`);
    return runPromise("INSERT INTO books (title) VALUES (null)");
  })
  .catch((err) => console.error(`エラー2 inserting record: ${err.message}`))
  .then((result) => {
    console.log(`Inserted row with ID3: ${result.lastID}`);
    return runPromise("INSERT INTO books (title) VALUES (null)");
  })
  .catch((err) => console.error(`エラー3 inserting record: ${err.message}`))
  .then(() => allPromise("SELECT * FROM nonexistent"))
  .then((rows) => {
    rows.forEach((row) => {
      console.log(row.id, row.title);
    });
  })
  .catch((err) => console.error(`エラー selecting record: ${err.message}`))
  .then(() => runPromise("DROP TABLE books"))
  .then(() => closePromise());
