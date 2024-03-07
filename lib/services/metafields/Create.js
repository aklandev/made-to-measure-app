import Metafield                from '../../models/Metafield.js'; // .js
import runValidation            from '../../LIVRvalidation.js'; // .js
import ERROR_CODE               from '../../constants/error_codes.js'; // .js
import { dumpMetafield, pick }  from '../utils/dump.js'; // .js
import { metafieldCreateAdmin } from '../utils/validationRules.js'; // .js
import {findMetafieldByKey} from "../utils/helpers.js"; // .js

const metafieldCreate = async function metafieldCreate({ body }) {
    const rules = {
        data : [ 'required', { 'nested_object' : {
                ...metafieldCreateAdmin( body.data.value.additional_info.gender )
            } } ]
    };

    const data = runValidation( rules, body );
    const params = pick( data, [ 'namespace', 'owner_resource', 'owner_id' ] );

    const metafields= await Metafield.findAll( params );
    const isAdditionalInfoExist = findMetafieldByKey( metafields, 'additional_info' );
    if ( isAdditionalInfoExist ) {
        throw {
            type    : ERROR_CODE.alreadyExist,
            message : `The customer's metafield with the current key already exists`
        };
    }

    data.value = JSON.stringify( data.value );

    const response = await Metafield.create( data );

    data.value = JSON.parse(data.value);

    return { data: dumpMetafield( response ) };
};

export default metafieldCreate;
