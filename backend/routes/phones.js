const express = require('express');
const router = express.Router();
const db = require('../db');
const checkToken = require('../middleware/checkToken');

router.get("/", checkToken, (req, res, next) => {
    db.any("SELECT * FROM phones")
        .then(data => {
            res.json(data);
        })
        .catch(e => {
            console.error(e);
            res.status(404).json({ message: "Not found" });
        });
});

router.get("/phone/:id", (req, res, next) => {
    if (req.params.id && /^\d+$/.test(req.params.id)) {
        db.one("SELECT * FROM phones WHERE phone = $1", [req.params.id])
            .then(data => {
                res.json(data);
            })
            .catch(e => {
                console.error(e);
                res.status(404).json({ message: "Not found" });
            });
    } else {
        res.status(403).json({ message: "Wrong phone" });
    }
});

router.post("/phone", checkToken, (req, res, next) => {
    if (req.body.phone && /^\d+/.test(req.body.phone)) {
        db.one("INSERT INTO phones(phone) VALUES($1) RETURNING *", [req.body.phone])
            .then(data => {
                res.json(data);
            })
            .catch(e => {
                console.error(e);
                res.status(500).json({ message: "Bad request" })
            });
    } else {
        res.status(403).json({ message: "Wrong phone" });
    }
});

router.delete("/phone/:id", checkToken, (req, res, next) => {
    if (req.params.id && /^\d+/.test(req.params.id)) {
        db.result("DELETE FROM phones WHERE id = $1", [req.params.id])
            .then(result => {
                res.json({ "deleted": result.rowCount });
            })
            .catch(e => {
                console.error(e);
                res.status(500).json({ message: "Bad request" })
            });
    } else {
        res.status(403).json({ message: "Wrong id" });
    }
});

module.exports = router;
