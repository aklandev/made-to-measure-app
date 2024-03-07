import serviceRunner    from '../serviceRunner.js'; // .js
import metafieldCreate  from '../services/metafields/Create.js'; // .js
import metafieldGet     from '../services/metafields/Get.js'; // .js
import metafieldUpdate  from '../services/metafields/Update.js';
import metafieldGetProfileCompleted from "../services/metafields/GetProfileCompleted.js";
import metafieldUpdateProfileCompleted from "../services/metafields/UpdateProfileCompleted.js"; // .js

export default {
    get: serviceRunner( metafieldGet ),
    create: serviceRunner( metafieldCreate ),
    update: serviceRunner( metafieldUpdate ),
    getProfileCompleted: serviceRunner( metafieldGetProfileCompleted ),
    updateProfileCompleted: serviceRunner(metafieldUpdateProfileCompleted)
};

