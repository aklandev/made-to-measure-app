import Customer                from '../../models/Customer.js'; // .js
import Metafield               from '../../models/Metafield.js'; // .js
import { dumpCustomer }        from '../utils/dump.js';
import {findMetafieldByKey} from "../utils/helpers.js"; // .js

const customerGet = async function customerGet({ params }) {
    const metafieldParams = { 
        namespace: 'custom',
        owner_resource: 'customers',
        owner_id: params.id
    };

    const [ customer, metafields ] = await Promise.all([
        Customer.findOne( params.id ),
        Metafield.findAll( metafieldParams ),
    ]);
    const additionalInfo = findMetafieldByKey( metafields, 'additional_info' );

    customer.metafield = additionalInfo;
    return { data: dumpCustomer( customer ) };
};

export default customerGet;
