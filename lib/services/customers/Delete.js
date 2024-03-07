import Customer                from '../../models/Customer.js'; // .js

const customerDelete = async function customerDelete({ params }) {
    await Customer.destroy( params.id );

    return {
        data: {
            message: 'customer deleted'
        }
    };
};

export default customerDelete;
