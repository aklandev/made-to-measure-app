import Metafield                      from '../../models/Metafield.js';
import runValidation                  from '../../LIVRvalidation.js';
import mappers                        from '../utils/mappers.js';
import Order                          from "../../models/Order.js";


const createRequiredDateOrder = async function createRequiredDateOrder ({ body,params }) {
    const rules = {
        data : [ 'required', { 'nested_object' : {
                required_date: [ 'required', 'number' ],
            } } ]
    };

    const data = runValidation( rules, body );

    const order = await Order.findOneGetId({ id: params.id });

    const createMetafieldDetailsInfoOrderMappers =  mappers.createMetafieldDetailsInfoOrderMappers( order.id , data.required_date );

    const response = await Metafield.create( createMetafieldDetailsInfoOrderMappers.metafield );

    await Order.update({
        id: order.id,
        value: {
            tags: createMetafieldDetailsInfoOrderMappers.tags
        }
    })
    return { data: response };
};

export default createRequiredDateOrder;
