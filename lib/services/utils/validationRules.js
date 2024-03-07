const measurementsDefault = {
    chest: [ 'required', 'string' ],
    stomach: [ 'required', 'string' ],
    hips: [ 'required', 'string' ],
    sleeve_length: [ 'required', 'string' ],
    back_length: [ 'required', 'string' ],
    front_length: [ 'required', 'string' ],
    accross_shoulders: [ 'required', 'string' ],
    front_shoulder: [ 'required', 'string' ],
    nape_to_waist: [ 'required', 'string' ],
    front_shoulder_to_waist: [ 'required', 'string' ],
    bicep: [ 'required', 'string' ],
    cuff: [ 'required', 'string' ],
    neck: [ 'required', 'string' ],
    waist: [ 'required', 'string' ],
    seat: [ 'required', 'string' ],
    outleg: [ 'required', 'string' ],
    inleg: [ 'required', 'string' ],
    thigh: [ 'required', 'string' ],
    knee: [ 'required', 'string' ],
    front_waist_height: [ 'required', 'string' ],
    back_waist_height: [ 'required', 'string' ],
    front_rise: [ 'required', 'string' ],
    back_rise: [ 'required', 'string' ]
};
const measurementsMaleDefault = {
    neck: [ 'required', 'string' ],
    chest: [ 'required', 'string' ],
    stomach: [ 'required', 'string' ],
    seat: [ 'required', 'string' ],
    bicep: [ 'required', 'string' ],
    shoulder: [ 'required', 'string' ],
    sleeve: [ 'required', 'string' ],
    font_shoulder: [ 'required', 'string' ],
    nape_to_waist: [ 'required', 'string' ],
    back_length: [ 'required', 'string' ],
    wrist_circumference: [ 'required', 'string' ],
    front_waist_length: [ 'required', 'string' ],
    waist: [ 'required', 'string' ],
    thigh: [ 'required', 'string' ],
    u_rise: [ 'required', 'string' ],
    back_waist_height: [ 'required', 'string' ],
    front_waist_height: [ 'required', 'string' ],
    inleg: [ 'required', 'string' ],
    knee: [ 'required', 'string' ],
    pant_bottom: [ 'required', 'string' ],
    calf_girth: [ 'required', 'string' ],
    outleg: [ 'required', 'string' ],

};
const measurementsFemaleDefault = {
    neck: [ 'required', 'string' ],
    chest: [ 'required', 'string' ],
    stomach: [ 'required', 'string' ],
    seat: [ 'required', 'string' ],
    bicep: [ 'required', 'string' ],
    shoulder: [ 'required', 'string' ],
    sleeve: [ 'required', 'string' ],
    font_shoulder: [ 'required', 'string' ],
    nape_to_waist: [ 'required', 'string' ],
    back_length: [ 'required', 'string' ],
    breast_highest_point: [ 'required', 'string' ],
    wrist_circumference: [ 'required', 'string' ],
    front_waist_length: [ 'required', 'string' ],
    waist: [ 'required', 'string' ],
    thigh: [ 'required', 'string' ],
    u_rise: [ 'required', 'string' ],
    back_waist_height: [ 'required', 'string' ],
    front_waist_height: [ 'required', 'string' ],
    inleg: [ 'required', 'string' ],
    knee: [ 'required', 'string' ],
    pant_bottom: [ 'required', 'string' ],
    calf_girth: [ 'required', 'string' ],
    outleg: [ 'required', 'string' ],
};
const finalGarmentDefault = {
    mens_pant:{ 'nested_object' : {
            waist: ['required', 'string'],
            thigh: ['required', 'string'],
            u_rise: ['required', 'string'],
            front_waist_height: ['required', 'string'],
            back_waist_height: ['required', 'string'],
            outseam_l:['required', 'string'],
            outseam_r:['required', 'string'],
            knee:['required', 'string'],
            pant_bottom:['required', 'string'],
            calf_girth: ['required', 'string'],
            adjustments:{ 'nested_object' :{
                seat:['required', 'string'],
                waist_height:['required', 'string'],
                front_rise:['required', 'string'],
                zipper_length:['required', 'string'],
                front_thigh:['required', 'string'],
                notes:['required', 'string'],
            }}
        }},
    mens_jacket:{ 'nested_object' : {
            neck: ['required', 'string'],
            chest: ['required', 'string'],
            stomach: ['required', 'string'],
            front_waist_length: ['required', 'string'],
            seat: ['required', 'string'],
            bicep: ['required', 'string'],
            sleeve_l:['required', 'string'],
            sleeve_r:['required', 'string'],
            shoulder: ['required', 'string'],
            front_shoulder: ['required', 'string'],
            nape_to_waist : ['required', 'string'],
            back_length: ['required', 'string'],
            adjustments:{ 'nested_object' :{
                    half_back_to_stomach:['required', 'string'],
                    half_back_to_bottom:['required', 'string'],
                    shoulder_pad:['required', 'string'],
                    back_pad:['required', 'string'],
                    armhole:['required', 'string'],
                    lower_back_collar:['required', 'string'],
                    nape_to_waist:['required', 'string'],
                    notes:['required', 'string'],
                }}
        }},
    mens_overcoat:{ 'nested_object' : {
            neck: ['required', 'string'],
            chest: ['required', 'string'],
            stomach: ['required', 'string'],
            front_waist_length: ['required', 'string'],
            sleeve_l:['required', 'string'],
            sleeve_r:['required', 'string'],
            seat: ['required', 'string'],
            bicep: ['required', 'string'],
            shoulder: ['required', 'string'],
            front_shoulder: ['required', 'string'],
            nape_to_waist : ['required', 'string'],
            back_length: ['required', 'string'],
            adjustments:{ 'nested_object' :{
                    half_back_to_stomach:['required', 'string'],
                    half_back_to_bottom:['required', 'string'],
                    shoulder_pad:['required', 'string'],
                    back_pad:['required', 'string'],
                    armhole:['required', 'string'],
                    lower_back_collar:['required', 'string'],
                    nape_to_waist:['required', 'string'],
                    notes:['required', 'string'],
                }}
        }},
    mens_shirt:{ 'nested_object' : {
            neck: ['required', 'string'],
            chest: ['required', 'string'],
            stomach: ['required', 'string'],
            front_waist_length: ['required', 'string'],
            sleeve_l:['required', 'string'],
            sleeve_r:['required', 'string'],
            seat: ['required', 'string'],
            bicep: ['required', 'string'],
            shoulder: ['required', 'string'],
            front_shoulder: ['required', 'string'],
            nape_to_waist : ['required', 'string'],
            back_length: ['required', 'string'],
            adjustments:{ 'nested_object' :{
                    half_back_to_stomach:['required', 'string'],
                    half_back_to_bottom:['required', 'string'],
                    armhole:['required', 'string'],
                    lower_back_collar:['required', 'string'],
                    nape_to_waist:['required', 'string'],
                    notes:['required', 'string'],
                }}
        }},
    mens_vest:{ 'nested_object' : {
            vest_back_length: ['required', 'string'],
            neck: ['required', 'string'],
            chest: ['required', 'string'],
            stomach: ['required', 'string'],
            shoulder: ['required', 'string'],
            front_shoulder: ['required', 'string'],
            nape_to_waist : ['required', 'string'],
            front_waist_length: ['required', 'string'],
            front_waist_height: ['required', 'string'],
            back_waist_height: ['required', 'string'],
            adjustments:{ 'nested_object' :{
                    half_back_to_stomach:['required', 'string'],
                    half_back_to_bottom:['required', 'string'],
                    armhole:['required', 'string'],
                    lower_back_collar:['required', 'string'],
                    nape_to_waist:['required', 'string'],
                    notes:['required', 'string'],
                }}
        }},
};

