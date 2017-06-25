import {AdminApiApp as AdminRestApiApp, PublicApiApp as PublicRestApiApp} from 'golb-rest-api';
import {AdminServerApp as AdminUiApp, PublicServerApp as PublicUiApp} from 'golb-web-ui';
import express from 'express';

let server;
let app;

const start = async ({
    webPort = 80,
    webHost = "localhost",

    dbName = "glob",
    dbPort = 27017,
    dbHost = "localhost",

    sessionSecret = "sdnDS32VSIdjSe2AE2SADfD",

    adminApiRoot = "/admin-api",
    publicApiRoot = "/public-api",

    adminRoot = "/admin",
    publicRoot = "/",

    adminEmail = "change@myemail.com",
    adminPassword = "changepassword",
    adminDisplayName = "Admin",
    adminSlug = "admin"
} = {}) =>
{
    if (!app)
    {
        app = express();

        const adminRestApiApp = new AdminRestApiApp({
            sessionSecret,
            dbName,
            dbPort,
            dbHost
        });

        app.use(adminApiRoot, adminRestApiApp);

        await adminRestApiApp.insertUser({
            email: adminEmail,
            password: adminPassword,
            display_name: adminDisplayName,
            slug: adminSlug
        });

        app.use(publicApiRoot, new PublicRestApiApp({
            dbName,
            dbPort,
            dbHost
        }));

        app.use(adminRoot, new AdminUiApp({
            adminRoot,
            adminApiHostname: webHost,
            adminApiPort: webPort,
            adminApiBasename: adminApiRoot
        }));

        app.use(publicRoot, new PublicUiApp({
            publicApiHostname: webHost,
            publicApiPort: webPort,
            publicApiBasename: publicApiRoot
        }));
    }

    if (!server)
    {
        server = await app.listen(webPort, webHost, error => { if (error) throw error; });

        console.log("\nThe web server has stated.");
        console.log(`http://${webHost}:${webPort}${adminRoot} (Admin Page)`);
        console.log(`http://${webHost}:${webPort}${publicRoot} (Public Page)`);
    }
};

const stop = async () =>
{
    if (server)
    {
        await server.close();
        server = null;
    }
};

export default {start, stop};