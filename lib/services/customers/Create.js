import Customer                from '../../models/Customer.js'; // .js
import runValidation            from '../../LIVRvalidation.js'; // .js
import { dumpCustomer }        from '../utils/dump.js'; // .js
import { CUSTOMER_CREATE }     from '../utils/validationRules.js'; // .js

const rules = {
    data : [ 'required', { 'nested_object' : {
        ...CUSTOMER_CREATE
    } } ]
};

const customerCreate = async function customerCreate({ body }) {
    const data = runValidation( rules, body );

    const response = await Customer.create( data );

    return { data: dumpCustomer( response ) };
};

export default customerCreate;
