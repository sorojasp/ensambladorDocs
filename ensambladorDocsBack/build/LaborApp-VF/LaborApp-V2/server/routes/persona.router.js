"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const persona_controllers_1 = require("../controllers/persona.controllers");
const autenticacion_middleware_1 = require("../middleware/autenticacion.middleware");
class PersonaRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.post('/login', persona_controllers_1.PersonaControllers.login);
        this.router.post('/renuevaToken', autenticacion_middleware_1.Autenticacion.verificacionToken, persona_controllers_1.PersonaControllers.renuevaToken);
        //=====================================================================
        // Guardar Usuario
        //=====================================================================
        this.router.post('/persona', persona_controllers_1.PersonaControllers.guardarPersona);
        //=====================================================================
        // Obtener Todos los Usuarios
        //=====================================================================
        this.router.get('/persona', /*Autenticacion.verificacionToken,*/ persona_controllers_1.PersonaControllers.obtenerPersona);
        //=====================================================================
        // Obtener Un Usuario
        //=====================================================================
        this.router.get('/persona/:id/:tipoId', persona_controllers_1.PersonaControllers.obtenerUnaPersona);
        //=====================================================================
        // Actualizar un Usuario
        //=====================================================================
        this.router.put('/persona', persona_controllers_1.PersonaControllers.actualizarPersona);
        //=====================================================================
        // Borrar un Usuario
        //=====================================================================
        this.router.delete('/persona/:id/:tipoId', persona_controllers_1.PersonaControllers.borrarPersona);
    }
}
const personaRouter = new PersonaRouter();
exports.default = personaRouter.router;
