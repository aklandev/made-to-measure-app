import { filterOrderTagsById } from "./helpers.js";

const pick = function pick( obj, arr ) {
    return  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});
};

const dumpMetafield = function dumpMetafield ( metafield ) {
    const dump = [
        'id',
        'type',
        'namespace',
        'key',
        'value',
        'owner_id',
        'owner_resource'
    ];

    return pick( metafield, dump );
};

const dumpJWT = function dumpJWT ( user ) {
    const dump = [
        'name',
        'storeName'
    ];

    return pick( user, dump );
};

const dumpCustomer = function dumpCustomer ( customer ) {
    if ( customer.metafield ) {
        customer.metafield = dumpMetafield( customer.metafield );
    }
    const tagsByKey = filterOrderTagsById( customer.tags.split(', '),'ProfileCompleted' )[0]

    const dump = {
        id                  : customer.id, 
        email               : customer.email, 
        accepts_marketing   : customer.accepts_marketing, 
        created_at          : customer.created_at, 
        updated_at          : customer.updated_at, 
        first_name          : customer.first_name, 
        last_name           : customer.last_name, 
        orders_count        : customer.orders_count, 
        state               : customer.state, 
        total_spent         : customer.total_spent, 
        last_order_id       : customer.last_order_id,
        note                : customer.note, 
        phone               : customer.phone,
        profile_completed   : tagsByKey ? tagsByKey.split('-')[1] === 'true':false ,
        metafield           : customer.metafield, 
        city                : customer.addresses.length > 0 ? customer.default_address.city : null,
        province_code       : customer.addresses.length > 0 ? customer.default_address.province_code : null,
        country_name        : customer.addresses.length > 0 ? customer.default_address.country_name : null
    }

    return dump;
};

export {
    pick,
    dumpMetafield,
    dumpJWT,
    dumpCustomer
};
