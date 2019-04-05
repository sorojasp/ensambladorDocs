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
class CorreoPersona {
    constructor(correoPersona, tipoDocumentoPersona, numeroDocumentoPersona) {
        this.correoPersona = correoPersona;
        this.tipoDocumentoPersona = tipoDocumentoPersona;
        this.numeroDocumentoPersona = numeroDocumentoPersona;
    }
    static correoPersonaExiste(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `SELECT *
                FROM correoPersonas
                WHERE correoPersona = '${email}'`;
            return database_1.default.query(query)
                .then((result) => {
                if (result.length === 0)
                    return false;
                return result[0];
            });
        });
    }
    static guardarCorreoPersona(correoPersona) {
        return __awaiter(this, void 0, void 0, function* () {
            correoPersona.correoPersona = correoPersona.correoPersona.toLowerCase();
            correoPersona.tipoDocumentoPersona = correoPersona.tipoDocumentoPersona.toLowerCase();
            return yield database_1.default.query(`INSERT INTO correoPersonas set ?`, [correoPersona])
                .then(result => {
                return {
                    ok: true,
                    message: 'CorreoPersona guardado exitosamente'
                };
            })
                .catch((err) => {
                if (err.code === 'ER_DUP_ENTRY') {
                    return {
                        ok: false,
                        err: {
                            message: 'CorreoPersona ya existente'
                        }
                    };
                }
                return {
                    ok: false,
                    err: {
                        message: 'Ocurrio un error al guardar el CorreoPersona'
                    }
                };
            });
        });
    }
    static actualizarCorreoPersona(correoPersona) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(`
      UPDATE correoPersonas set ?
      WHERE numeroDocumentoPersona = ${correoPersona.numeroDocumentoPersona}
      AND tipoDocumentoPersona = '${correoPersona.tipoDocumentoPersona}'`, [correoPersona])
                .then(result => {
                return {
                    ok: true,
                    message: 'Correo Modificado exitosamente'
                };
            })
                .catch((err) => {
                console.log(err);
                return {
                    ok: false,
                    err: {
                        message: 'Ocurrio un error al modificar el Correo'
                    }
                };
            });
        });
    }
    static obtenerCorreoPersona(id, tipo) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `SELECT * FROM correoPersonas`;
            if ((id && tipo) != undefined) {
                query = `SELECT * FROM correoPersonas WHERE numeroDocumentoPersona = ${id} AND tipoDocumentoPersona = '${tipo}'`;
            }
            return database_1.default.query(query)
                .then((result) => {
                if (result.length === 0) {
                    return {
                        ok: false,
                        err: {
                            message: `no hay registros con esos datos`
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
    static borrarCorreoPersona(tipoDocumentoPersona, numeroDocumentoPersona) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(`
      DELETE
      FROM correoPersonas
      WHERE correoPersonas.numeroDocumentoPersona = ${numeroDocumentoPersona}
      AND correoPersonas.tipoDocumentoPersona = '${tipoDocumentoPersona}'`)
                .then(result => {
                if (result['affectedRows'] === 0) {
                    return {
                        ok: false,
                        message: 'Correo Persona No Fue eliminado',
                    };
                }
                return {
                    ok: true,
                    message: 'Correo Persona Eliminado exitosamente',
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
}
exports.CorreoPersona = CorreoPersona;
