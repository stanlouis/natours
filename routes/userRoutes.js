const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const express = require('express');

const router = express.Router();

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
