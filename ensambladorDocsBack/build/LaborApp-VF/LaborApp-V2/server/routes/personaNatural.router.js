"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personaNatural_controllers_1 = require("../controllers/personaNatural.controllers");
class PersonaNaturalRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        //=====================================================================
        // Guardar Una PersonaNatural
        //=====================================================================
        this.router.post('/persona-natural', personaNatural_controllers_1.PersonaNaturalControllers.guardarPersonaNatural);
        //=====================================================================
        // Obtener Todas las Personas Naturales
        //=====================================================================
        this.router.get('/persona-natural', personaNatural_controllers_1.PersonaNaturalControllers.obtenerPersonaNatural);
        //=====================================================================
        // Obtener Una Persona Natural
        //=====================================================================
        this.router.get('/persona-natural/:id', personaNatural_controllers_1.PersonaNaturalControllers.obtenerUnaPersonaNatural);
        //=====================================================================
        // Actualizar Una PersonaNatural
        //=====================================================================
        this.router.put('/persona-natural/:id', personaNatural_controllers_1.PersonaNaturalControllers.actualizarPersonaNatural);
        //=====================================================================
        // Borrar Una PersonaNatural
        //=====================================================================
        this.router.delete('/persona-natural/:id', personaNatural_controllers_1.PersonaNaturalControllers.borrarPersonaNatural);
    }
}
const personaNaturalRouter = new PersonaNaturalRouter();
exports.default = personaNaturalRouter.router;
