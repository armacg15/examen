// middlewares/auth.js
module.exports = (req, res, next) => {
    if (req.session.user) {
        // Usuario autenticado, continuar
        return next();
    }
    // Redirigir al login si no está autenticado
    res.redirect('/login');
};