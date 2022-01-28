const package = require("./package.json");
const isCypherEnabled = package.options.isCypherEnabled;
const key = package.options.key;

let sqlite3;
let db;

// LOAD DATABASE
exports.databaseLoad = (path = __dirname, databaseName = "database.db") => {
    if (isCypherEnabled) {
        sqlite3 = require('@journeyapps/sqlcipher').verbose();

        db = new sqlite3.Database(`${path}/${databaseName}`, (err) => {
            if (err) {
                console.log(err.message);
                return 0;
            }

            db.run("PRAGMA cipher_compatibility = 4");
            console.log("\x1b[32mDatabase opened without error, encrypted\x1b[0m");

            return 1;
        });
    } else {
        sqlite3 = require("sqlite3").verbose();

        db = new sqlite3.Database(databaseName, (err) => {
            if (err) {
                console.log(err.message);
                return 0;
            }

            console.log("\x1b[32mDatabase opened without error, with no encryption\x1b[0m");
            return 1;
        });
    };
};

// DATABASE GET
exports.databaseGet = (sql, params = null) => {
    if (isCypherEnabled) {
        db.run(`PRAGMA key = ${key}`);

        if (params === null) {
            return new Promise((resolve, reject) => {
                db.get(sql, (err, result) => {
                    if (err) {
                        console.error(err.message);
                        return 0;
                    }
                    resolve(result);
                });
            });
        }

        return new Promise((resolve, reject) => {
            db.get(sql, params, (err, result) => {
                if (err) {
                    console.error(err.message);
                    return 0;
                }
                resolve(result);
            });
        });
    } else {
        if (params === null) {
            return new Promise((resolve, reject) => {
                db.get(sql, (err, result) => {
                    if (err) {
                        console.error(err.message);
                        return 0;
                    }
                    resolve(result);
                });
            });
        }

        return new Promise((resolve, reject) => {
            db.get(sql, params, (err, result) => {
                if (err) {
                    console.error(err.message);
                    return 0;
                }
                resolve(result);
            });
        });
    };
}

// DATABASE RUN
exports.databaseRun = (sql, params = null) => {
    if (isCypherEnabled) {
        db.run(`PRAGMA key = ${key}`);

        if (params === null) {
            return new Promise((resolve, reject) => {
                db.run(sql, (err) => {
                    if (err) {
                        console.error(err.message);
                        return 0;
                    }
                    resolve();
                    return 1;
                });
            });
        }

        return new Promise((resolve, reject) => {
            db.run(sql, params, (err) => {
                if (err) {
                    console.error(err.message);
                    return 0;
                }
                resolve();
                return 1;
            });
        });
    } else {
        if (params === null) {
            return new Promise((resolve, reject) => {
                db.run(sql, (err) => {
                    if (err) {
                        console.error(err.message);
                        return 0;
                    }
                    resolve();
                    return 1;
                });
            });
        }

        return new Promise((resolve, reject) => {
            db.run(sql, params, (err) => {
                if (err) {
                    console.error(err.message);
                    return 0;
                }
                resolve();
                return 1;
            });
        });
    };
}

// DATABASE ALL
exports.databaseAll = (sql, params = null) => {
    if (isCypherEnabled) {
        db.run(`PRAGMA key = ${key}`);

        if (params === null) {
            return new Promise((resolve, reject) => {
                db.all(sql, (err, result) => {
                    if (err) {
                        console.error(err.message);
                        return 0;
                    }
                    resolve(result);
                });
            });
        }

        return new Promise((resolve, reject) => {
            db.all(sql, params, (err, result) => {
                if (err) {
                    console.error(err.message);
                    return 0;
                }
                resolve(result);
            });
        });
    } else {
        if (params === null) {
            return new Promise((resolve, reject) => {
                db.all(sql, (err, result) => {
                    if (err) {
                        console.error(err.message);
                        return 0;
                    }
                    resolve(result);
                });
            });
        }

        return new Promise((resolve, reject) => {
            db.all(sql, params, (err, result) => {
                if (err) {
                    console.error(err.message);
                    return 0;
                }
                resolve(result);
            });
        });
    };
}

//DATABASE CLOSE
exports.databaseClose = () => {
    if (isCypherEnabled) {
        db.run(`PRAGMA key = ${key}`);

        return new Promise((resolve, reject) => {
            db.close((err) => {
                if (err) {
                    console.error(err.message);
                    return 0;
                }
                console.log('\x1b[32mDatabase closed without error\x1b[0m');
                resolve();
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            db.close((err) => {
                if (err) {
                    console.error(err.message);
                    return 0;
                }
                console.log('\x1b[32mDatabase closed without error\x1b[0m');
                resolve();
            });
        })
    }
}

// DROP DATABASE TABLE
exports.databaseDropTable = (table) => {
    let sql = `DROP TABLE ${table}`;

    if (isCypherEnabled) {
        db.run(`PRAGMA key = ${key}`);

        return new Promise((resolve, reject) => {
            db.run(sql, (err) => {
                if (err) {
                    console.error(err.message);
                    return 0;
                }
                console.log(`\x1b[32mTable named "${table}" dropped without error\x1b[0m`);
                resolve();
                return 1;
            })
        })
    } else {
        return new Promise((resolve, reject) => {
            db.run(sql, (err) => {
                if (err) {
                    console.error(err.message);
                    return 0;
                }
                console.log(`\x1b[32mTable named "${table}" dropped without error\x1b[0m`);
                resolve();
                return 1;
            })
        })
    }
}