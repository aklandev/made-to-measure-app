import Customer                from '../../models/Customer.js'; // .js
import runValidation           from '../../LIVRvalidation.js'; // .js
import { dumpCustomer }        from '../utils/dump.js'; // .js
import { CUSTOMER_UPDATE }     from '../utils/validationRules.js'; // .js

const rules = {
    data : [ 'required', { 'nested_object' : {
        ...CUSTOMER_UPDATE
    } } ]
};

const customerUpdate = async function customerUpdate({ body, params }) {
    const data = runValidation( rules, body );

    const response = await Customer.update( params.id, data );

    return { data: dumpCustomer( response ) };
};

export default customerUpdate;
