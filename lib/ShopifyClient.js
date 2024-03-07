import Shopify                          from 'shopify-api-node';

import { STORE_NAME, APP_ACCESS_TOKEN } from './config.js'; // .js

const client = new Shopify({
    shopName: STORE_NAME,
    accessToken: APP_ACCESS_TOKEN,
    apiVersion: '2023-07',
});

export default client;

