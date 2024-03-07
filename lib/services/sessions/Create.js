import jwt              from 'jsonwebtoken';

import runValidation    from '../../LIVRvalidation.js'; // .js
import { dumpJWT }      from '../utils/dump.js'; // .js

import {
    STORE_NAME,
    JWT_SECRET,
    ADMIN_PASSWORD
}   from '../../config.js'; // .js

const rules = {
    data : [ 'required', { 'nested_object' : {
        password : [ 'trim', 'required', 'string', { 'min_length': 8 }, { 'max_length': 255 } ]
    } } ]
};

const createSession = async function createSession({ body }) {
    try {

        const data = runValidation( rules, body );

        if ( data.password !== ADMIN_PASSWORD ) {
            throw {
                type: 'NOT_FOUND',
                message : 'wrong password'
            };
        }

        const userData = {
            name: 'Admin',
            storeName: STORE_NAME
        };

        const jwtToken = jwt.sign({
            data: dumpJWT( userData )
        }, JWT_SECRET, { expiresIn: '1h' });

        return {
            data: { jwtToken }
        };
    } catch ( error ) {
        console.error('ERROR', error.response || error);
        
        throw error;
    }
};

export default createSession;
