import express      from 'express';
import controllers  from './controllers/index.js'; // .js
import middlewares  from './middlewares.js'; // .js

const router = express.Router();
const checkSession = controllers.sessions.verify;
const busboy = middlewares.busboy;

router.get('/', (req, res) => res.send('ok'));

router.post('/sessions', controllers.sessions.create);

router.get('/customers', controllers.customers.list);
router.get('/customers/:id', checkSession, controllers.customers.get);
router.put('/customers/:id', checkSession, controllers.customers.update);
router.post('/customers', checkSession, controllers.customers.create);
router.delete('/customers/:id', checkSession, controllers.customers.delete);
router.post('/customer/webhook',controllers.customers.hooksCreate);

router.get('/metafields', controllers.metafields.get);
router.get('/metafields/profile-completed', controllers.metafields.getProfileCompleted);
router.put('/metafields', checkSession, controllers.metafields.update);
router.put('/metafields/profile-completed/update', controllers.metafields.updateProfileCompleted);
router.post('/metafields', checkSession, controllers.metafields.create);

router.post('/files', checkSession, busboy, controllers.files.upload);
router.delete('/files/:id', checkSession, controllers.files.delete);

router.post('/gorgias/ticket',controllers.ticket.create);
router.post('/gorgias/files', busboy, controllers.ticket.uploadInGorgias);


router.post('/measurement', controllers.measurement.create);
router.post('/measurement/files', busboy, controllers.files.upload);
router.delete('/measurement/delete/files/:id', controllers.files.delete);

router.get('/orders/list', controllers.orders.list);
router.get('/orders/all/list', controllers.orders.listAll);

router.post('/orders/deteils/:id', controllers.orders.details);
router.post('/orders/required-date/:id', controllers.orders.createRequiredDate);
router.post('/orders/custom-status/update/:id', controllers.orders.customStatusUpdate);
router.post('/orders/custom-payment-status/update/:id', controllers.orders.customPaymentStatusUpdate);
router.post( '/orders/webhook',controllers.orders.hooksCreate );
router.post( '/orders/status/accepted',controllers.orders.hooksCreate );

export default router;
