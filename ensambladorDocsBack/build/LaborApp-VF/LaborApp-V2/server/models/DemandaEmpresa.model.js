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
class DemandaEmpresa {
    constructor(idDemandaEmpresa, fechaDemandaEmpresa, codigoCiudad, tipoDocumentoPersona, numeroDocumentoPersona, NItEmpresa, idContrato, fechaPropuestaRadicacionDemandaEmpresa, fecharRealRadicacionDemandaEmpresa, fechaPropuestaRadicacionDerechoPetiEmpresa, fecharRealRadicacionDerechoPetiEmpresa, informeDesicionFinalDemandaEmpresa, respuestaFinalDemandaEmpresa, montoTotalDemandaPersJuri, superaMinimaCuantiaPersJuri) {
        this.idDemandaEmpresa = idDemandaEmpresa;
        this.fechaDemandaEmpresa = fechaDemandaEmpresa;
        this.codigoCiudad = codigoCiudad;
        this.tipoDocumentoPersona = tipoDocumentoPersona;
        this.numeroDocumentoPersona = numeroDocumentoPersona;
        this.NItEmpresa = NItEmpresa;
        this.idContrato = idContrato;
        this.fechaPropuestaRadicacionDemandaEmpresa = fechaPropuestaRadicacionDemandaEmpresa;
        this.fecharRealRadicacionDemandaEmpresa = fecharRealRadicacionDemandaEmpresa;
        this.fechaPropuestaRadicacionDerechoPetiEmpresa = fechaPropuestaRadicacionDerechoPetiEmpresa;
        this.fecharRealRadicacionDerechoPetiEmpresa = fecharRealRadicacionDerechoPetiEmpresa;
        this.informeDesicionFinalDemandaEmpresa = informeDesicionFinalDemandaEmpresa;
        this.respuestaFinalDemandaEmpresa = respuestaFinalDemandaEmpresa;
        this.montoTotalDemandaPersJuri = montoTotalDemandaPersJuri;
        this.superaMinimaCuantiaPersJuri = superaMinimaCuantiaPersJuri;
    }
    static guardarDemandaEmpresa(demandaEmpresa) {
        return __awaiter(this, void 0, void 0, function* () {
            let personaRes = yield index_models_1.Persona.obtenerUnaPersona(demandaEmpresa.numeroDocumentoPersona, demandaEmpresa.tipoDocumentoPersona);
            if (!personaRes.ok) {
                return {
                    ok: false,
                    err: {
                        message: 'Esta demanda no coincide con ninguna Persona en db, primero ingrese los datos de la persona'
                    }
                };
            }
            let empresaRes = yield index_models_1.Empresa.obtenerUnaEmpresa(demandaEmpresa.NItEmpresa);
            if (!empresaRes.ok) {
                return {
                    ok: false,
                    err: {
                        message: 'Esta demanda no coincide con ninguna Empresa en db, primero ingrese los datos de la Empresa'
                    }
                };
            }
            let contratoLaboralRes = yield index_models_1.ContratoLaboral.obtenerContratoLaboral(demandaEmpresa.idContrato);
            if (!contratoLaboralRes.ok) {
                return {
                    ok: false,
                    err: {
                        message: 'Esta demanda no coincide con ningun contrato en db, primero ingrese los datos del contrato'
                    }
                };
            }
            else {
                if (contratoLaboralRes.result[0]['NItEmpresa'] === (null || undefined) || contratoLaboralRes.result[0]['NItEmpresa'] != demandaEmpresa.NItEmpresa) {
                    return {
                        ok: false,
                        err: {
                            message: 'La informacion del contrato, referente a la empresa no coincide con la (nit)'
                        }
                    };
                }
                return database_1.default.query(`INSERT INTO demandaEmpresa set ?`, [demandaEmpresa])
                    .then((result) => __awaiter(this, void 0, void 0, function* () {
                    let demandaEmpresaRes = yield this.obtenerDemandaEmpresa();
                    if (demandaEmpresaRes.ok) {
                        demandaEmpresa['idDemandaEmpresa'] = demandaEmpresaRes.result[demandaEmpresaRes.result.length - 1].idDemandaEmpresa;
                    }
                    return {
                        ok: true,
                        message: 'Demanda Empresa guardada exitosamente',
                        demandaEmpresa
                    };
                }))
                    .catch((err) => {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return {
                            ok: false,
                            message: 'Demanda Empresa ya existente'
                        };
                    }
                    return {
                        ok: false,
                        message: 'Ocurrio un error al guardar la Demanda Empresa',
                        err
                    };
                });
            }
        });
    }
    static obtenerDemandaEmpresa(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `SELECT * FROM demandaEmpresa`;
            if (id != (undefined || null)) {
                query = `SELECT * FROM demandaEmpresa WHERE idDemandaEmpresa = ${id}`;
            }
            return database_1.default.query(query)
                .then((result) => {
                if (result.length === 0) {
                    return {
                        ok: false,
                        err: {
                            message: 'Query exitoso, Pero no hay coincidencias en las tabla Demanda Empresa'
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
    static borrarDemandaEmpresa(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(`
    DELETE
    FROM demandaEmpresa
    WHERE idDemandaEmpresa = ${id}`)
                .then((result) => {
                if (result['affectedRows'] === 0) {
                    return {
                        ok: false,
                        err: {
                            message: 'Demanda de Empresa no encontrada'
                        }
                    };
                }
                return {
                    ok: true,
                    message: 'Demanda de Empresa Eliminada'
                };
            });
        });
    }
}
exports.DemandaEmpresa = DemandaEmpresa;