export const  measurementFemaleOrMale = function measurementFemaleOrMale(gender) {
    switch (gender) {
        case 'Male':
            return {
                ...measurementsMaleDefault
            };
        case 'Female':
            return { ...measurementsFemaleDefault };
        case 'Other':
            return { ...measurementsFemaleDefault };
        default:
            return null;
    }
}
export const  measurementFemaleOrMaleAdmin = function measurementFemaleOrMaleAdmin(gender) {
    switch (gender) {
        case 'Male':
            return {
                ...measurementsMaleDefault,
                posture:{'nested_object' : {
                        slope_shoulder_left:[ 'required', 'string' ],
                        slope_shoulder_right:[ 'required', 'string' ],
                        shoulder_blade:[ 'required', 'string' ],
                        back_style:[ 'required', 'string' ],
                        chest:[ 'required', 'string' ],
                        stomach:[ 'required', 'string' ],
                        arm:[ 'required', 'string' ],
                        soulders:[ 'required', 'string' ],
                    }}
            };
        case 'Female':
            return {
                ...measurementsFemaleDefault ,
                posture:{'nested_object' : {
                        slope_shoulder_left:[ 'required', 'string' ],
                        slope_shoulder_right:[ 'required', 'string' ],
                        shoulder_blade:[ 'required', 'string' ],
                        back_style:[ 'required', 'string' ],
                        chest:[ 'required', 'string' ],
                        stomach:[ 'required', 'string' ],
                        arm:[ 'required', 'string' ],
                        soulders:[ 'required', 'string' ],
                    }}
            };
        case 'Other':
            return {
                ...measurementsFemaleDefault,
                posture:{'nested_object' : {
                        slope_shoulder_left:[ 'required', 'string' ],
                        slope_shoulder_right:[ 'required', 'string' ],
                        shoulder_blade:[ 'required', 'string' ],
                        back_style:[ 'required', 'string' ],
                        chest:[ 'required', 'string' ],
                        stomach:[ 'required', 'string' ],
                        arm:[ 'required', 'string' ],
                        soulders:[ 'required', 'string' ],
                    }}
            };
        default:
            return null;
    }
}
export const  measurementMetafieldCreate = function measurementMetafieldCreate(gender) {
    return{
        additional_info : [ 'required', { 'nested_object' : {
                gender: [ 'required', 'string' ],
                height: [ 'required', 'string' ],
                weight: [ 'required', 'string' ],
                age: [ 'required', 'number' ],
                fit: [ 'required', 'string' ],
                images: [ 'required', { 'nested_object' : {
                        fullBodyPhotos: [ 'required', { 'list_of_objects': [{
                                id: [ 'number' ],
                                url: ['string' ]
                            }]}],
                        inspirationImages: [ 'required', { 'list_of_objects': [{
                                id: [ 'number' ],
                                url: [ 'string' ],
                                description: [ 'string' ]
                            }]}]
                    } } ]
            } } ],
        body_measurements : [ 'required', { 'nested_object' : measurementFemaleOrMale(gender)}],
    }
}
export const  metafieldCreateAdmin = function metafieldCreateAdmin(gender) {
    return{
        type: [ 'required', { eq: 'json' } ],
        namespace: [ 'required', 'string' ],
        key: [ 'required', 'string' ],
        value: [ 'required', { 'nested_object' : {
                additional_info : [ 'required', { 'nested_object' : {
                        gender: [ 'required', 'string' ],
                        height: [ 'required', 'string' ],
                        weight: [ 'required', 'string' ],
                        age: [ 'required', 'number' ],
                        fit: [ 'required', 'string' ],
                        images: [ 'required', { 'nested_object' : {
                                fullBodyPhotos: [ 'required', { 'list_of_objects': [{
                                        id: [ 'number' ],
                                        url: ['string' ]
                                    }]}],
                                inspirationImages: [ 'required', { 'list_of_objects': [{
                                        id: [ 'number' ],
                                        url: [ 'string' ],
                                        description: [ 'string' ]
                                    }]}]
                            } } ]
                    } } ],
                body_measurements : [ 'required', { 'nested_object' :
                        measurementFemaleOrMaleAdmin(gender),
                }],
                final_garment : [ 'required', { 'nested_object' : finalGarmentDefault}]
            }}],
        owner_resource: [ 'required', 'string' ],
        owner_id: [ 'required', 'string' ]
    }
}
export const  metafieldUpdateAdmin = function metafieldUpdateAdmin(gender) {
    return{
        id: [ 'required', 'number' ],
        type: [ 'required', { eq: 'json' } ],
        namespace: [ 'required', 'string' ],
        key: [ 'required', 'string' ],
        value: [ 'required', { 'nested_object' : {
                additional_info : [ 'required', { 'nested_object' : {
                        gender: [ 'required', 'string' ],
                        height: [ 'required', 'string' ],
                        weight: [ 'required', 'string' ],
                        age: [ 'required', 'number' ],
                        fit: [ 'required', 'string' ],
                        images: [ 'required', { 'nested_object' : {
                                fullBodyPhotos: [ 'required', { 'list_of_objects': [{
                                        id: [ 'number' ],
                                        url: ['string' ]
                                    }]}],
                                inspirationImages: [ 'required', { 'list_of_objects': [{
                                        id: [ 'number' ],
                                        url: [ 'string' ],
                                        description: [ 'string' ]
                                    }]}]
                            } } ]
                    } } ],
                body_measurements : [ 'required', { 'nested_object' :
                        measurementFemaleOrMaleAdmin(gender),
                }],
                final_garment : [ 'required', { 'nested_object' : finalGarmentDefault}]
            }}],
        owner_resource: [ 'required', 'string' ],
        owner_id: [ 'required', 'string' ]
    }
}


