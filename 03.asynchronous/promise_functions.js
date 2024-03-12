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

export const allPromise = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (!err) {
        resolve(rows);
      } else {
        reject(err);
      }
    });
  });
};

export const closePromise = () => {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  });
};
