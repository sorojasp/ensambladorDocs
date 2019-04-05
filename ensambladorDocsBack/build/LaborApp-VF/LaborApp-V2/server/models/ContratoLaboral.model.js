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
const index_models_1 = require("./index.models");
const database_1 = __importDefault(require("../database/database"));
class ContratoLaboral {
    constructor(idContrato, tipoContrato, fechaInicioContrato, fechaFinalContrato, ultimoSalario, descripcionFunciones, tipoDocumentoPersona, numeroDocumentoPersona, IdPersonaNatural, NItEmpresa) {
        this.idContrato = idContrato;
        this.tipoContrato = tipoContrato;
        this.fechaInicioContrato = fechaInicioContrato;
        this.fechaFinalContrato = fechaFinalContrato;
        this.ultimoSalario = ultimoSalario;
        this.descripcionFunciones = descripcionFunciones;
        this.tipoDocumentoPersona = tipoDocumentoPersona;
        this.numeroDocumentoPersona = numeroDocumentoPersona;
        this.IdPersonaNatural = IdPersonaNatural;
        this.NItEmpresa = NItEmpresa;
    }
    static guardarContratoLaboral(contratoLaboral) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((contratoLaboral.NItEmpresa && contratoLaboral.IdPersonaNatural) !== undefined) {
                return {
                    ok: false,
                    err: {
                        message: 'El contrato solo debe hacer referencia a una persona natural o a una empresa; nunca ambas'
                    }
                };
            }
            if (contratoLaboral.NItEmpresa != undefined) {
                let empresasRes = yield index_models_1.Empresa.obtenerUnaEmpresa(contratoLaboral.NItEmpresa);
                if (!empresasRes['ok']) {
                    return {
                        ok: false,
                        err: {
                            message: 'La empresa que emitio este contrato no existe'
                        }
                    };
                }
            }
            if (contratoLaboral.IdPersonaNatural != undefined) {
                let personaNaturalRes = yield index_models_1.PersonaNatural.obtenerUnaPersonaNatural(contratoLaboral.IdPersonaNatural);
                if (!personaNaturalRes['ok']) {
                    return {
                        ok: false,
                        err: {
                            message: 'La Persona Natural que emitio este contrato no existe'
                        }
                    };
                }
            }
            let personaRes = yield index_models_1.Persona.obtenerUnaPersona(contratoLaboral.numeroDocumentoPersona, contratoLaboral.tipoDocumentoPersona);
            if (!personaRes['ok']) {
                return {
                    ok: false,
                    err: {
                        message: 'La Persona implicada en este contrato no existe'
                    }
                };
            }
            return database_1.default.query(`INSERT INTO contratoLaboral set ?`, [contratoLaboral])
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                let contratoLaboralRes = yield this.obtenerContratoLaboral();
                contratoLaboral['idContrato'] = contratoLaboralRes.result[contratoLaboralRes.result.length - 1].idContrato;
                return {
                    ok: true,
                    message: 'Contrato Laboral guardado exitosamente',
                    contratoLaboral
                };
            }))
                .catch((err) => {
                console.log(err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return {
                        ok: false,
                        message: 'Contrato Laboral ya existente'
                    };
                }
                return {
                    ok: false,
                    message: 'Ocurrio un error al guardar la Contrato Laboral',
                    err
                };
            });
        });
    }
    static obtenerContratoLaboral(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id !== undefined) {
                return database_1.default.query(`SELECT * FROM contratoLaboral WHERE idContrato = ${id}`)
                    .then((result) => {
                    if (result.length === 0) {
                        return {
                            ok: false,
                            err: {
                                message: 'Query exitoso, Pero no hay coincidencias en las tablas Contrato Laboral'
                            },
                            result
                        };
                    }
                    return {
                        ok: true,
                        result
                    };
                });
            }
            return database_1.default.query(`SELECT * FROM contratoLaboral ORDER BY idContrato ASC`)
                .then((result) => {
                if (result.length === 0) {
                    return {
                        ok: false,
                        err: {
                            message: 'Query exitoso, Pero no hay coincidencias en las tablas Contrato Laboral'
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
    static borrarContratoLaboral(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(`
      DELETE 
      FROM contratoLaboral
      WHERE idContrato = ${id}`)
                .then((result) => {
                if (result['affectedRows'] === 0) {
                    return {
                        ok: false,
                        err: {
                            message: 'No encontrado',
                        }
                    };
                }
                return {
                    ok: true,
                    message: 'Contrato Laboral Eliminado con exito '
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
exports.ContratoLaboral = ContratoLaboral;