export const METAFIELD_CREATE = {
    type: [ 'required', { eq: 'json' } ],
    namespace: [ 'required', 'string' ],
    key: [ 'required', 'string' ],
    value: [ 'required', { 'nested_object' : {
        additional_info : [ 'required', { 'nested_object' : {
            height: [ 'required', 'string' ],
            fit: [ 'required', 'string' ],
            images: [ 'required', { 'nested_object' : {
                fullBodyPhotos: [ 'required', { 'list_of_objects': [{
                    id: [ 'number' ],
                    url: ['string' ]
                }]}],
                inspirationImages: [ 'required', { 'list_of_objects': [{
                    id: [ 'number' ],
                    url: [ 'string' ],
                    description: [ 'string' ]
                }]}]
            } } ]
        } } ],
        body_measurements : [ 'required', { 'nested_object' : measurementsDefault}],
        final_garment : [ 'required', { 'nested_object' : measurementsDefault}]
    }}],
    owner_resource: [ 'required', 'string' ],
    owner_id: [ 'required', 'string' ]
};

export const METAFIELD_UPDATE = {
    id: [ 'required', 'number' ],
    type: [ 'required', { eq: 'json' } ],
    namespace: [ 'required', 'string' ],
    key: [ 'required', 'string' ],
    value: [ 'required', { 'nested_object' : {
        additional_info : [ 'required', { 'nested_object' : {
            height: [ 'required', 'string' ],
            fit: [ 'required', 'string' ],
            images: [ 'required', { 'nested_object' : {
                fullBodyPhotos: [ 'required', { 'list_of_objects': [{
                    id: [ 'number' ],
                    url: ['string' ]
                }]}],
                inspirationImages: [ 'required', { 'list_of_objects': [{
                    id: [ 'number' ],
                    url: ['string' ],
                    description: [ 'string' ]
                }]}]
            } } ]
        } } ],
        body_measurements : [ 'required', { 'nested_object' : measurementsDefault}],
        final_garment : [ 'required', { 'nested_object' : measurementsDefault}]
    }}],
    owner_resource: [ 'required', 'string' ],
    owner_id: [ 'required', 'string' ]
};

