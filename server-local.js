'use strict';

const app = require('./netlify/functions/api');

app.listen(3000, () => console.log('Local app listening on port 3000!'));