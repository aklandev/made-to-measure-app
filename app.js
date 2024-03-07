import express      from 'express';
import { appPort }  from './lib/config.js'; // .js
import middlewares  from './lib/middlewares.js'; // .js
import router       from './lib/router.js'; // .js


const app = express();

process.stdout.write(`app.js ::> NODE version: ${process.versions.node}\n`);

app.use(middlewares.json);
app.use(middlewares.cors);

app.use('/api/v1', router);
app.use('/.netlify/functions/api/v1', router);

const server = app.listen(appPort, (error) => {
    if (error) throw error;
  
    console.log(`App started at http://localhost:${appPort}`);
});

process.on('uncaughtException', async () => {
    await exitHandler(1, 'Unexpected Error');
});
process.on('unhandledRejection', async (error) => {
    console.log('error', error)
    await exitHandler(1, 'Unhandled Promise');
});
process.on('SIGTERM', async () => {
    await exitHandler(0, 'SIGTERM');
});
process.on('SIGTSTP', async () => {
    await exitHandler(0, 'SIGTERM');
});
process.on('SIGINT', async () => {
    await exitHandler(0, 'SIGINT');
});
  
async function exitHandler(code, reason) {
    if (server) server.close();
  
    console.log('Exit reason: ', reason);
    console.log('Graceful shutdown');
    process.exit(code);
}
  
export default app;
