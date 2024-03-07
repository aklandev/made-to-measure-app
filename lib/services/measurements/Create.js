import Metafield                      from '../../models/Metafield.js';
import runValidation                  from '../../LIVRvalidation.js';
import { measurementMetafieldCreate } from '../utils/validationRules.js';
import mappers                        from '../utils/mappers.js';
import Customer from "../../models/Customer.js";
import ERROR_CODE from "../../constants/error_codes.js";


const measurementCreate = async function measurementCreate ({ body }) {
    const rules = {
        data : [ 'required', { 'nested_object' : {
                customer_id: [ 'required', 'number' ],
                ...measurementMetafieldCreate(body.data.additional_info.gender)
            } } ]
    };

    const data = runValidation( rules, body );

    const customer = await Customer.findOne(data.customer_id)

    if(!customer){
        throw {
            type: ERROR_CODE.notFound,
            message: 'Customer Not Found'
        };
    }

    await Customer.update(customer.id,{tags:[...customer.tags.split(', '),'TagCustomCustomer']})

    const measurementMetafieldCreateMappers =  mappers.measurementMetafieldCreateMappers(data)

    const response = await Metafield.create( measurementMetafieldCreateMappers );

    return { data: response };
};

export default measurementCreate;
