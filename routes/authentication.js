const express = require("express");
const router = express.Router();
const User = require("../models/dbModel").User;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const secret = require("../config").secret;

router.post("/register", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(userFound => {
      if (userFound) {
        return res.status(500).send("Email is already registered");
      } else {
        if (req.body.password.length < 5) {
          res.status(500).send("Invalid password");
          return;
        }
        var user = req.body;
        bcrypt.hash(user.password, 10, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          User.create(user)
            .then(user => {
              const token = jwt.sign(user.dataValues, secret);
              res.status(201).json({
                name: user.name,
                token
              });
            })
            .catch(err => {
              res.status(500).send("Data not valid: " + err);
            });
        });
      }
    })
    .catch(err => {
      res.status(500).send("Cannot connect: " + err);
    });
});

router.post("/login", (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({
        message: "Auth failed",
        error: info.message
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, secret);
      return res.json({ token, name: user.name });
    });
  })(req, res);
});

module.exports = router;
