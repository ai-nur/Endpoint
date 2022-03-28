module.exports = (app) => {
  const users = require("../controllers/controller.js");
  var router = require("express").Router();

  app.use("/api/users", router);

  // Create user
  router.post("/", users.create);
  // Show all users
  router.get("/", users.findAll);
  // Show all actived users
  router.get("/actived", users.findAllActive);
  // Show user by id
  router.get("/:id", users.findOne);
  // Update user
  router.put("/:id", users.update);
  // Delete user by id
  router.delete("/:id", users.delete);
  // Delete all users
  router.delete("/", users.deleteAll);
};
