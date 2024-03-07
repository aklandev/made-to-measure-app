import Metafield       from '../../models/Metafield.js';
import Order           from '../../models/Order.js';
import mappers         from '../utils/mappers.js';
import {
    eventBlocker, findMetafieldByKey,
} from '../utils/helpers.js';
import Product         from '../../models/Product.js';
import ERROR_CODE      from "../../constants/error_codes.js";


const getMetafieldFabric = async ( product_id ) => {
    const responseProducts = await Metafield.findAll({
        owner_resource: 'products',
        owner_id: product_id,
    });
    return responseProducts
        .filter( value1 => value1.key === 'fabric' || value1.key === 'button_description')
        .map( value1 => ( { key: value1.key, value: value1.value} ));
};

const processOrderLineItems = async ( line_items ) => {
    const arrMetaobjectFabric = [];
    for ( const value of line_items ) {
        if ( value.product_id ) {
           const getMetaobject =  arrMetaobjectFabric.find( value1 => value1.product_id === value.product_id );

            if( getMetaobject ){
                arrMetaobjectFabric.push( { metafieldsProduct: getMetaobject.metafieldsProduct, product_id: value.product_id } );
            }else {
                const metafieldFabric = await getMetafieldFabric(value.product_id);
                if ( metafieldFabric.length > 0) {
                    arrMetaobjectFabric.push( { metafieldsProduct: metafieldFabric, product_id: value.product_id } );
                }
            }
        }
    }
    return arrMetaobjectFabric;
};

const processMetaobjectFabric = async ( arrMetaobjectFabric ) => {
    const result = [];
    for ( const valueMetaobjectFabric of arrMetaobjectFabric ) {
        let getMetaobjectFabricById;
        let getMetaobjectButtonById;

        const getProduct =  result.find( value1 => value1.pr.id === valueMetaobjectFabric.product_id );
        if( getProduct ){
            result.push({
                fb: getProduct.fb,
                pr: getProduct.pr,
            });
        }else {
            const fabric = valueMetaobjectFabric.metafieldsProduct.find( value => value.key === 'fabric' );
            const buttonDescription = valueMetaobjectFabric.metafieldsProduct.find( value => value.key === 'button_description' );

            if( fabric ){
                getMetaobjectFabricById = await Order.getMetaobjectById({ id: fabric.value });
            }
            if( buttonDescription ){
                getMetaobjectButtonById = await Order.getMetaobjectById({ id: buttonDescription.value });
            }

            await eventBlocker(1);
            const getProductById = await Product.getProductById({ id: valueMetaobjectFabric.product_id });
            const valueGetMetaobjectButtonById = getMetaobjectButtonById ? getMetaobjectButtonById.metaobject.fields : [];
            const valueGetMetaobjectFabricById = getMetaobjectFabricById ? getMetaobjectFabricById.metaobject.fields : [];
            result.push({
                fb: [ ...valueGetMetaobjectFabricById, ...valueGetMetaobjectButtonById ],
                pr: getProductById,
            });
        }

    }
    return result;
};

const orderDetails = async function orderDetails({ params }) {
    let arrProduct = [];

    const paramsOrder = {
        query: `tag:PublicId-${ params.id }`,
        limit: 2,
    };

    const order = await Order.findOne( paramsOrder );
    if( !order ){
        throw {
            type: ERROR_CODE.badRequest,
            message: 'Order Not Found'
        };
    }
    const metafieldsCustomer= await Metafield.findAll( {
        owner_resource: 'customers',
        namespace: 'custom',
        owner_id: order.customer.id,
    } );

    const additionalInfo= findMetafieldByKey( metafieldsCustomer, 'additional_info' );

    const metafieldsOrder= await Metafield.findAll( {
        owner_resource: 'order',
        namespace: 'custom',
        owner_id: order.id,
    } );

    const detailsInfo= findMetafieldByKey( metafieldsOrder, 'details_info' );

    const arrMetaobjectFabric = await processOrderLineItems( order.line_items );

    const metafieldAdditionalInfo = JSON.parse(additionalInfo.value || '{}');
    const metafieldDetailsInfo = JSON.parse(detailsInfo.value || '{}');
    if (arrMetaobjectFabric.length > 0) {
        arrProduct = await processMetaobjectFabric( arrMetaobjectFabric );
    }

    const generateOrderDetailsMappers = mappers.generateOrderDetailsMappers( order, metafieldAdditionalInfo, arrProduct, metafieldDetailsInfo );

    return { data: generateOrderDetailsMappers };
};

export default orderDetails;
