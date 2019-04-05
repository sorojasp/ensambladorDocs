"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contratoLaboral_controllers_1 = require("../controllers/contratoLaboral.controllers");
class ContratoLaboralRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post('/contrato', contratoLaboral_controllers_1.ContratoLaboralController.guardarContratoLaboral);
        this.router.get('/contrato', contratoLaboral_controllers_1.ContratoLaboralController.obtenerContratoLaboral);
        this.router.get('/contrato/:id', contratoLaboral_controllers_1.ContratoLaboralController.obtenerUnContratoLaboral);
        this.router.put('/contrato/:id', contratoLaboral_controllers_1.ContratoLaboralController.actualizarContratoLaboral);
        this.router.delete('/contrato/:id', contratoLaboral_controllers_1.ContratoLaboralController.borrarContratoLaboral);
    }
}
const contratoLaboralRouter = new ContratoLaboralRouter();
exports.default = contratoLaboralRouter.router;
