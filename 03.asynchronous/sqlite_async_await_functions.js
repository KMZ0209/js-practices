export async function runAsync(db, sql, params) {
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

export async function allAsync(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (!err) {
        resolve(rows);
      } else {
        reject(err);
      }
    });
  });
}

export async function closeAsync(db) {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  });
}
