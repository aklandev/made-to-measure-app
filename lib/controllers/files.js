import serviceRunner    from '../serviceRunner.js';
import fileDelete       from '../services/files/Delete.js';
import fileUpload       from '../services/files/Upload.js';
import ERROR_CODE       from '../constants/error_codes.js';

export default {
    upload( req, res ) {
        try { 
            req.busboy.on('file', (fieldname, file, fileinfo) => {
                const params = {
                    fieldname, file, ...fileinfo
                };
    
                fileUpload({ params })
                    .then(( data ) => {
                        res.status(200).send( data );
                    })
                    .catch(( error ) => {
                        console.error( error );
                        const responseStatus = 500; 
                        const responseError = {
                            status : 0,
                            error  : {
                                code    : ERROR_CODE.serverError,
                                message : error.message ? error.message : error
                            }
                        };
        
                        res.status( responseStatus ).send( responseError );
                    });
            });
    
            req.pipe( req.busboy );
        } catch ( error ) {
            console.error( error );
            const responseStatus = 500; 
            const responseError = {
                status : 0,
                error  : {
                    code    : ERROR_CODE.serverError,
                    message : error.message ? error.message : error
                }
            };

            res.status( responseStatus ).send( responseError );
        }
        
    },
    delete: serviceRunner( fileDelete )
};

