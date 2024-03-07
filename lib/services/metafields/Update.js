import Metafield                from '../../models/Metafield.js'; // .js
import { dumpMetafield,pick }   from '../utils/dump.js'; // .js
import { metafieldUpdateAdmin } from '../utils/validationRules.js'; // .js
import runValidation            from '../../LIVRvalidation.js'; // .js
import { findMetafieldByKey }     from "../utils/helpers.js"; // .js



const metafieldUpdate = async function metafieldUpdate({ body }) {
    const rules = {
        data : [ 'required', { 'nested_object' : {
                ...metafieldUpdateAdmin( body.data.value.additional_info.gender )
            } } ]
    };

    const data = runValidation( rules, body );
    const params = pick( data, [ 'namespace', 'owner_resource', 'owner_id' ] );

    const metafields= await Metafield.findAll( params );
    const isAdditionalInfoExist = findMetafieldByKey( metafields, 'additional_info' );
    if ( !isAdditionalInfoExist ) {
        throw {
            type: 'NOT_FOUND',
            message: 'metafield absent'
        }; 
    }

    const response = await Metafield.update( isAdditionalInfoExist.id, {value:JSON.stringify(data.value)} );

    return { data: dumpMetafield( response ) };
};

export default metafieldUpdate;
