const {validation} = require('express-validator');
const msgError = (resultatVal) => {
    const [errorA] = resultatVal.array({printA: true});
    return `Property "req.body.${errorA.param}" : ${errorA.msg}. Current value = ${errorA.value}`;
};

exports.validateBody = (req) => {
    const resultatVal = validation(req);

    if (!resultatVal.isEmpty()) {
        throw new Error(msgError(resultatVal));
    }
};
