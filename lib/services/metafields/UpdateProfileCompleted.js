import Metafield                from '../../models/Metafield.js'; // .js
import {filterOrderOldTags, findMetafieldByKey} from "../utils/helpers.js";
import { dumpMetafield } from "../utils/dump.js";
import mappers from "../utils/mappers.js";
import Customer from "../../models/Customer.js";


const metafieldUpdateProfileCompleted = async function metafieldUpdateProfileCompleted({ body }) {
    let responseUpdate;
    const params = {
        owner_resource: 'customers',
        namespace: 'custom',
        owner_id: body.data.owner_id,
    };

    const response = await Metafield.findAll( params );
    const profileCompleted = findMetafieldByKey( response, 'profile_completed' );
    const customer = await Customer.findOne( body.data.owner_id );
    if(!profileCompleted){
        const metafieldCreateProfileCompleted =  mappers.metafieldCreateProfileCompleted( body.data.owner_id,body.data.flag );
        responseUpdate = await Metafield.create( metafieldCreateProfileCompleted );
        const oldTags = filterOrderOldTags( customer.tags.split(', '),'ProfileCompleted' )
        await Customer.update(
            body.data.owner_id,
            {
                    tags: [ ...oldTags, `ProfileCompleted-${body.data.flag}`]
            }
        )

    }else {
        const oldTags = filterOrderOldTags( customer.tags.split(', '),'ProfileCompleted' )
        await Customer.update(
            body.data.owner_id,
            {
                tags: [ ...oldTags, `ProfileCompleted-${body.data.flag}`]

            }
        )
        responseUpdate = await Metafield.update( profileCompleted.id, {value:body.data.flag } );
    }

    return { data: dumpMetafield( responseUpdate ) };
};

export default metafieldUpdateProfileCompleted;
