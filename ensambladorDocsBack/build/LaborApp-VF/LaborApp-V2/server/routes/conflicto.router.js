"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conflicto_controllers_1 = require("../controllers/conflicto.controllers");
class ConflictoRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post('/conflicto', conflicto_controllers_1.ConflictoController.guardarConflicto);
        this.router.get('/conflicto/:tipo', conflicto_controllers_1.ConflictoController.obtenerConflictos);
        // this.router.get('/contrato/:id', )
        // this.router.put('/contrato/:id', )
        // this.router.delete('/contrato/:id', )
    }
}
exports.default = new ConflictoRouter().router;
