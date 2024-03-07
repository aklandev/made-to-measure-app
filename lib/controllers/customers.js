import serviceRunner    from '../serviceRunner.js'; // .js
import customerCreate  from '../services/customers/Create.js'; // .js
import customerGet     from '../services/customers/Get.js'; // .js
import customerUpdate  from '../services/customers/Update.js'; // .js
import customerList  from '../services/customers/List.js'; // .js
import customerDelete  from '../services/customers/Delete.js';
import hooksCreateCustomer from "../services/customers/HooksCreateCustomer.js"; // .js

export default {
    get: serviceRunner( customerGet ),
    list: serviceRunner( customerList ),
    create: serviceRunner( customerCreate ),
    update: serviceRunner( customerUpdate ),
    delete: serviceRunner( customerDelete ),
    hooksCreate : serviceRunner(hooksCreateCustomer)
};

