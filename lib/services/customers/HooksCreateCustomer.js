import mappers    from "../utils/mappers.js";
import Metafield  from "../../models/Metafield.js";
import Customer   from "../../models/Customer.js";

const hooksCreateCustomer = async function hooksCreateCustomer({ body }) {
    try {
        await Customer.update( body.id,{ tags: ['TagCustomCustomer','ProfileCompleted-false'] })

        const measurementMetafieldCreateMappers =  mappers.measurementMetafieldCreateMappersHooksCreateCustomer( body.id )

        const metafieldCreateProfileCompleted =  mappers.metafieldCreateProfileCompleted( body.id , false );

        await Promise.all([
            Metafield.create( metafieldCreateProfileCompleted ),
            Metafield.create( measurementMetafieldCreateMappers )
        ]);

        return { data: 'Successful' };


    } catch( error ) {
        console.log(' - hooksCreateCustomer - ');
        console.error('ERROR', error.response?.body?.errors || error.response?.data?.errors || error);

        throw error;
    }
};

export default hooksCreateCustomer;
