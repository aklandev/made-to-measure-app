import axios                        from 'axios';
import {
    GORGIAS_BASE_URL,
    GORGIAS_AUTHORIZATION_KEY
}                                   from './config.js';

const client = axios.create({
    baseURL: GORGIAS_BASE_URL,
    headers: {
        Authorization: `Basic ${GORGIAS_AUTHORIZATION_KEY}`
    }
});

export default client;
