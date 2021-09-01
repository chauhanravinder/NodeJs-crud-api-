const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

// get all records
// async for not lock the process
router.get("/", UsersController.getAllUsers);

// get paginated result
router.get("/paginated", UsersController.getPaginatedResults);

// for get specific user
router.get("/:id", UsersController.getUserById);

// for create user
router.post("/", UsersController.createUser);

// update
router.patch("/:id", UsersController.updateUser);

// delete record
router.delete("/:id", UsersController.deleteUser);

module.exports = router;
