const jwt = require('jsonwebtoken');

let authToken = {
    createToken: async (param) => {
        return await jwt.sign(param, 'secrect_key');
    },
    verifyToken: async (token) => {
        await jwt.verify(token, 'secrect_key', function(err, decoded) {
            if(decoded && decoded !== "null" && decoded !== "undefined") {
                return true;
            } else {
                return false;
            }
        });
    },
}

module.exports = authToken;