export const CUSTOMER_CREATE = {
    email: [ 'email' ], 
    accepts_marketing: [ 'boolean' ], 
    first_name: [ 'required', 'string' ], 
    last_name: [ 'required', 'string' ], 
    state: [ 'string' ], 
    default_address: { 'nested_object' : {
        country: [ 'string' ],
    }}, 
    phone: [ 'string' ], 
    note: [ 'string' ]
};

export const CUSTOMER_UPDATE = {
    id: [ 'required', 'number' ],
    email: [ 'email' ], 
    accepts_marketing: [ 'boolean' ], 
    first_name: [ 'required', 'string' ], 
    last_name: [ 'required', 'string' ], 
    state: [ 'string' ], 
    default_address: { 'nested_object' : {
        country: [ 'string' ],
    }}, 
    phone: [ 'string' ], 
    note: [ 'string' ]
};

export const METAFIELD_GET_QUERY = {
    owner_resource : [ 'required', 'string' ], 
    namespace : [ 'required', 'string' ], 
    owner_id : [ 'required', 'string' ],
    //key: [ 'required', 'string' ]
};

export const METAFIELD_GET_PROFILE_COMPLETED = {
    owner_id : [ 'required', 'string' ],
    //key: [ 'required', 'string' ]
};

export const TICKET_CREATE = {
    name:             [ 'required', 'string' ],
    email:            [ 'required', 'email' ],
    phone_number:     [ 'required', 'string' ],
    order_number:     [ 'required', 'number' ],
    urls: [ { 'list_of_objects': [{
            url: [ 'string' ],
            content_type: ['string' ],
            size: [ 'number' ],
            name: [ 'string' ]
        }]}],
    issue:[ { 'list_of_objects': [{
            description: [ 'string' ],
        }]}],
};
