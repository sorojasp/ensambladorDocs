"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database/database"));
const CorreoPersona_model_1 = require("./CorreoPersona.model");
class Persona {
    constructor(tipoDocumentoPersona, numeroDocumentoPersona, nombresPersona, apellidosPersona, fechaNacimientoPersona, direccionPersona, generoPersona, lugarExpedicionCedulaPersona, contrasenaPersona, codigoCiudad) {
        this.tipoDocumentoPersona = tipoDocumentoPersona;
        this.numeroDocumentoPersona = numeroDocumentoPersona;
        this.nombresPersona = nombresPersona;
        this.apellidosPersona = apellidosPersona;
        this.fechaNacimientoPersona = fechaNacimientoPersona;
        this.direccionPersona = direccionPersona;
        this.generoPersona = generoPersona;
        this.lugarExpedicionCedulaPersona = lugarExpedicionCedulaPersona;
        this.contrasenaPersona = contrasenaPersona;
        this.codigoCiudad = codigoCiudad;
    }
    //=====================================================================
    // Esta consulta verifica si la Persona esta en db y la retorna
    //=====================================================================
    /*
    * Busca en la tabla Correos, luego si el correo esta utiliza la info. de
    * esta tabla (correos), y la utiliza para buscar mas informacion en le
    * tabla Personas
    */
    static login(correoPersona) {
        return __awaiter(this, void 0, void 0, function* () {
            const correo = yield CorreoPersona_model_1.CorreoPersona.correoPersonaExiste(correoPersona);
            if (!correo) {
                return {
                    ok: false,
                    err: {
                        message: '(Email) o Contraseña incorrectos'
                    }
                };
            }
            return database_1.default.query(`
      SELECT *
      FROM Personas
      WHERE tipoDocumentoPersona = '${correo.tipoDocumentoPersona}'
      AND numeroDocumentoPersona = '${correo.numeroDocumentoPersona}'
      AND contrasenaPersona IS NOT NULL LIMIT 1`)
                .then((result) => {
                if (result.length === 0 || result[0].contrasenaPersona === null) {
                    return {
                        ok: false,
                        err: {
                            message: '(Email) o Contraseña incorrectos'
                        }
                    };
                }
                return {
                    ok: true,
                    message: 'Usuario logeado',
                    usuario: result[0]
                };
            })
                .catch((error) => {
                console.log(error);
                return {
                    ok: false,
                    err: {
                        message: 'Ocurrio un error en el logeo',
                    },
                    error
                };
            });
        });
    }
    //=====================================================================
    // Esta consulta guarda una Persona en db
    //=====================================================================
    /*
    * Usando otros modelos busca si la persona que se va a guardar, esta
    * guardada ya en otra tabla, si lo esta, actualiza el resgistro en la tabla
    * Personas luego si el correo existe no guarda nada.
    */
    static guardarPersona(newPersona, correoPersona) {
        return __awaiter(this, void 0, void 0, function* () {
            let existePersona = yield database_1.default.query(`
      SELECT *
      FROM Personas
      WHERE tipoDocumentoPersona = '${newPersona.tipoDocumentoPersona}'
      AND numeroDocumentoPersona = '${newPersona.numeroDocumentoPersona}'
      AND contrasenaPersona IS NULL `)
                .then((result) => {
                if (result.length === 0)
                    return false;
                return true;
            });
            if (existePersona && correoPersona != undefined) {
                return yield this.actualizarPersona(newPersona, correoPersona.toLowerCase());
            }
            if (correoPersona != undefined && newPersona['contrasenaPersona'] != undefined) {
                let existeCorreo = yield CorreoPersona_model_1.CorreoPersona.correoPersonaExiste(correoPersona.toLowerCase());
                if (existeCorreo) {
                    return {
                        ok: false,
                        err: {
                            message: 'Correo ya existente'
                        }
                    };
                }
            }
            newPersona.tipoDocumentoPersona = newPersona.tipoDocumentoPersona.toLowerCase();
            return database_1.default.query('INSERT INTO Personas set ?', [newPersona])
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                if (correoPersona != undefined) {
                    let correoRes = yield CorreoPersona_model_1.CorreoPersona.guardarCorreoPersona(new CorreoPersona_model_1.CorreoPersona(correoPersona, newPersona['tipoDocumentoPersona'], newPersona['numeroDocumentoPersona']));
                    if (!correoRes.ok) {
                        correoRes['message'] = correoRes.err['message'];
                    }
                    return {
                        ok: true,
                        message: 'Persona guardada exitosamente ' + correoRes['message']
                    };
                }
                return {
                    ok: true,
                    message: 'Persona guardada exitosamente '
                };
            }))
                .catch((error) => {
                if (error.code === 'ER_DUP_ENTRY') {
                    return {
                        ok: false,
                        err: {
                            message: 'Persona ya existente'
                        }
                    };
                }
                return {
                    ok: false,
                    err: {
                        message: 'Ocurrio un error al guardar el Persona'
                    },
                    error
                };
            });
        });
    }
    //=====================================================================
    // Esta consulta actualiza un apersona en DB
    //=====================================================================
    /*
    * Para Aactualizar un registro en la tabla Perssonas Requerimos Tambien
    * Cambiar la tabla de correoPersona.
    */
    static actualizarPersona(newPersona, correoPersona) {
        return __awaiter(this, void 0, void 0, function* () {
            if (newPersona['contrasenaPersona'] === undefined) {
                return {
                    ok: false,
                    err: {
                        message: 'Actualizar a una persona desde la informacion de una Empresa o personaNatural no es permitido, por ahora'
                    }
                };
            }
            if (correoPersona != undefined) {
                CorreoPersona_model_1.CorreoPersona.actualizarCorreoPersona(new CorreoPersona_model_1.CorreoPersona(correoPersona, newPersona.tipoDocumentoPersona, newPersona.numeroDocumentoPersona));
            }
            return database_1.default.query(`
      UPDATE Personas set ?
      WHERE numeroDocumentoPersona = ${newPersona.numeroDocumentoPersona}
      AND tipoDocumentoPersona = '${newPersona.tipoDocumentoPersona}'`, [newPersona])
                .then(result => {
                if (result['affectedRows'] === 0) {
                    return {
                        ok: false,
                        message: 'Persona no encontrada al modificar'
                    };
                }
                return {
                    ok: true,
                    message: 'Persona Modificado exitosamente'
                };
            })
                .catch((err) => {
                console.log(err);
                return {
                    ok: false,
                    err: {
                        message: 'Ocurrio un error al modificar el Persona'
                    }
                };
            });
        });
    }
    //=====================================================================
    // Esta consulta retorna todas las personas en db
    //=====================================================================
    /*
    * Retorna todas las personas haciendo match entre la tabla correo y personas
    * ( si la persona no tiene correo no puede ser vista con esta consulta)
    */
    static obtenerPersona() {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(`
      SELECT *
      FROM Personas
      `
            // WHERE Personas.numeroDocumentoPersona = correoPersonas.numeroDocumentoPersona
            // AND Personas.tipoDocumentoPersona = correoPersonas.tipoDocumentoPersona`
            )
                .then(result => {
                if (result.length === 0) {
                    return {
                        ok: false,
                        err: {
                            message: 'Query exitoso, Pero no hay coincidencias en las tablas Personas y Correos',
                        },
                        result
                    };
                }
                return {
                    ok: true,
                    message: 'Query exitoso',
                    result
                };
            })
                .catch((error) => {
                return {
                    ok: false,
                    err: {
                        message: 'Query fallido',
                    },
                    error
                };
            });
        });
    }
    //=====================================================================
    // Esta consulta retorna todas las personas en db
    //=====================================================================
    static obtenerUnaPersona(identificacion, tipoDocumentoPersona) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(`
      SELECT *
      FROM Personas
      WHERE Personas.numeroDocumentoPersona = ${identificacion}
      AND Personas.tipoDocumentoPersona = '${tipoDocumentoPersona}'`)
                .then((result) => {
                if (result.length === 0) {
                    return {
                        ok: false,
                        err: {
                            message: 'No encontrado',
                        },
                        result
                    };
                }
                return {
                    ok: true,
                    message: 'Query exitoso',
                    result
                };
            });
        });
    }
    static borrarUnaPersona(identificacion, tipoDocumentoPersona) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(`
      DELETE
      FROM Personas
      WHERE Personas.numeroDocumentoPersona = ${identificacion}
      AND Personas.tipoDocumentoPersona = '${tipoDocumentoPersona}'`)
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                if (result['affectedRows'] === 0) {
                    return {
                        ok: false,
                        err: {
                            message: 'No encontrado',
                        }
                    };
                }
                let correoPersonaRes = yield CorreoPersona_model_1.CorreoPersona.borrarCorreoPersona(tipoDocumentoPersona, identificacion);
                if (correoPersonaRes.ok) {
                    return {
                        ok: true,
                        message: 'Persona Eliminada con exito ' + correoPersonaRes['message']
                    };
                }
                if (!correoPersonaRes.ok) {
                    return {
                        ok: true,
                        message: 'Persona Eliminada con exito ' + correoPersonaRes.err['message']
                    };
                }
            }))
                .catch((error) => {
                return {
                    ok: false,
                    err: {
                        message: 'Query fallido',
                    },
                    error
                };
            });
        });
    }
}
exports.Persona = Persona;
