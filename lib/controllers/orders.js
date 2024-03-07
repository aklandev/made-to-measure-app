import serviceRunner                   from '../serviceRunner.js';
import customStatusOrderUpdate         from '../services/order/UpdateCustomStatus.js';
import customPaymentStatusOrderUpdate  from '../services/order/UpdateCustomPaymentStatus.js';
import orderDetails                    from "../services/order/Details.js";
import createRequiredDateOrder         from "../services/order/CreateRequiredDate.js";
import listOrder                       from "../services/order/List.js";
import listAllOrder                    from "../services/order/AllOrder.js";
import hooksCreateOrder                from "../services/order/HooksCreateOrder.js"; // .js


export default {
    list: serviceRunner( listOrder ),
    listAll: serviceRunner( listAllOrder ),
    details: serviceRunner( orderDetails ),
    createRequiredDate: serviceRunner( createRequiredDateOrder ),
    customStatusUpdate: serviceRunner( customStatusOrderUpdate ),
    customPaymentStatusUpdate: serviceRunner( customPaymentStatusOrderUpdate ),
    hooksCreate: serviceRunner( hooksCreateOrder ),
};
