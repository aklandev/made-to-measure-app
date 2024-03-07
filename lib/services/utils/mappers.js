import {
    filterOrderTagsById, formatData, formatDataUpdateStatus, formatDataUpdateStatusAccepted,
    generateFinalGarmentCustomer,
    generatePostureCustomer,
    generateProductOrder
} from "./helpers.js";
import { v4 as uuidv4 } from 'uuid';
import ERROR_CODE from "../../constants/error_codes.js";

const createGorgiasTicket = function createGorgiasTicket(data) {
    return {
        channel:   'email',
        language:  'en',
        status:    'open',
        priority:  'normal',
        subject:   'Alteration request',
        meta: {
            gorgias_contact_form: {
                host_url:         'https://contact.gorgias.help/forms/4ubusrbs',
                is_embedded:      false,
                help_center_id:   null,
                contact_form_id:  30444,
                contact_form_uid: '4ubusrbs',
            },
        },
        tags: [
            {
                name: 'ORDER-CHANGE/CANCEL',
            },
        ],
        via: 'api',
        messages: [
            {
                attachments: [
                    ...data.urls
                ],
                channel:    'email',
                from_agent: false,
                via:        'api',
                body_html:  formatDataToHtml(data) ,
                source: {
                    type:    'email',
                    to: [
                        {
                            address: 'p1lk9gnm9n8o7683@email.gorgias.com',
                        },
                    ],
                    from: {
                        address: data.email ,
                    },
                },
            },
        ],
    };
};

