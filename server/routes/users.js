var express = require('express');
var router = express.Router();

// Create sample user data
let users = new Map();
users.set(1, { id: 1, firstName: 'John', lastName: 'Doe' });
users.set(2, { id: 2, firstName: 'Jane', lastName: 'Doe' });

/* Get users listing. */
router.get('/', function (req, res, next) {
  res.send(Array.from(users.values()));
});

/* Get a specific user by ID. */
router.get('/:id', function (req, res, next) {
  const userId = parseInt(req.params.id);
  const user = users.get(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

/* Create a new user. */
router.post('/', function (req, res, next) {
  let newUser = req.body;
  if (!newUser.firstName || !newUser.lastName) {
    res.status(400).json({ message: 'Full Name is required' });
    return;
  }

  newUser["id"] = users.size + 1;
  users.set(newUser.id, newUser);
  res.status(201).json(newUser);
});

/*  Update the user with new user data. 
* Note: Put method entirely replaces existing user data with new user data.
*/
router.put('/:id', function (req, res, next) {
  const userId = parseInt(req.params.id);
  const user = users.get(userId);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  let newUser = req.body;
  newUser["id"] = userId;
  if (!newUser.firstName || !newUser.lastName) {
    res.status(400).json({ message: 'Full Name is required' });
    return;
  }

  users.set(userId, newUser);
  res.json(newUser);
});

/* Update the user with new user data.
* Note: Patch method merges the new user data with existing user data.
*/
router.patch('/:id', function (req, res, next) {
  const userId = parseInt(req.params.id);
  const user = users.get(userId);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  let userData = req.body;
  userData["id"] = userId;
  const newUser = {
    ...user,
    ...userData
  }
  users.set(userId, newUser);
  res.json(newUser);
});

/* Delets a user by ID. */
router.delete('/:id', function (req, res, next) {
  const userId = parseInt(req.params.id);
  const isUserExists = users.has(userId);

  if (!isUserExists) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const isUserDeleted = users.delete(userId);
  if (isUserDeleted) {
    res.json({ message: 'User deleted successfully' });
  } else {
    res.status(404).json({ message: 'Unable to delete user' });
  }
});

module.exports = router;
