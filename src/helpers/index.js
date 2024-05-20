const crypto = require('crypto');

const SECRET = 'JAMES-REST-API';

//base64 convierte el buffer en una cadena codificada en base64
const random = () => crypto.randomBytes(116).toString('base64');
const authentication = (salt, password) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
};

module.exports = {
    random,
    authentication
};
