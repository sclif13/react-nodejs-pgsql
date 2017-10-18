const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/login", (req, res, next) => {
  console.log(req.body);
  if (req.body.login && req.body.password) {
    db.one("SELECT * FROM users WHERE login = $1 AND password = $2", [req.body.login, req.body.password])
      .then(data => {
        const token = jwt.sign({ login: req.body.login }, "nsdcushdihihfuhue");
        res.json({ token: token });
      })
      .catch(e => {
        console.error(e);
        res.status(403).json({ message: "Wrong login or password" })
      });
  } else {
    res.status(403).json({ message: "Wrong login or password" });
  }
});


module.exports = router;
