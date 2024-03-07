import Metafield                      from '../../models/Metafield.js';
import runValidation                  from '../../LIVRvalidation.js';
import mappers                        from '../utils/mappers.js';
import Order                          from "../../models/Order.js";
import {filterOrderOldTags, findMetafieldByKey} from "../utils/helpers.js";
import ERROR_CODE                     from "../../constants/error_codes.js";


const customStatusOrderUpdate = async function customStatusOrderUpdate ({ body,params }) {
    const rules = {
        data : [ 'required', { 'nested_object' : {
                status: [ 'required', 'string' ],
            } } ]
    };

    const data = runValidation( rules, body );

    const paramsOrder = {
        query: `tag:PublicId-${ params.id }`,
        limit: 2
    };

    const order = await Order.findOne( paramsOrder );

    if( !order ){
        throw {
            type: ERROR_CODE.badRequest,
            message: 'Order Not Found'
        };
    }

    const metafieldsOrder= await Metafield.findAll( {
        owner_resource: 'order',
        namespace: 'custom',
        owner_id: order.id,
    } );

    const detailsInfo= findMetafieldByKey( metafieldsOrder, 'details_info' );
    const parsedMetafieldOrder = JSON.parse(detailsInfo.value || '{}');

    const updateMetafieldCustomStatusMappers =  mappers.updateMetafieldCustomStatusMappers( parsedMetafieldOrder, data.status );

    const response = await Metafield.update( detailsInfo.id, updateMetafieldCustomStatusMappers );

    const oldTags = filterOrderOldTags( order.tags.split(', '),'Status' )
    await Order.update({
        id: order.id,
        value: {
            tags: [ ...oldTags, `Status-${data.status.replaceAll(' ', '')}`]
        }
    })

    return {
        data: response
    };

};

export default customStatusOrderUpdate;
