const { existEmail } = require('../services/personaService');

module.exports = async (req, res, next) => {
    try {
        await existEmail(req.body.email);
        next();
    } catch (e) {
        res.status(400).send(e.message)
    }
}