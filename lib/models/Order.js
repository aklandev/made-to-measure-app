import client      from "../ShopifyClient.js";
import ERROR_CODE  from "../constants/error_codes.js";
import { buildQuery } from "../services/utils/helpers.js";

const findOne = async function findOne( params ) {
    try {
        const orders = await client.order.list( params );
        if ( orders.length > 1 ) {
            throw {
                type: ERROR_CODE.badRequest,
                message: 'wrong parameters'
            };
        }

        return orders[0];
    } catch( error ) {
        console.log(' - findOne Order - ');
        console.error('ERROR', error.response?.body?.errors || error);

        throw error;
    }

};
const list = async function list( params ) {
    try {
        const orders = await client.order.list( params )

        return orders;
    } catch( error ) {
        console.log(' - list Order - ');
        console.error('ERROR', error.response?.body?.errors || error);

        throw error;
    }

};
const listPagination = async function listPagination( query ) {
    try {
        const arr=[];
        const pageNumber = Number(query.page);
        let increment = 0;
        let params = {
            query: buildQuery(query),
            limit: query.limit || 10,
            sort:'CREATED_AT'
        };

        do {
            increment++;
            const orders = await client.order.list( params );


            if(increment===pageNumber){
                arr.push(...orders);
                break;
            }
            if (orders.nextPageParameters) {
                params = orders.nextPageParameters
            } else {
                arr.push();
                break;
            }
        } while (true);

        return arr;
    } catch( error ) {
        console.log(' - listPagination Order - ');
        console.error('ERROR', error.response?.body?.errors || error);

        throw error;
    }

};


const findOneGetId = async function findOneGetId( params ) {
    try {
        const orders = await client.order.get( params.id );


        return orders;
    } catch( error ) {
        console.log(' - findOneGetId Order - ');
        console.error('ERROR', error.response?.body?.errors || error);

        throw error;
    }

};
const update = async function update( data ) {
    try {
        const orders = await client.order.update( data.id,data.value );


        return orders;
    } catch( error ) {
        console.log(' - update Order - ');
        console.error('ERROR', error.response?.body?.errors || error);

        throw error;
    }

};
const getMetaobjectById = async function getMetaobjectById( body ) {
    try {
        const gqlQuery = `
                 query GetMetaobject($id: ID!) {
                      metaobject(id: $id) {
                            id
                           fields{
                           key
                           value
                           }
                      }
                 }
`;

        const variables = {
            id: body.id,
        };

        const data = await client.graphql( gqlQuery, variables );

        return data;

    } catch( error ) {
        console.log(' - GetMetaobject - ');
        console.error('ERROR', error.response?.body?.errors || error);

        throw error;
    }
};

const listOrdersGraphql = async function listOrdersGraphql(query ) {
    try {
        const gqlQuery = `
                 query Orders($first: Int!, $cursor: String,$query:String,$sort:OrderSortKeys,$reverse:Boolean){        
                   orders(first: $first, after: $cursor, query:$query,sortKey:$sort,reverse:$reverse) {
                     edges {
                        node {
                          tags
                          id
                          name
                          totalPrice
                          createdAt
                          displayFinancialStatus
                          customer{
                          id
                          firstName
                          lastName
                          }
                          metafield(key:"custom.details_info"){
                          value
                          key
                          }
                        }
                     }
                     pageInfo{
                          endCursor
                          hasNextPage
                          hasPreviousPage
                          startCursor
                          }
                   }
                 }
`;

        const variables = {
            first: Number(query.limit || 10) ,
            query: buildQuery( query ),
            cursor: null,
            sort: query.sort || null,
            reverse: query.reverse === 'desc'
        };

        const arr = [];
        const pageNumber = Number( query.page );

        let increment = 0;

        do {
            increment++;
            const orders = await client.graphql( gqlQuery, variables );


            if( increment === pageNumber ){
                arr.push({ order_info: orders.orders.edges.map( edge => edge.node ), page_info: orders.orders.pageInfo });
                break;
            }
            if ( orders.orders.pageInfo.hasNextPage ) {
                variables.cursor = orders.orders.pageInfo.endCursor

            } else {
                arr.push();
                break;
            }

        } while (true);

        return arr[0];

    } catch( error ) {
        console.log(' - GetMetaobject - ');
        console.error('ERROR', error.response?.body?.errors || error);

        throw error;
    }
};
const listOrdersGraphqlTest = async function listOrdersGraphqlTest(query ) {
    try {
        const gqlQuery = `
                 query Orders($first: Int!, $cursor: String,$query:String,){        
                   orders(first: $first, after: $cursor, query:$query) {
                     edges {
                        node {
                          tags
                          id
                          name
                          totalPrice
                          createdAt
                          displayFinancialStatus
                          customer{
                          id
                          firstName
                          lastName
                          }
                          metafield(key:"custom.details_info"){
                          value
                          key
                          }
                        }
                     }
                     pageInfo{
                          endCursor
                          hasNextPage
                          hasPreviousPage
                          startCursor
                          }
                   }
                 }
`;

        const variables = {
            first: Number(250) ,
            query: 'tag:TagCustomOrder AND status:Open',
            cursor: null,
        };
        const arr = [];

        do {
            const orders = await client.graphql( gqlQuery, variables );
            arr.push( ...orders.orders.edges.map( edge => edge.node ) );

            if ( orders.orders.pageInfo.hasNextPage ) {
                variables.cursor = orders.orders.pageInfo.endCursor
            } else {
                break;
            }

        } while ( true );

        return arr;

    } catch( error ) {
        console.log(' - GetMetaobject - ');
        console.error('ERROR', error.response?.body?.errors || error);

        throw error;
    }
};
export default {
    getMetaobjectById,
    findOne,
    findOneGetId,
    update,
    list,
    listPagination,
    listOrdersGraphql,
    listOrdersGraphqlTest
};
