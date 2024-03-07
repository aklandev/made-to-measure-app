import Order      from "../../models/Order.js";
import mappers    from "../utils/mappers.js";
import Metafield  from "../../models/Metafield.js";

const hooksCreateOrder = async function hooksCreateOrder({ body }) {
    try {
        let updateOrder;
        const getNoteAttributes = body.note_attributes.find( value => value.name === 'Date finish order' );

        if( getNoteAttributes ){
            const createMetafieldDetailsInfoOrderMappers =  mappers.createMetafieldDetailsInfoOrderHookMappers( body.id , new Date( getNoteAttributes.value ) );

            await Metafield.create( createMetafieldDetailsInfoOrderMappers.metafield );

            updateOrder = await Order.update({
                id: body.id,
                value: {
                    tags: createMetafieldDetailsInfoOrderMappers.tags
                }
            })
        }


        return { data: updateOrder };

    } catch( error ) {
        console.log(' - hookCreateOrder - ');
        console.error('ERROR', error.response?.body?.errors || error.response?.data?.errors || error);

        throw error;
    }
};

export default hooksCreateOrder;
