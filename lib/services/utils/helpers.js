import moment               from 'moment';

export const formatData = function formatData ( date ) {
    return moment( date ).format('MMMM DD, yyyy');
};
export const formatDataUpdateStatus = function formatDataUpdateStatus ( date ) {
    return moment( date ).format('MM/DD/yy');
};
export const formatDataUpdateStatusAccepted = function formatDataUpdateStatusAccepted ( date ) {
    return moment(date).format('DD/MM/yyyy hh:mma');
};

export const findMetafieldByKey = function findMetafieldByKey ( metafields, key ) {
    return metafields.find( metafield => metafield.key === key );
};

export const  generateFinalGarmentCustomer = function generateFinalGarmentCustomer ( final_garment ) {
    const  result = [];
    for (const garmentType in final_garment) {
        const garment = final_garment[garmentType];

        const hasNonZeroValues = Object.values(garment).some(value => value !== "0");

        if (hasNonZeroValues) {
            const newObject = {
                name: garmentType,
                measurements:{},
                adjustments: {}
            };
            for (const key in garment) {
                if (garment[key] !== "0" && key !== "adjustments") {
                    newObject.measurements[key] = garment[key];
                }
            }

            if (garment.adjustments) {
                for (const key in garment.adjustments) {
                    if (garment.adjustments[key] !== "0") {
                        newObject.adjustments[key] = garment.adjustments[key];
                    }
                }
            }
            result.push(newObject);
        }
    }
    return result;
};
export const  generatePostureCustomer = function generatePostureCustomer ( posture ) {

    const newObject = {
        name: 'posture',
        postures: {},
    };

    for (const postureType in posture) {
        if (posture[postureType] !== "0") {
            newObject.postures[postureType] = posture[postureType];
        }
    }

    return newObject;
};
export const  generateProductOrder = function generateProductOrder ( data ) {
    const  result = [];
    for ( const product of data ) {
        result.push({
            id:product.pr.id || null,
            item_name:product.pr.title || null,
            item_type:product.pr.product_type || null,
            fabric_mill_name:getFabricValue(product.fb,'details_mill_name'),
            fabric_code:getFabricValue(product.fb,'fabric_code'),
            fabric_supplier:getFabricValue(product.fb,'supplier'),
            pattern:getFabricValue(product.fb,'details_pattern'),
            composition:getFabricValue(product.fb,'details_composition'),
            button_code:getFabricValue(product.fb,'code'),
        });
    }

    return result;
};

export const  buildQuery = function buildQuery(query) {
    let baseQuery = 'tag:TagCustomOrder';

    if (query.status !== 'AllStatuses') {
        baseQuery += ` AND tag:Status-${query.status}`;
    }

    if (query.payment_status !== 'AllStatuses') {
        baseQuery += ` AND tag:PaymentStatus-${query.payment_status}`;
    }

    return baseQuery;
}
export const  buildQueryCustomer = function buildQueryCustomer(query) {
    let baseQuery = 'tag:TagCustomCustomer';

    if (query.search) {
        baseQuery += ` AND (first_name:*${query.search} OR last_name:*${query.search})`;
    }

    return baseQuery;
}

const getFabricValue = function getFabricValue(arr,key) {
    const getValueByType = arr.find(value=>value.key===key)

    return getValueByType ? getValueByType.value : null;
};
export const filterOrderOldTags = function filterOrderOldTags(tags,key) {
    const filteredTags = tags.filter(tag => !tag.trim().startsWith(key));

    return filteredTags;
};
export const filterOrderTagsById = function filterOrderTagsById(tags,key) {
    const filteredTags = tags.filter(tag => tag.trim().startsWith(key));

    return filteredTags;
};
const mockLoopHighload = function mockLoopHighload() {
    let index = 0;
    for ( let i=0; i<1000000000; i++ ) {
        index += 1;
        index -= 1;
    }

    return index;
};

export const eventBlocker = async function eventBlocker( count=1 ) {
    try {
        for ( let i=0; i<count; i++ ) {
            mockLoopHighload();
        }

    } catch( error ) {
        console.log(' - eventBlocker - ');
        console.error('ERROR', error.response?.body?.errors || error.response?.errors || error);

        throw error;
    }
};

