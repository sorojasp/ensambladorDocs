"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_models_1 = require("../models/index.models");
class PersonaNaturalControllers {
    //=====================================================================
    // Controller Para Guardar una PersonaNatural (METODO = POST)
    //=====================================================================
    /*
    * Este Controller se encarga de encriptar la contraaseña y
    * guardar la persona en DB.
    */
    static guardarPersonaNatural(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            if (req.body == null || req.body == undefined) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Error al enviar datos del front'
                    }
                });
            }
            const databaseRes = yield index_models_1.PersonaNatural.guardarPersonaNatural(new index_models_1.PersonaNatural(undefined, body['tipoDocumentoPersona'], body['numeroDocumentoPersona']), new index_models_1.Persona(body['tipoDocumentoPersona'], body['numeroDocumentoPersona'], body['nombresPersona'], body['apellidosPersona'], body['fechaNacimientoPersona'], body['direccionPersona'], body['generoPersona'], body['lugarExpedicionCedulaPersona'], body['contrasenaPersona'], body['codigoCiudad']), body['correoPersona']);
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
    //=====================================================================
    // Controller Para Obtener Todas las Personas (METODO = GET)
    //=====================================================================
    /*
    * Este Controller se encarga de enviar todas las personas en la DB
    */
    static obtenerPersonaNatural(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const databaseRes = yield index_models_1.PersonaNatural.obtenerPersonaNatural();
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
    //=====================================================================
    // Controller Para Obtener una PersonaNatural (METODO = GET)
    //=====================================================================
    /*
    * Este Controller se encarga de retornar una sola personaNatural Mediante el ID
    */
    static obtenerUnaPersonaNatural(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let identificacion = req.params.id;
            const databaseRes = yield index_models_1.PersonaNatural.obtenerUnaPersonaNatural(identificacion);
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
    //=====================================================================
    // Controller Para Borrar una PersonaNatural (METODO = GET)
    //=====================================================================
    /*
    * Este Controller se encarga de Borrar una sola personaNatural Mediante el ID
    */
    static borrarPersonaNatural(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let identificacion = req.params.id;
            const databaseRes = yield index_models_1.PersonaNatural.borrarPersonaNatural(identificacion);
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
    //=====================================================================
    // Controller Para Actualizar una PersonaNatural (METODO = PUT)
    //=====================================================================
    /*
    * Este Controller se encarga de retornar una sola personaNatural Mediante el ID
    */
    static actualizarPersonaNatural(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = req.body;
            const databaseRes = yield index_models_1.PersonaNatural.actualizarPersonaNatural(new index_models_1.PersonaNatural(undefined, body['tipoDocumentoPersona'], body['numeroDocumentoPersona']));
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
}
exports.PersonaNaturalControllers = PersonaNaturalControllers;
