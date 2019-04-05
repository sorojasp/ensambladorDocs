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
const index_models_1 = require("./index.models");
class PersonaNatural {
    constructor(IdPersonaNatural, tipoDocumentoPersona, numeroDocumentoPersona) {
        this.IdPersonaNatural = IdPersonaNatural;
        this.tipoDocumentoPersona = tipoDocumentoPersona;
        this.numeroDocumentoPersona = numeroDocumentoPersona;
    }
    static documentoUnico(documento, tipoDeDocumento) {
        switch (tipoDeDocumento.toLowerCase()) {
            case 'cedulaciudadania':
                return documento + 10;
            case 'pasaporte':
                return documento + 100;
        }
    }
    //=====================================================================
    // Esta Consulta Guarda en personaNatural en DB
    //=====================================================================
    /*
    * Se guarda primero en la tabla empresa (internamente el metodo
    * Persona.guardarPersona() tiene sus propias validaciones), luego lo guarda
    * en la tabla personaNatural, construye el idDePersonaNatural concatenando
    * el documento + un multiplo de 5
    */
    static guardarPersonaNatural(personaNatural, newPersona, correo) {
        return __awaiter(this, void 0, void 0, function* () {
            let personaRes = yield index_models_1.Persona.guardarPersona(newPersona, correo);
            if (!personaRes.ok) {
                return personaRes;
            }
            personaNatural['IdPersonaNatural'] = this.documentoUnico(personaNatural.numeroDocumentoPersona, personaNatural.tipoDocumentoPersona);
            return database_1.default.query(`
      INSERT INTO PersonaNatural
      SET IdPersonaNatural = ?,
      tipoDocumentoPersona = ?,
      numeroDocumentoPersona = ?`, [
                personaNatural['IdPersonaNatural'],
                personaNatural.tipoDocumentoPersona.toLowerCase(),
                personaNatural.numeroDocumentoPersona
            ])
                .then(result => {
                if (personaRes.ok)
                    return {
                        ok: true,
                        message: 'Persona Natural guardado exitosamente' + personaRes['message']
                    };
                if (!personaRes.ok)
                    return {
                        ok: true,
                        message: 'Persona Natural guardado exitosamente' + personaRes.err['message']
                    };
            })
                .catch((error) => {
                if (error.code === 'ER_DUP_ENTRY') {
                    return {
                        ok: false,
                        err: {
                            message: 'Persona Natural ya existente'
                        }
                    };
                }
                return {
                    ok: false,
                    err: {
                        message: 'Ocurrio un error al guardar el Persona Natural'
                    },
                    error
                };
            });
        });
    }
    static actualizarPersonaNatural(newPersonaNatural) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.default.query(`
      UPDATE PersonaNatural
      set ?
      WHERE numeroDocumentoPersona = ${newPersonaNatural.numeroDocumentoPersona}
      AND tipoDocumentoPersona = ${newPersonaNatural.tipoDocumentoPersona}`)
                .then(result => {
                return {
                    ok: true,
                    message: 'PersonaNatural Modificado exitosamente'
                };
            })
                .catch((err) => {
                console.log(err);
                return {
                    ok: false,
                    err: {
                        message: 'Ocurrio un error al modificar el usuario'
                    }
                };
            });
        });
    }
    static obtenerPersonaNatural() {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(`
      SELECT *
      FROM PersonaNatural
      `
            // WHERE PersonaNatural.numeroDocumentoPersona = Personas.numeroDocumentoPersona
            // AND PersonaNatural.tipoDocumentoPersona = Personas.tipoDocumentoPersona`
            )
                .then((result) => {
                if (result.length === 0) {
                    return {
                        ok: false,
                        err: {
                            message: 'Query exitoso, Pero no hay coincidencias en las tablas PersonasNatural ',
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
                .catch(err => {
                return {
                    ok: false,
                    message: 'Query fallido',
                    err
                };
            });
        });
    }
    static obtenerUnaPersonaNatural(idPersonaNatural) {
        return database_1.default.query(`
      SELECT *
      FROM PersonaNatural
      WHERE IdPersonaNatural = ${idPersonaNatural} LIMIT 1`)
            .then((result) => {
            if (result.length === 0) {
                return {
                    ok: false,
                    err: {
                        message: 'Query exitoso, Pero no hay coincidencias en las tablas PersonasNatural y Correos',
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
            .catch(err => {
            return {
                ok: false,
                message: 'Query fallido',
                err
            };
        });
    }
    static borrarPersonaNatural(idPersonaNatural) {
        return database_1.default.query(`
      DELETE
      FROM PersonaNatural
      WHERE IdPersonaNatural = ${idPersonaNatural}`)
            .then((result) => {
            if (result['affectedRows'] === 0) {
                return {
                    ok: false,
                    err: {
                        message: 'Query exitoso, Pero no hay coincidencias en las tablas PersonasNatural y Correos',
                    },
                };
            }
            return {
                ok: true,
                message: 'Persona natural Borrada exitosamente',
            };
        })
            .catch(err => {
            return {
                ok: false,
                message: 'Query fallido',
                err
            };
        });
    }
}
exports.PersonaNatural = PersonaNatural;
