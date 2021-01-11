const { Router } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcript = require("bcrypt");
const user = require("../models/user");

// /////////////////////////////////////Api//////////////////

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    res.json({ error: "massage is dle" });
  }

  User.findOne({ email: email })

    .then((saveduser) => {
      if (saveduser) {
        res.json({ error: "this eemailid already exit" });
      }

      bcript
        .hash(password, 12)
        .then((hashpassword) => {
          const user = new User({
            name,
            email,
            password: hashpassword,
          });
          user
            .save()
            .then((user) => {
              res.json({ massage: "all data save" });
            })
            .catch((err) => {
              res.json({ error: "this some error" });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })

    .catch((err) => {
      console.log(err);
    });
});

// /////////////////////////////////////Api//////////////////

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.json({ error: "somthing error" });
  }

  user
    .findOne({ email: email })
    .then((savedata) => {
      if (!savedata) {
        res.json({ error: "invalid email id" });
      }
      bcript
        .compare(password, savedata.password)
        .then((DoMatch) => {
          if (!DoMatch) {
            res.json({ error: "invalid email or password " });
          }
        })
        .catch((err) => {
          res.json({ error: "somthin els" });
        });
    })

    .catch((error) => {
      res.json({ error: "somthing worng" });
    });
});

module.exports = router;
