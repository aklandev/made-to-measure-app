import Metafield                from '../../models/Metafield.js'; // .js
import runValidation            from '../../LIVRvalidation.js'; // .js
import { dumpMetafield }        from '../utils/dump.js'; // .js
import { METAFIELD_GET_QUERY }  from '../utils/validationRules.js';
import { findMetafieldByKey }   from "../utils/helpers.js"; // .js

const rules = {
    data : [ 'required', { 'nested_object' : {
        ...METAFIELD_GET_QUERY
    } } ]
};

const metafieldGet = async function metafieldGet({ query }) {
    const data = runValidation( rules, { data: query } );
    const params = { ...data };

    const response = await Metafield.findAll( params );
    const additionalInfo = findMetafieldByKey( response, 'additional_info' );
    const responseData = additionalInfo ? dumpMetafield( additionalInfo ) : {};

    
    responseData.value = JSON.parse(responseData.value || '{}');

    return { data: responseData };
};

export default metafieldGet;
