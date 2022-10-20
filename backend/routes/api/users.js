const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max:255 })
    .withMessage("First Name is required"),
 check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max:100 })
    .withMessage("First Name must be between 1 and 100 characters"),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
   check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max:100 })
    .withMessage("Last Name must be between 1 and 100 characters"),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .isLength({ min: 4, max: 200 })
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4, max: 50 })
    .withMessage('Please provide a username between 4 and 50 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6, max: 30})
    .withMessage('Password must be 6 and 30 characters.'),
  handleValidationErrors
];


router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    const user = await User.signup({ email, username, password, firstName, lastName });
    const id = user.id
    const token = await setTokenCookie(res, user);
    return res.json(
      {id, email, password, username, firstName, lastName, token }
    );
  }
);




module.exports = router;
