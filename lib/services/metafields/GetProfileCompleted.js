import Metafield                from '../../models/Metafield.js'; // .js
import { findMetafieldByKey }   from "../utils/helpers.js";


const metafieldGetProfileCompleted = async function metafieldGetProfileCompleted({ query }) {

    const params = {
        owner_resource: 'customers',
        namespace: 'custom',
        owner_id: query.owner_id,
    };

    const response = await Metafield.findAll( params );
    const profileCompleted = findMetafieldByKey( response, 'profile_completed' );

    return { data: profileCompleted?profileCompleted:{value:false} };
};

export default metafieldGetProfileCompleted;
