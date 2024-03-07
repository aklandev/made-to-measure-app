import client from "../ShopifyClient.js";

const getProductById = async function getProductById( data ) {
    try {
        const products = await client.product.get( data.id ,{fields:'id,title,product_type'} );

        return products;

    } catch( error ) {
        console.log('- getProductById -');
        console.error('ERROR', error.response?.body?.errors || error);

        throw error;
    }
};
export default {
    getProductById
};
