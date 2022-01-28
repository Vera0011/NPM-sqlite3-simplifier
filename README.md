# SQLite Simplifier for NodeJS

# ¿How it works?

This package was made to simplify the SQLite functions (although, their documentation is horrible, so I'm here to help you)

**Important Information:**
- The package is totally public (everyone can see the code), located in https://github.com/Vera0011/NPM-sqlite3-simplifier.git
- The package **INCLUDES SQLite3 AND SQLCypher**
- If you liked the package, leave a star in the repository, please!
- Tha package is made to have different options, that we will see down here

## Starting

**1-** First of all, you need to install the package, like this:
```
npm i @veraa/npm-sqlite3-simplifier
```

**2-** Import in your code the functions (you can just import those you need):
```js
const {databaseLoad, databaseRun, databaseGet, databaseAll, databaseClose, databaseDropTable } = require("@veraa/npm-sqlite3-simplifier");
``` 

**3-** And that's it! The functions are asynchronous, so don't forget to use __async / await__

## Configuration:
- SQLCypher is **activated** from default (to encrypt all data).
- If you want to disable SQLCypher, go to the __package.json__ of the module, and in the options section, change __"isCypherEnabled": true__ to __"isCypherEnabled": false__.
- **IF YOU USE SQLCypher, change the password, located in __package.json__ of the module, __"key"__ section** (you can change it to whatever you want).



## Functions, parameters, etc

**1-**
```js
await databaseLoad(path, databaseName);
/** 
@params
- Path (string)
Path where you want the database to get started

- databaseName (string)
The name you want for your database (set to "database.db" for default)

@Return
- If all is okay, returns 1
- If an error occures, returns 0 and a error message
*/
```

**2-**
```js
await databaseRun(sql, params);

/** 
@params
- sql (string)
SQL sentence used. Example: `CREATE TABLE IF NOT EXISTS example (example TEXT)`

- params (array of strings)
If you want to use parameters, for example: [userData, userName], use this parameter. Default is null

@Return
- If all is okay, returns 1
- If an error occures, returns 0 and a error message
*/
```

**3-**
```js
await databaseGet(sql, params);

/** 
@params
- sql (string)
SQL sentence used. Example: `INSERT INTO example VALUES (example)`

- params (array of strings)
If you want to use parameters, for example: [userData, userName], use this parameter. Default is null

@Return
- If all is okay, returns the first coincidence found in the database
- If an error occures, returns 0 and a error message
*/
```

**4-**
```js
await databaseAll(sql, params);

/** 
@params
- sql (string)
SQL sentence used. Example: `SELECT * FROM example WHERE examle="example"`

- params (array of strings)
If you want to use parameters, for example: [userData, userName], use this parameter. Default is null

@Return
- If all is okay, returns all the coincidences found in the database
- If an error occures, returns 0 and a error message
*/
```

**5-**
```js
await databaseClose();

/** 
@Return
- If all is okay, returns 1
- If an error occures, returns 0 and a error message
*/
```

**6-**
```js
await databaseDropTable(table);

/** 
@params
- table (string)
Name of the table to drop.

@Return
- If all is okay, returns 1
- If an error occures, returns 0 and a error message
*/
```