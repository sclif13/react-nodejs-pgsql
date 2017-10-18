const jwt = require('jsonwebtoken');

const chekToken = (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
        return res.status(403).json({ message: "No token !!!" })
    }

    try {
        const tokenObj = jwt.verify(token, "nsdcushdihihfuhue")
    } catch ({ message }) {
        return res.status(403).json({ message })
    }
    next();
}

module.exports = chekToken;