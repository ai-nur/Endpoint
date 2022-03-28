const sql = require("./db");

const Users = function (users) {
  this.name = users.name;
  this.password = users.password;
  this.active = users.active;
};

Users.create = (newUsers, result) => {
  sql.query("INSERT INTO users SET ?", newUsers, (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    console.log("Created User: ", { id: res.insertId, ...newUsers });
    result(null, { id: res.insertId, ...newUsers });
  });
};
Users.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      comsole.log("error", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Users.getAll = (name, result) => {
  let query = "SELECT * FROM users";
  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("users: ", res);
    result(null, res);
  });
};
Users.getAllActive = (result) => {
  sql.query("SELECT * FROM users WHERE active=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("users: ", res);
    result(null, res);
  });
};
Users.updateById = (id, users, result) => {
  sql.query(
    "UPDATE users SET name = ?, password = ?, active = ? WHERE id = ?",
    [users.name, users.password, users.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated user: ", { id: id, ...users });
      result(null, { id: id, ...users });
    }
  );
};
Users.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted user with id: ", id);
    result(null, res);
  });
};
Users.removeAll = (result) => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};
module.exports = Users;
