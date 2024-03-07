import {runPromise, allPromise, closePromise} from './promise.js';

runPromise(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    return runPromise("INSERT INTO books (title) VALUES (null)",
    ["CherryBook1"]);
  })
  .catch((err) =>
  console.error(`エラー1 inserting record: ${err.message}`)
  )
  .then((result) => {
    console.log(`lastID1: ${result.lastID}`);
    return runPromise("INSERT INTO books (title) VALUES (null)",
    ["CherryBook2"]);
  })
  .catch((err) =>
  console.error(`エラー2 inserting record: ${err.message}`)
  )
  .then((result) => {
    console.log(`lastID2: ${result.lastID}`);
    return runPromise("INSERT INTO books (title) VALUES (null)",
    ["CherryBook3"]);
  })
  .catch((err) =>
    console.error(`エラー3 inserting record:, ${err.message}`)
  )
  .then(() =>
    allPromise("SELECT * FROM nonexistent")
  )
  .then((rows) => {
    rows.forEach((row) =>
      console.log(row.id, row.title)
    );
  })
  .catch((err) =>
    console.error(`エラー selecting record: ${err.message}`)
  )
  .then(() =>
    runPromise("DROP TABLE books")
  )
  .then(() =>
    closePromise()
  );
