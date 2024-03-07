import ERROR_CODE from './constants/error_codes.js'; // .js

export function serviceRunner( serviceFunction ) {
    return function runService ( req, res ) {
        const reqCollection = {
            body: req.body,
            params: req.params,
            query: req.query
        };

        serviceFunction( reqCollection )
            .then(( data ) => {
                res.status(200).send( data );
            })
            .catch(( error ) => {
                console.error( error );
                let responseStatus = 500; 
                const responseError = {
                    status : 0,
                    error  : {}
                };
                switch( error.type ) {
                    case ERROR_CODE.nonvalid:
                        responseError.error = {
                            code    : error.type,
                            message : error.message
                        };
                        responseStatus = 400;
                        break;

                    case ERROR_CODE.notFound:
                        responseError.error = {
                            code    : error.type,
                            message : error.message
                        };
                        responseStatus = 404;
                        break;

                    case ERROR_CODE.alreadyExist:
                        responseError.error = {
                            code    : error.type,
                            message : error.message
                        };
                        responseStatus = 409;
                        break;

                    default:
                        responseError.error = {
                            code    : ERROR_CODE.serverError,
                            message : error.message ? error.message : error
                        };
                        responseStatus = 500;
                        break;
                }

                res.status( responseStatus ).send( responseError );
            });
    };
};

export default serviceRunner;
