"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const demanda_controllers_1 = __importDefault(require("../controllers/demanda.controllers"));
const autenticacion_middleware_1 = require("../middleware/autenticacion.middleware");
class DemandaRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/generar/:tipo/:id', demanda_controllers_1.default.generarPdf); // id de la demanda, tipo: natural o jurídico
        this.router.get('/enviar/:identificacion', autenticacion_middleware_1.Autenticacion.verificacionToken, demanda_controllers_1.default.enviapdf);
        this.router.get('/descargar/:identificacion', demanda_controllers_1.default.descargarPdf);
    }
}
const demandaRouter = new DemandaRouter();
exports.default = demandaRouter.router;
