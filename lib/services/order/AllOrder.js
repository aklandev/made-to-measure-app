import Order             from "../../models/Order.js";
import { eventBlocker }  from "../utils/helpers.js";
import Metafield         from "../../models/Metafield.js";
import mappers           from "../utils/mappers.js";

const listAllOrder = async function listAllOrder ({ query }) {

    const arrOrders = [];

    const orders = await Order.listOrdersGraphqlTest(query);

    if( !orders ){
        return {
            data: arrOrders
        };
    }

    for ( const value of orders ){
        const  generateOrderListMappers = mappers.generateOrderListMappers( value, JSON.parse(value.metafield?.value || '{}') );
        arrOrders.push( generateOrderListMappers );

    }

    return { data:
            arrOrders.sort((a, b)=>new Date(b.update_order_status)-new Date(a.update_order_status))
    };

};

export default listAllOrder;
