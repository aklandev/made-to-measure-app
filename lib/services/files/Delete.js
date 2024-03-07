import axios    from 'axios';
import {
    APP_ACCESS_TOKEN,
    STORE_NAME
} from '../../config.js';


const fileDelete = async function fileDelete({ params, query }) {

    try {
        const deleteFileQuery = `#graphql
            mutation fileDelete($fileIds: [ID!]!) {
                fileDelete(fileIds: $fileIds) {
                    deletedFileIds
                    userErrors {
                        field
                        message
                    }
                }
            }
        `;

        const deleteFileVariables = {
            fileIds: [`gid://shopify/GenericFile/${params.id}`]
        };

        const fileResponse = await axios.post(
            `https://${STORE_NAME}.myshopify.com/admin/api/2023-04/graphql.json`,
            {
              query: deleteFileQuery,
              variables: deleteFileVariables,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': APP_ACCESS_TOKEN
                }
            }
        );

        const response = fileResponse.data.data.fileDelete.userErrors[0]?.message || 'file deleted';
        
        return { data: response };
    } catch( error ) {
        console.error('ERROR', error.response?.body?.errors || error);

        throw error;
    }
};

export default fileDelete;
