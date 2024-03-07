import LIVR from 'livr';

const isNoValue = function isNoValue(value) {
    return value === undefined || value === null || value === '';
};

(function extendLIVR() {
    const newRules = {
        'string' : () => {
            return value => {
                if ( isNoValue( value ) ) return;
                if ( typeof value !== 'string' ) return 'NOT_STRING';
            };
        },
        'boolean' : () => {
            return value => {
                if ( isNoValue( value ) ) return;
                if ( typeof value !== 'boolean' ) return 'NOT_BOOLEAN';
            };
        },
        'number' : () => {
            return value => {
                if ( isNoValue( value ) ) return;
                if ( typeof value !== 'number' || isNaN( value ) ) return 'NOT_NUMBER';
            };
        }
    };

    LIVR.Validator.registerDefaultRules( newRules );
}());

const runValidation = function runValidation( rules, data ) {
    const validator = new LIVR.Validator( rules );
    
    const validData = validator.validate( data );

    if ( validData ) {
        return validData.data;
    } else {
        throw {
            type: 'NONVALID',
            message: validator.getErrors()
        };
    }
};

export default runValidation;
