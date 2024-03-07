import serviceRunner    from '../serviceRunner.js'; // .js
import measurementCreate from '../services/measurements/Create.js'; // .js

export default {
    create: serviceRunner( measurementCreate ),
};
