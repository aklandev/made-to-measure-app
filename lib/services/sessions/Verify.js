import jwt              from 'jsonwebtoken';

import { JWT_SECRET }   from '../../config.js'; // .js
import ERROR_CODE       from '../../constants/error_codes.js'; // .js

const verifySession = function verifySession({ token }) {
    try {
        jwt.verify( token, JWT_SECRET );
    } catch ( error ) {
        throw {
            type    : ERROR_CODE.forbidden,
            message : error.message
        };
    }
};

export default verifySession;
