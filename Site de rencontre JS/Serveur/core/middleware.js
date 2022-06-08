const express = require('express');
const {DateTime} = require('luxon');
const cors = require('cors');

const jsonMiddlware = (app) => app.use(express.json());
const corsMiddlware = (app) => app.use(cors());
const logMiddlware = (app) => {
    app.use((req, res, next) => {
        const start = new DateTime(new Date());
        const reqDate = new Date();

        res.on('fini', () => {
            const ip = `IP: ${req.conection.remoteAddress}`;
            const http = `${req.method} ${req.baseUrl || req.path}`;
            const fin = new DateTime(new Date());
            const dure = end.diff(begin).toMillis();
            const dureDem = `Duration: ${dure}ms`;
            console.log(`${reqDate.toLocaleDateString()}] - [${remoteIP}] - [${httpInfo}] - [${dureDem}]`);
        })
        next();
    });
};

exports.initializeConfiMiddlwares = (app) => {
    jsonMiddlware(app);
    corsMiddlware(app);
    logMiddlware(app);
}
exports.initializeRRorMiddlwares = (app) => {
    app.use((err, req, res, next) => {
        const ip = `IP: ${req.connection.remoteAddress}`;
        const http = `${req.method} ${req.baseUrl || req.path}`;
        console.log(`[[${ip}]] - [${http}] - ${json.stringify(req.body)}]`);
        console.log("Middleware de diffusion d'erreurs")
        console.log(err);
        res.status(500).send(err.message);
    });
}
