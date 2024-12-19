// middleware/isAuthenticated.js
module.exports = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.redirect('/login'); // Si no está autenticado, redirige a login
    }
    next(); // Si está autenticado, permite el acceso
};