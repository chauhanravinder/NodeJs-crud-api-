const Users = require("../models/users");

// for create new user
exports.createUser = async (req, res) => {
  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  });

  try {
    const response_data = await user.save();
    res.json(response_data);
  } catch (err) {
    res.send(`Error : ${err}`);
  }
};

// for get all users
exports.getAllUsers = async (req, res) => {
  try {
    // const users = await Users.find().limit(2);
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.send(`Error : ${err}`);
  }
};

// for get paginated result
exports.getPaginatedResults = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skipIndex = (page - 1) * limit;
  const results = {};

  try {
    const users = await Users.find()
      .sort({ _id: 1 })
      .limit(limit)
      .skip(skipIndex)
      .exec();

    res.json(users);
  } catch (err) {
    res.send(`Error : ${err}`);
  }
};

// for get specific user by id
exports.getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      res.json({ message: "No record found" });
      return false;
    }

    res.json(user);
  } catch (err) {
    res.send(`Error : ${err}`);
  }
};

// update the user by id
exports.updateUser = async (req, res) => {
  const user = await Users.findById(req.params.id);

  if (!user) {
    res.json({ message: "No record found" });
    return false;
  }

  if (req.body.name) {
    user.name = req.body.name;
  }
  if (req.body.role) {
    user.role = req.body.role;
  }
  const response_data = await user.save();
  res.json(response_data);
};

exports.deleteUser = async (req, res) => {
  const user = Users.findById(req.params.id);
  if (!user) {
    res.json({ message: "No record found" });
    return false;
  }

  const response_data = await user.deleteOne();
  res.json(response_data);
};
