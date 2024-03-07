import Order             from "../../models/Order.js";
import mappers           from "../utils/mappers.js";

const listOrder = async function listOrder ({ query }) {

    const arrOrders = [];

    const orders = await Order.listOrdersGraphql(query);

    if( !orders ){
        return {
            data: arrOrders,
            page_info: {
                endCursor: 'string',
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: 'string',
            } };
    }
    for ( const value of orders.order_info ){
        const  generateOrderListMappers = mappers.generateOrderListMappers( value, JSON.parse(value.metafield.value || '{}') );
        arrOrders.push( generateOrderListMappers );
    }
    return {
        data: arrOrders,
        page_info: orders.page_info
    };


};

export default listOrder;
