const User = require("../models/model.js");
// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create user
  const user = new User({
    name: req.body.name,
    password: req.body.password,
    active: req.body.active || false,
  });
  // Save user
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};
// Find user
exports.findAll = (req, res) => {
  const name = req.query.name;
  User.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};
exports.findAllActive = (req, res) => {
  User.getAllActive((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};
// Find user by id
exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
// Update user by id
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log(req.body);
  User.updateById(req.params.id, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating User with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
// Delete user by id
exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id,
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};
// Delete all users
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};