function formatDataToHtml( data ) {
    const { name, email, phone_number, order_number, issue } = data;

    const headerSection = `
        <p><strong>Name:</strong> ${ name }</p>
        <p><strong>Email:</strong> ${ email }</p>
        <p><strong>Phone:</strong> ${ phone_number }</p>
        <p><strong>Order:</strong> ${ order_number }</p>
    `;
    const issuesSection = `
        <ul>
            ${issue.map(( issueObj ) => `<li>${ issueObj.description }</li>`).join('')}
        </ul>`;

    const bodyHtml = `
        ${ headerSection }
        <p><strong>Details of the issues:</strong></p>
        ${ issuesSection }
    `;

    return bodyHtml;
}
const  measurementMetafieldCreateMappers = function measurementMetafieldCreateMappers(data) {
    const value = JSON.stringify({
        additional_info:{...data.additional_info},
        body_measurements: {
            ...data.body_measurements,
            posture:{
                slope_shoulder_left:'0',
                slope_shoulder_right:'0',
                shoulder_blade:'0',
                back_style:'0',
                chest:'0',
                stomach:'0',
                arm:'0',
                soulders:'0',
            }
        },
        final_garment: {
            mens_pant:{
                waist: '0',
                thigh: '0',
                u_rise: '0',
                front_waist_height: '0',
                back_waist_height: '0',
                outseam_l:'0',
                outseam_r:'0',
                knee: '0',
                pant_bottom: '0',
                calf_girth: '0',
                adjustments:{
                    seat:'0',
                    waist_height:'0',
                    front_rise:'0',
                    zipper_length:'0',
                    front_thigh:'0',
                    notes:'0'
                }
            },
            mens_jacket:{
                neck: '0',
                chest: '0',
                stomach: '0',
                front_waist_length: '0',
                sleeve_l:'0',
                sleeve_r:'0',
                seat: '0',
                bicep: '0',
                shoulder: '0',
                front_shoulder: '0',
                nape_to_waist : '0',
                back_length: '0',
                adjustments:{
                    half_back_to_stomach:'0',
                    half_back_to_bottom:'0',
                    shoulder_pad:'0',
                    back_pad:'0',
                    armhole:'0',
                    lower_back_collar:'0',
                    nape_to_waist:'0',
                    notes:'0'
                }
            },
            mens_overcoat:{
                neck: '0',
                chest: '0',
                stomach: '0',
                front_waist_length: '0',
                sleeve_l:'0',
                sleeve_r:'0',
                seat: '0',
                bicep: '0',
                shoulder: '0',
                front_shoulder: '0',
                nape_to_waist : '0',
                back_length: '0',
                adjustments:{
                    half_back_to_stomach:'0',
                    half_back_to_bottom:'0',
                    shoulder_pad:'0',
                    back_pad:'0',
                    armhole:'0',
                    lower_back_collar:'0',
                    nape_to_waist:'0',
                    notes:'0'
                }
            },
            mens_shirt:{
                neck: '0',
                chest: '0',
                stomach: '0',
                front_waist_length: '0',
                sleeve_l:'0',
                sleeve_r:'0',
                seat: '0',
                bicep: '0',
                shoulder: '0',
                front_shoulder: '0',
                nape_to_waist : '0',
                back_length: '0',
                adjustments:{
                    half_back_to_stomach:'0',
                    half_back_to_bottom:'0',
                    armhole:'0',
                    lower_back_collar:'0',
                    nape_to_waist:'0',
                    notes:'0'
                }
            },
            mens_vest:{
                vest_back_length: '0',
                neck: '0',
                chest: '0',
                stomach: '0',
                shoulder: '0',
                front_shoulder: '0',
                nape_to_waist : '0',
                front_waist_length: '0',
                front_waist_height: '0',
                back_waist_height: '0',
                adjustments:{
                    half_back_to_stomach:'0',
                    half_back_to_bottom:'0',
                    armhole:'0',
                    lower_back_collar:'0',
                    nape_to_waist:'0',
                    notes:'0',
                }
            },
        }

    })
    return {
        type: 'json',
        namespace: 'custom',
        key: "additional_info",
        value,
        owner_resource: "customers",
        owner_id: data.customer_id
    }
}
const  measurementMetafieldCreateMappersHooksCreateCustomer = function measurementMetafieldCreateMappersHooksCreateCustomer(customer_id) {
    const value = JSON.stringify({
        additional_info:{
            gender: 'Female',
            height:'0',
            weight:'0',
            age:0,
            fit:'Extremely Slim',
            images:{
                fullBodyPhotos:[],
                inspirationImages:[]
            }
        },
        body_measurements: {
            neck:'0',
            chest: '0',
            stomach: '0',
            seat:'0',
            bicep: '0',
            shoulder:'0',
            sleeve: '0',
            font_shoulder: '0',
            nape_to_waist: '0',
            back_length:'0',
            breast_highest_point: '0',
            wrist_circumference:'0',
            front_waist_length:'0',
            waist: '0',
            thigh: '0',
            u_rise: '0',
            back_waist_height: '0',
            front_waist_height: '0',
            inleg: '0',
            knee: '0',
            pant_bottom: '0',
            calf_girth: '0',
            outleg: '0',
            posture:{
                slope_shoulder_left:'0',
                slope_shoulder_right:'0',
                shoulder_blade:'0',
                back_style:'0',
                chest:'0',
                stomach:'0',
                arm:'0',
                soulders:'0',
            }
        },
        final_garment: {
            mens_pant:{
                waist: '0',
                thigh: '0',
                u_rise: '0',
                front_waist_height: '0',
                back_waist_height: '0',
                outseam_l:'0',
                outseam_r:'0',
                knee: '0',
                pant_bottom: '0',
                calf_girth: '0',
                adjustments:{
                    seat:'0',
                    waist_height:'0',
                    front_rise:'0',
                    zipper_length:'0',
                    front_thigh:'0',
                    notes:'0'
                }
            },
            mens_jacket:{
                neck: '0',
                chest: '0',
                stomach: '0',
                front_waist_length: '0',
                sleeve_l:'0',
                sleeve_r:'0',
                seat: '0',
                bicep: '0',
                shoulder: '0',
                front_shoulder: '0',
                nape_to_waist : '0',
                back_length: '0',
                adjustments:{
                    half_back_to_stomach:'0',
                    half_back_to_bottom:'0',
                    shoulder_pad:'0',
                    back_pad:'0',
                    armhole:'0',
                    lower_back_collar:'0',
                    nape_to_waist:'0',
                    notes:'0'
                }
            },
            mens_overcoat:{
                neck: '0',
                chest: '0',
                stomach: '0',
                front_waist_length: '0',
                sleeve_l:'0',
                sleeve_r:'0',
                seat: '0',
                bicep: '0',
                shoulder: '0',
                front_shoulder: '0',
                nape_to_waist : '0',
                back_length: '0',
                adjustments:{
                    half_back_to_stomach:'0',
                    half_back_to_bottom:'0',
                    shoulder_pad:'0',
                    back_pad:'0',
                    armhole:'0',
                    lower_back_collar:'0',
                    nape_to_waist:'0',
                    notes:'0'
                }
            },
            mens_shirt:{
                neck: '0',
                chest: '0',
                stomach: '0',
                front_waist_length: '0',
                sleeve_l:'0',
                sleeve_r:'0',
                seat: '0',
                bicep: '0',
                shoulder: '0',
                front_shoulder: '0',
                nape_to_waist : '0',
                back_length: '0',
                adjustments:{
                    half_back_to_stomach:'0',
                    half_back_to_bottom:'0',
                    armhole:'0',
                    lower_back_collar:'0',
                    nape_to_waist:'0',
                    notes:'0'
                }
            },
            mens_vest:{
                vest_back_length: '0',
                neck: '0',
                chest: '0',
                stomach: '0',
                shoulder: '0',
                front_shoulder: '0',
                nape_to_waist : '0',
                front_waist_length: '0',
                front_waist_height: '0',
                back_waist_height: '0',
                adjustments:{
                    half_back_to_stomach:'0',
                    half_back_to_bottom:'0',
                    armhole:'0',
                    lower_back_collar:'0',
                    nape_to_waist:'0',
                    notes:'0',
                }
            },
        }

    })
    return {
        type: 'json',
        namespace: 'custom',
        key: "additional_info",
        value,
        owner_resource: "customers",
        owner_id:customer_id
    }
}
const  metafieldCreateProfileCompleted = function metafieldCreateProfileCompleted(customer_id,value) {
    return {
        type: 'boolean',
        namespace: 'custom',
        key: "profile_completed",
        value,
        owner_resource: "customers",
        owner_id:customer_id
    }
}

