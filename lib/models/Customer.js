import ShopifyClient        from '../ShopifyClient.js'; // .js
import ERROR_CODE           from '../constants/error_codes.js';
import { buildQueryCustomer } from "../services/utils/helpers.js"; // .js

const create = async function create( data ) {
    try {
        const customer = await ShopifyClient.customer.create( data );

        return customer;
    } catch( error ) {
        console.error('ERROR', error.response?.body?.errors || error);

        throw error;
    }
};

const findOne = async function findOne( id ) {
    try {
        const customer = await ShopifyClient.customer.get( id );

        return customer;
    } catch( error ) {
        console.error('ERROR', error.response?.body?.errors || error);

        if ( error.response.statusCode === 404 ) {
            throw {
                type: ERROR_CODE.notFound,
                message: 'customer absent'
            }; 
        }

        throw error;
    }
};

const list = async function list( query ) {
    try {
        const customer = await ShopifyClient.customer.search( query );
        return customer;
    } catch( error ) {
        console.error('ERROR', error.response?.body?.errors || error);

        throw error;
    }
};
const listAll = async function listAll( query ) {
    try {
        let params = {
            limit: Number( query.limit ) ,
            query: buildQueryCustomer( query ),
        };
        let page_info = {
            prev: false,
            next: false
        }
        const arr = [];
        let increment = 0;
        const pageNumber = Number( query.page );
        do {
            increment++;
            const customer = await ShopifyClient.customer.search( params );

            page_info.next = !!customer.nextPageParameters
            page_info.prev = !!customer.previousPageParameters

            if( increment === pageNumber ){

                arr.push( ...customer  );
                break;
            }

            params = customer.nextPageParameters;

        } while ( params !== undefined );

        return {
            page_info,
            items: arr,
        };

    } catch( error ) {
        console.error('ERROR', error.response?.body?.errors || error);

        throw error;
    }
};



const update = async function update( id, data ) {
    try {
        const metafield = await ShopifyClient.customer.update( id, data );

        return metafield;
    } catch( error ) {
        console.error('ERROR', error.response?.body?.errors || error);

        throw error;
    }
};

const destroy = async function destroy( id ) {
    try {
        const response = await ShopifyClient.customer.delete( id );

        return response;
    } catch( error ) {
        console.error('ERROR', error.response?.body?.errors || error);

        if ( error.response.statusCode === 404 ) {
            throw {
                type: ERROR_CODE.notFound,
                message: 'customer absent'
            }; 
        }
        
        throw error;
    }
};

export default {
    findOne,
    create,
    update,
    list,
    destroy,
    listAll
};
