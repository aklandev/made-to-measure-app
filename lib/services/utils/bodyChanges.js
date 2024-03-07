import { MEASUREMENT_ITEM_OVERSIZE } from '../../config.js'; // .js

const prepareCreateBody =  function prepareCreateBody( valueObj ) {
    const creationTime = new Date();

    for( const[type,obj] of Object.entries( valueObj ) ) {
        if ( type === 'additional_info' ) continue;

        for( const[key,value] of Object.entries( obj ) ) {
            valueObj[type][key] = [value];
        }
        obj.lastUpdate = creationTime;
    }

    return JSON.stringify(valueObj);
};

const prepareUpdateBody = function prepareUpdateBody( newValueObj, existedValueObj ) {
    const updationTime = new Date();
    existedValueObj = JSON.parse(existedValueObj);

    for( const[type,obj] of Object.entries( newValueObj ) ) {
        if ( type === 'additional_info' ) {
            existedValueObj[type] = newValueObj[type];
            continue;
        }

        let isUpdated = false;

        for( const[key,value] of Object.entries( obj ) ) {
            if ( 
                key === 'lastUpdate'
                || value === existedValueObj[type][key]
                || value === existedValueObj[type][key][0]
            ) {
                continue;
            }
            
            if ( existedValueObj[type][key] === 'null' ) {
                existedValueObj[type][key] = [value];
            } else {
                existedValueObj[type][key].unshift(value);
            }
            if ( existedValueObj[type][key].length == MEASUREMENT_ITEM_OVERSIZE ) {
                existedValueObj[type][key].pop();
            }

            isUpdated = true;
        }

        if ( isUpdated ) {
            console.log('update time');
            existedValueObj[type].lastUpdate = updationTime;
        }
    }

    return JSON.stringify(existedValueObj);
};

export {
    prepareCreateBody,
    prepareUpdateBody
};
