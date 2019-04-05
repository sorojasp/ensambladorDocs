"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const demandaEmpresa_controllers_1 = require("../controllers/demandaEmpresa.controllers");
class DemandaEmpresaRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post('/empresa', demandaEmpresa_controllers_1.DemandaEmpresaControllers.guardarDemandaEmpresa);
        this.router.get('/empresa', demandaEmpresa_controllers_1.DemandaEmpresaControllers.obtenerDemandaEmpresa);
        // this.router.put();
        this.router.delete('/empresa/:id', demandaEmpresa_controllers_1.DemandaEmpresaControllers.borraDemandaEmpresa);
    }
}
exports.default = new DemandaEmpresaRouter().router;
