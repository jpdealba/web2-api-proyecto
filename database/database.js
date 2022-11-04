let database;

function db(_db) {
  if (_db) {
    database = _db;
  }

  return database;
}

module.exports = db;