const  updateMetafieldCustomStatusMappers = function updateMetafieldCustomStatusMappers( oldValue, status ) {
    const date = new Date();
    const timestamp = date.getTime();
    const updatedData = {
        ...oldValue,
        order_status: {
            status:       status ,
            update_date:  timestamp,
        },
    };
    if( status === 'Accepted' ){
        updatedData.accepted_update_date={
            update_date:timestamp
        }
    }

    return {
        value: JSON.stringify( updatedData ),
    };
}

const  updateMetafieldCustomPaymentStatusMappers = function updateMetafieldCustomPaymentStatusMappers( oldValue, status ) {
    const date = new Date();
    const timestamp = date.getTime();
    const updatedData = {
        ...oldValue,
        payment_status: {
            status:       status ,
            update_date:  timestamp,
        },
    };

    return {
        value: JSON.stringify( updatedData ),
    };
}
const  createMetafieldDetailsInfoOrderMappers = function createMetafieldDetailsInfoOrderMappers(orderId,data) {
    const newUuid = uuidv4().split('-');
    const date = new Date();
    const timestamp = date.getTime();
    const newData = {
        order_status: {
            status:       'Unverified' ,
            update_date:  timestamp,
        },
        payment_status: {
            status:       'Paid' ,
            update_date:  timestamp,
        },
        date_custom:{
            date:data
        }
    };

    return {
        metafield:{
            key: 'details_info',
            value: JSON.stringify( newData ),
            type: 'json',
            namespace: 'custom',
            owner_resource: 'order',
            owner_id: orderId
        },
        tags:[
        'TagCustomOrder',
        `PublicId-${ newUuid[ newUuid.length-1 ] }`,
        'Status-Unverified',
        'PaymentStatus-Paid-Deprecated',
    ]
    };
}
const  createMetafieldDetailsInfoOrderHookMappers = function createMetafieldDetailsInfoOrderHookMappers(orderId,data) {
    const newUuid = uuidv4().split('-');
    const date = new Date();
    const timestamp = date.getTime();
    const newData = {
        order_status: {
            status:       'Unverified' ,
            update_date:  timestamp,
        },
        payment_status: {
            status:       'Paid' ,
            update_date:  timestamp,
        },
        date_custom:{
            date:data.getTime()
        }
    };

    return {
        metafield:{
            key: 'details_info',
            value: JSON.stringify( newData ),
            type: 'json',
            namespace: 'custom',
            owner_resource: 'order',
            owner_id: orderId
        },
        tags:[
            'TagCustomOrder',
            `PublicId-${ newUuid[ newUuid.length-1 ] }`,
            'Status-Unverified',
            'PaymentStatus-Paid-Deprecated',
        ]
    };
}
const  generateOrderDetailsMappers = function generateOrderDetailsMappers( order, metafieldAdditionalInfo, arrProduct, metafieldDetailsInfo ) {
    return {
        order_info: {
            order_number:   `#${order.order_number}${order.customer.first_name.slice(0,1).toUpperCase()}${order.customer.last_name}`,
            status:         metafieldDetailsInfo.order_status.status,
            payment_status: metafieldDetailsInfo.payment_status.status,
            required_date:  metafieldDetailsInfo.date_custom.date,
            notes:          order.note
        },
        accepted_status_update_date:   metafieldDetailsInfo.accepted_update_date ? formatDataUpdateStatusAccepted( metafieldDetailsInfo.accepted_update_date.update_date ) : null,
        posture_info:           generatePostureCustomer( metafieldAdditionalInfo.body_measurements.posture ),
        images:                 metafieldAdditionalInfo.additional_info.images,
        customer_info: {
            first_name:         order.customer.first_name,
            last_name:          order.customer.last_name,
            email:              order.customer.email,
        },
        products_list:          generateProductOrder( arrProduct ),
        measurements_list:      generateFinalGarmentCustomer( metafieldAdditionalInfo.final_garment ),
        shipping_address_info:  order.shipping_address,

    };
}
const  generateOrderListMappers = function generateOrderListMappers( order, metafield,) {
    const tagPublicIdSlice = filterOrderTagsById(order.tags,'PublicId-');
    let paymentStatus = order.displayFinancialStatus.replaceAll('_', ' ');

    let words = paymentStatus.split(' ');

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }

    paymentStatus = words.join(' ');

    return {
        public_id:tagPublicIdSlice.length ? tagPublicIdSlice[0].slice("PublicId-".length) : null,
        order_number:`${order.name}${order.customer ? order.customer.firstName.slice(0,1).toUpperCase() : ''}${order.customer ? order.customer.lastName : ''}`,
        order_number_sort:Number(order.name.slice(1,order.name.length)),
        customer_first_name:order.customer ? order.customer.firstName : null,
        customer_id:`${order.customer?.id}`,
        customer_last_name:order.customer ? order.customer.lastName : null,
        amount:order.totalPrice,
        required_date:formatData(order.createdAt),
        order_status:metafield.order_status?.status ? metafield.order_status.status : null,
        payment_status:paymentStatus,
        update_order_status:metafield.order_status?.update_date ? formatDataUpdateStatus(metafield.order_status.update_date): null,
    };
}
export default {
    createGorgiasTicket,
    measurementMetafieldCreateMappers,
    updateMetafieldCustomStatusMappers,
    updateMetafieldCustomPaymentStatusMappers,
    generateOrderDetailsMappers,
    createMetafieldDetailsInfoOrderMappers,
    generateOrderListMappers,
    createMetafieldDetailsInfoOrderHookMappers,
    measurementMetafieldCreateMappersHooksCreateCustomer,
    metafieldCreateProfileCompleted
}
