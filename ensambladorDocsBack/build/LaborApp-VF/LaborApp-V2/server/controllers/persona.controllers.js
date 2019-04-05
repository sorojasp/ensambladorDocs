"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//Modulos
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const index_models_1 = require("../models/index.models");
class PersonaControllers {
    //=====================================================================
    // Controller del Login (METODO = POST)
    //=====================================================================
    /*
    * Este Controller revisa que el usuario este registrado, genera un token
    * cuyo payload contiene informacion del usuario registrado.
    */
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            if ((req.body.email || req.body.contrasenaPersona) === undefined) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Error al enviar datos del front'
                    }
                });
            }
            const databaseRes = yield index_models_1.Persona.login(req.body.email);
            if (databaseRes['ok'] === false) {
                return res.status(200).json(databaseRes);
            }
            if (!bcrypt.compareSync(req.body.contrasenaPersona, `${databaseRes['usuario'].contrasenaPersona}`)) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Email o (Contraseña) incorrectos'
                    }
                });
            }
            delete databaseRes['usuario'].contrasenaPersona;
            const cadocidad = 60 * 60 * 24 * 30;
            const token = jwt.sign({
                usuario: databaseRes['usuario'],
            }, process.env.JWT_SECRET, { expiresIn: cadocidad });
            databaseRes['token'] = token;
            return res.status(200).json(databaseRes);
        });
    }
    //=====================================================================
    // Controller Para Renovar el token (METODO = POST)
    //=====================================================================
    /*
    * Este Controller se encarga de renovar el token, solo si el front
    * detecta que el token esta proximo a vencerse.
    */
    static renuevaToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cadocidad = 60 * 60 * 24 * 30;
            const token = jwt.sign({
                usuario: req['usuario'],
            }, process.env.JWT_SECRET, { expiresIn: cadocidad });
            return res.status(200).json({
                ok: true,
                message: 'Token Renovado',
                usuario: req['usuario'],
                token
            });
        });
    }
    //=====================================================================
    // Controller Para Guardar una Persona (METODO = POST)
    //=====================================================================
    /*
    * Este Controller se encarga de encriptar la contraaseña y
    * guardar la persona en DB.
    */
    static guardarPersona(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = req.body;
            if (req.body == null || req.body == undefined) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Error al enviar datos del front'
                    }
                });
            }
            body.contrasenaPersona = bcrypt.hashSync(body.contrasenaPersona, 10);
            const databaseRes = yield index_models_1.Persona.guardarPersona(new index_models_1.Persona(body['tipoDocumentoPersona'].toLowerCase(), body['numeroDocumentoPersona'], body['nombresPersona'].toLowerCase(), body['apellidosPersona'].toLowerCase(), body['fechaNacimientoPersona'], body['direccionPersona'].toLowerCase(), body['generoPersona'].toLowerCase(), body['lugarExpedicionCedulaPersona'], body['contrasenaPersona'], body['codigoCiudad']), body['correoPersona']);
            if (databaseRes['message'] === 'Usuario ya existente') {
                return res.status(200).json(databaseRes);
            }
            ;
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
    static obtenerPersona(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const databaseRes = yield index_models_1.Persona.obtenerPersona();
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
    //=====================================================================
    // Controller Para Obtener una Persona (METODO = GET)
    //=====================================================================
    /*
    * Este Controller se encarga de retornar una sola persona
    */
    static obtenerUnaPersona(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let identificacion = req.params.id;
            let tipoIdentificacion = req.params.tipoId;
            const databaseRes = yield index_models_1.Persona.obtenerUnaPersona(identificacion, tipoIdentificacion);
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
    //=====================================================================
    // Controller Para Actualizar una Persona (METODO = PUT)
    //=====================================================================
    /*
    * Este Controller se encarga de actualizar una sola persona mediante el id
    */
    static actualizarPersona(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = req.body;
            const databaseRes = yield index_models_1.Persona.actualizarPersona(new index_models_1.Persona(body['tipoDocumentoPersona'], body['numeroDocumentoPersona'], body['nombresPersona'], body['apellidosPersona'], body['fechaNacimientoPersona'], body['direccionPersona'], body['generoPersona'], body['lugarExpedicionCedulaPersona'], body['contrasenaPersona'], body['codigoCiudad']), body['correoPersona']);
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
    //=====================================================================
    // Controller Para Borrar una Persona (METODO = DELETE)
    //=====================================================================
    /*
    * Este Controller se encarga de Borrar una sola persona
    */
    static borrarPersona(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let identificacion = req.params.id;
            let tipoIdentificacion = req.params.tipoId;
            const databaseRes = yield index_models_1.Persona.borrarUnaPersona(identificacion, tipoIdentificacion);
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
}
exports.PersonaControllers = PersonaControllers;
