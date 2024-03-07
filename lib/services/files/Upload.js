import path                     from 'node:path';
import { randomUUID as uuidV4 } from 'node:crypto';
import axios from 'axios';
import {
    APP_ACCESS_TOKEN,
    STORE_NAME,
    SPF_IMG_BASE_URL
} from '../../config.js'; // .js

const fileTypes = {
    IMAGE: 'IMAGE',
    FILE: 'FILE',
}
//  The solution was realized in Shopify Files API way: https://gist.github.com/celsowhite/2e890966620bc781829b5be442bea159

const fileUpload = async function fileUpload({ params }) {
    const { fileType = fileTypes.FILE } = params;

    try {
        /* GraphQL */
        const stagedUploadsQuery = `#graphql
            mutation stagedUploadsCreate($input: [StagedUploadInput!]!) { stagedUploadsCreate(input: $input) { 
                stagedTargets {
                    url
                    resourceUrl
                    parameters {
                        name
                        value
                    }
                }
                userErrors {
                    field
                    message
                }
            }
        }`;
          
        const extention      = path.extname(params.filename);
        const remoteFileName = `${uuidV4()}${extention}`;
        const stagedUploadsVariables = {
            input: {
                filename: remoteFileName,
                mimeType: params.mimeType,
                httpMethod: 'PUT',
                resource: fileType
            },
        };

        const stagedUploadsQueryResult = await axios.post(
            `https://${STORE_NAME}.myshopify.com/admin/api/2023-04/graphql.json`,
            {
                query: stagedUploadsQuery,
                variables: stagedUploadsVariables,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': APP_ACCESS_TOKEN
                }
            }
        );

        const [{
            url,
            resourceUrl,
            parameters,
        }] = stagedUploadsQueryResult.data.data.stagedUploadsCreate.stagedTargets;

        const gcpHeaders = new Headers();
        gcpHeaders.append('User-Agent', 'Node.js Shopify APP');
        parameters.forEach(({ name, value }) => {
            gcpHeaders.append(name, value);
        });

        await axios.put(url, params.file, {
            headers: gcpHeaders
        });


        const createFileQuery = `#graphql
            mutation fileCreate($files: [FileCreateInput!]!) {
                fileCreate(files: $files) {
                    files {
                        alt
                        ... on GenericFile {
                            id
                            url
                        }
                        ... on MediaImage {
                            id
                            image {
                                id
                                url
                                originalSrc
                                width
                                height
                            }
                        }
                        fileStatus
                    }
                    userErrors {
                        field
                        message
                    }
                }
            }`;
          
        const createFileVariables = {
            files: {
                alt: 'alt-tag',
                contentType: fileType,
                originalSource: resourceUrl, 
            },
        };

        const fileResponse = await axios.post(
            `https://${STORE_NAME}.myshopify.com/admin/api/2023-04/graphql.json`,
            {
              query: createFileQuery,
              variables: createFileVariables,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': APP_ACCESS_TOKEN
                }
            }
        );

        const imgUrl = SPF_IMG_BASE_URL + remoteFileName;
        const idChunks = fileResponse.data.data.fileCreate.files[0].id.split('/');
        const shortId = idChunks[ idChunks.length - 1 ];

        return {
            data: {
                url: imgUrl,
                shortId: shortId,
                ...fileResponse?.data?.data
            }
        };
    } catch( error ) {
        console.error('ERROR', error.response?.body?.errors || error);

        throw error;
    }
};

export default fileUpload;
