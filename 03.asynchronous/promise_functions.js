export function runPromise(db, sql, params) {
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

export const allPromise = (db, sql, params) => {
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

export const closePromise = (db) => {
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
