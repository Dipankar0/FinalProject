const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const AtUser = require("../../models/AtUser");

const validateAtRegisterInput = require("../../validation/atRegister");
const validateLoginInput = require("../../validation/login");

router.post("/atRegister", (req, res) => {
  const { errors, isValid } = validateAtRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  AtUser.findOne({ email: req.body.email }).then(atUser => {
    if (atUser) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new AtUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone_no: req.body.phone_no,
        code: req.body.code
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(atUser => res.json(atUser))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/atLogin", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  AtUser.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = { id: user.id, name: user.name };
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    }
  });
});

module.exports = router;
