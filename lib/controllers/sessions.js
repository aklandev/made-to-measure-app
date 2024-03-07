import serviceRunner    from '../serviceRunner.js'; // .js
import createSession    from '../services/sessions/Create.js'; // .js
import verifySession    from '../services/sessions/Verify.js'; // .js
import ERROR_CODE       from '../constants/error_codes.js'; // .js

export default {
    create: serviceRunner( createSession ),
    verify( req, res, next ) {
        try {
            const token = req.get('X-AuthToken');

            if ( !token || token.trim().length === 0 ) {
                throw {
                    type    : ERROR_CODE.forbidden,
                    message : 'X-AuthToken required'
                };
            } 
            
            verifySession({ token });
            next();
                
        } catch( error ) {
            if ( error.type === ERROR_CODE.forbidden) {
                const validationError = {
                    status : 0,
                    error  : {
                        code    : error.type,
                        message : error.message
                    }
                };
                res.status(403).send( validationError );
            } else {
                const commonError = {
                    status : 0,
                    error  : {
                        code    : ERROR_CODE.serverError,
                        message : error.message ? error.message : error
                    }
                };
                res.status(500).send( commonError );
            }
        }
    }
};

