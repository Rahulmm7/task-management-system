const { check, validationResult } = require('express-validator');

exports.validateUserCreate = [
    check('username')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User name can not be empty!')
        .bail()
        .isLength({ min: 2 })
        .withMessage('Minimum 2 characters required!')
        .bail(),
    check('email')
        .trim()
        .not()
        .isEmpty()
        .withMessage('email cannot be empty!')
        .isEmail()
        .withMessage('enter valid email')
        .bail(),
    check('password')
        .not()
        .isEmpty()
        .withMessage('User name can not be empty!')
        .isLength({ min: 6 })
        .withMessage('Minimum 6 characters required!'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

exports.validateUserLogin = [

    check('email')
        .trim()
        .not()
        .isEmpty()
        .withMessage('email cannot be empty!')
        .isEmail()
        .withMessage('enter valid email')
        .bail(),
    check('password')
        .not()
        .isEmpty()
        .withMessage('User name can not be empty!')
        .isLength({ min: 6 })
        .withMessage('Minimum 6 characters required!'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

exports.validateCreateTask = [
    check('id')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User id can not be empty!')
        .bail(),
    check('title')
        .not()
        .isEmpty()
        .withMessage('title can not be empty!'),
    check('scheduledAt')
        .not()
        .isEmpty()
        .withMessage('scheduled time can not be empty!'),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];
exports.validateCreatesubTask = [
    check('id')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User id can not be empty!')
        .bail(),
    check('taskID')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('task id can not be empty!')
        .bail(),
    check('title')
        .not()
        .isEmpty()
        .withMessage('title can not be empty!'),
    check('scheduledAt')
        .not()
        .isEmpty()
        .withMessage('scheduled time can not be empty!'),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];



exports.validateTaskUpdate = [
    check('taskID',)
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage(' id can not be empty!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

exports.validatesubtaskUpdate = [
    check('subTaskID',)
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage(' id can not be empty!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];
