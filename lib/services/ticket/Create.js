import runValidation            from '../../LIVRvalidation.js'; // .js
import mappers                  from '../utils/mappers.js';
import GorgiasClient            from '../../GorgiasClient.js';
import { TICKET_CREATE }        from '../utils/validationRules.js';


const ticketCreate = async function ticketCreate({ body }) {
    const rules = {
        data : [ 'required', { 'nested_object' : {
                ...TICKET_CREATE,
            } } ]
    };

    const data = runValidation( rules, body );

    const requestTicket = mappers.createGorgiasTicket( data )

    const createTicket  = await GorgiasClient.post('tickets', requestTicket );

    return { data: createTicket.data };
};

export default ticketCreate;
