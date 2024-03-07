import GorgiasClient  from '../../GorgiasClient.js';
import FormData       from 'form-data';
const fileUpload = async function fileUpload({ params }) {
    try {
        const bufferChunks = [];
        const data = [];

        const promise = new Promise((resolve, reject) => {
            params.file.on('data', (chunk) => {
                bufferChunks.push(chunk);
            });

            params.file.on('end', async () => {
                try {
                    const buffer = Buffer.concat(bufferChunks);

                    const formData = new FormData();
                    formData.append('file', buffer, { filename: params.filename });

                    const newFile = await GorgiasClient.post('upload', formData, {
                        headers: {
                            ...formData.getHeaders(),
                        },
                    });
                    data.push(newFile.data[0]);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });

            params.file.on('error', (err) => {
                reject(err);
            });
        });

        await promise;

        return {
            data
        };
    } catch (error) {
        console.error('ERROR', error.response?.body?.errors || error);
        throw error;
    }
};

export default fileUpload;
