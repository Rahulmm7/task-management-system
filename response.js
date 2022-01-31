'use strict';

module.exports.successResponse = (res, data, messages) => {
    console.log(messages);
    res.send({
        success: true,
        result: data,
        messages,
    });
};

module.exports.errorResponse = (res, data, code) => {
    res.statusCode = code;
    console.log('status code', res.statusCode);
    res.send({
        success: false,
        error: data,
    });
};
