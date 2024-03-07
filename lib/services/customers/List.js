import Customer                  from '../../models/Customer.js'; // .js
import { dumpCustomer }          from '../utils/dump.js';


const customerList = async function customerList({ query }) {

    const response = await Customer.listAll( query );
    const data = response.items.map( dumpCustomer );

    return { data,page_info:response.page_info };
};

export default customerList;


