"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const demandaPersonaNatural_controllers_1 = require("../controllers/demandaPersonaNatural.controllers");
class DemandaPersonaNaturalRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post('/persona-natural', demandaPersonaNatural_controllers_1.DemandaPersonaNaturalController.guardarDemandaPersonaNatural);
        this.router.get('/persona-natural', demandaPersonaNatural_controllers_1.DemandaPersonaNaturalController.obtenerDemandaPersonaNatural);
        // this.router.put();
        this.router.delete('/persona-natural/:id', demandaPersonaNatural_controllers_1.DemandaPersonaNaturalController.borraDemandaPersonaNatural);
    }
}
exports.default = new DemandaPersonaNaturalRouter().router;
