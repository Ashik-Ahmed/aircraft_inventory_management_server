module.exports = (...role) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (!role.includes(userRole)) {
            return res.status(403).json({
                status: 'Failed',
                error: 'You are not authorized to perform this action'
            })
        }

        next();
    }
}