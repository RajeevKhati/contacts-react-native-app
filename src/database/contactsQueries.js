import * as SQLite from "expo-sqlite";
import db from "./index";

const tableName = "contacts";

export const createTable = () => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      mobile TEXT NOT NULL,
      landline TEXT,
      favorite INTEGER NOT NULL,
      image BLOB
    );`;

  db.transaction((tx) => {
    tx.executeSql(query);
    console.log("Database table created");
  });
};

export const getContacts = () => {
  try {
    // const todoItems: ToDoItem[] = [];
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `SELECT * FROM ${tableName}`,
            [],
            (_, { rows: { _array } }) => {
              resolve(_array);
            }
          );
        },
        (error) => reject(error)
      );
    });
  } catch (error) {
    console.log(error.message);
    throw Error("Failed to get contacts !!!");
  }
};

export const getContact = (id) => {
  try {
    // const todoItems: ToDoItem[] = [];
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `SELECT * FROM ${tableName} WHERE id = ${id}`,
            [],
            (_, { rows: { _array } }) => {
              resolve(_array);
            }
          );
        },
        (error) => reject(error)
      );
    });
  } catch (error) {
    console.log(error.message);
    throw Error("Failed to get contacts !!!");
  }
};

export const saveContact = ({ name, mobile, landline, favorite, image }) => {
  try {
    return new Promise((resolve, reject) => {
      const insertQuery = `INSERT INTO ${tableName}(name,mobile,landline,favorite,image) values (?,?,?,?,?)`;
      db.transaction(
        (tx) => {
          tx.executeSql(
            insertQuery,
            [name, mobile, landline, favorite, image],
            (_, { insertId }) => {
              resolve(insertId);
            }
          );
          //   tx.executeSql(`select * from ${tableName}`, [], (_, { rows }) =>
          //     console.log(JSON.stringify(rows))
          //   );
        },
        (error) => reject(error)
      );
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteContact = (id) => {
  try {
    return new Promise((resolve, reject) => {
      const deleteQuery = `DELETE from ${tableName} where id = ${id}`;
      db.transaction(
        (tx) => {
          tx.executeSql(deleteQuery, [], (_, { rowsAffected }) =>
            resolve(rowsAffected)
          );
        },
        (error) => reject(error)
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateContact = (
  id,
  { name, mobile, landline, favorite, image }
) => {
  try {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `UPDATE ${tableName} set name = ?, mobile = ?, landline = ?, favorite =?, image=? where id = ?;`,
            [name, mobile, landline, favorite, image, id],
            (_, { insertId }) => {
              resolve(insertId);
            }
          );
        },
        (error) => reject(error)
      );
    });
  } catch (error) {
    console.log(error);
  }
};
