exports.checkProjectPostValidator = (req, res, next) => {
    // ID checks
    req.check('id', 'Inform the ID').notEmpty();

    // Name Checks
    req.check('name', 'Inform the project title').notEmpty()
    req.check('name', 'Title must be between 4 to 100 characters!').isLength({
        min:4,
        max:100
    })

    // Any others errors checks
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError});
    }

    // Proceed to next middleware
    return next();
}