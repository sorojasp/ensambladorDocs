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
class DemandaPersonaNatural {
    constructor(idDemandaPersonaNatural, fechaDemandaPersonaNatural, codigoCiudad, tipoDocumentoPersona, numeroDocumentoPersona, IdPersonaNatural, idContrato, fechaPropuestaRadicacionDemandaPersonaN, fecharRealRadicacionDemandaPersonaN, fechaPropuestaRadicacionDerechoPetiPersonaN, fecharRealRadicacionDerechoPetiPersonaN, informeDesicionFinalDemandaPersonaN, respuestaFinalDemandaersonaN, montoTotalDemandaPersNat, superaMinimaCuantiaPersNat) {
        this.idDemandaPersonaNatural = idDemandaPersonaNatural;
        this.fechaDemandaPersonaNatural = fechaDemandaPersonaNatural;
        this.codigoCiudad = codigoCiudad;
        this.tipoDocumentoPersona = tipoDocumentoPersona;
        this.numeroDocumentoPersona = numeroDocumentoPersona;
        this.IdPersonaNatural = IdPersonaNatural;
        this.idContrato = idContrato;
        this.fechaPropuestaRadicacionDemandaPersonaN = fechaPropuestaRadicacionDemandaPersonaN;
        this.fecharRealRadicacionDemandaPersonaN = fecharRealRadicacionDemandaPersonaN;
        this.fechaPropuestaRadicacionDerechoPetiPersonaN = fechaPropuestaRadicacionDerechoPetiPersonaN;
        this.fecharRealRadicacionDerechoPetiPersonaN = fecharRealRadicacionDerechoPetiPersonaN;
        this.informeDesicionFinalDemandaPersonaN = informeDesicionFinalDemandaPersonaN;
        this.respuestaFinalDemandaersonaN = respuestaFinalDemandaersonaN;
        this.montoTotalDemandaPersNat = montoTotalDemandaPersNat;
        this.superaMinimaCuantiaPersNat = superaMinimaCuantiaPersNat;
    }
    static guardarDemandaPersonaNatural(demandaPersonaNatural) {
        return __awaiter(this, void 0, void 0, function* () {
            let personaNaturalRes = yield index_models_1.PersonaNatural.obtenerUnaPersonaNatural(demandaPersonaNatural.IdPersonaNatural);
            if (!personaNaturalRes.ok) {
                return {
                    ok: false,
                    err: {
                        message: 'No se encontro ninguna persona natural, con ese id'
                    }
                };
            }
            let personaRes = yield index_models_1.Persona.obtenerUnaPersona(demandaPersonaNatural.numeroDocumentoPersona, demandaPersonaNatural.tipoDocumentoPersona);
            if (!personaRes.ok) {
                return {
                    ok: false,
                    err: {
                        message: 'La persona que solicita la demanda no esta resgistrada, primero ingrese una persona'
                    }
                };
            }
            let contratoLaboralRes = yield index_models_1.ContratoLaboral.obtenerContratoLaboral(demandaPersonaNatural.idContrato);
            if (!contratoLaboralRes.ok) {
                return {
                    ok: false,
                    err: {
                        message: 'No se encontro ningun contrato, con ese id'
                    }
                };
            }
            else {
                if (contratoLaboralRes.result[0]['IdPersonaNatural'] === null || contratoLaboralRes.result[0]['IdPersonaNatural'] != demandaPersonaNatural.IdPersonaNatural) {
                    return {
                        ok: false,
                        err: {
                            message: 'La informacion del contrato, referente a la PersonaNatural no coincide con el (id)'
                        }
                    };
                }
            }
            return database_1.default.query(`INSERT INTO demandaPersonaNatural set ?`, [demandaPersonaNatural])
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                let demandaPersonaNaturalRes = yield this.obtenerDemandaPersonaNatural();
                demandaPersonaNatural['idDemandaPersonaNatural'] = demandaPersonaNaturalRes.result[demandaPersonaNaturalRes.result.length - 1].idDemandaPersonaNatural;
                return {
                    ok: true,
                    message: 'Demanda Persona Natural guardada exitosamente',
                    demandaPersonaNatural
                };
            }))
                .catch((err) => {
                if (err.code === 'ER_DUP_ENTRY') {
                    return {
                        ok: false,
                        message: 'Demanda Persona Natural ya existente'
                    };
                }
                return {
                    ok: false,
                    message: 'Ocurrio un error al guardar la Demanda Persona Natural',
                    err
                };
            });
        });
    }
    static obtenerDemandaPersonaNatural(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `SELECT * FROM demandaPersonaNatural`;
            if (id != (undefined || null)) {
                query = `SELECT * FROM demandaPersonaNatural WHERE idDemandaPersonaNatural = ${id}`;
            }
            return database_1.default.query(query)
                .then((result) => {
                if (result.length === 0) {
                    return {
                        ok: false,
                        err: {
                            message: 'Query exitoso, Pero no hay coincidencias en las tabla Demanda Persona Natural'
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
    static borrarDemandaPersonaNatural(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(`
    DELETE
    FROM demandaPersonaNatural
    WHERE idDemandaPersonaNatural = ${id}`)
                .then((result) => {
                if (result['affectedRows'] === 0) {
                    return {
                        ok: false,
                        err: {
                            message: 'Query exitoso, Pero no hay coincidencias en las tabla Demanda Persona Natural'
                        }
                    };
                }
                return {
                    ok: true,
                    message: 'Demanda PersonaNatural borrada exitosamente'
                };
            });
        });
    }
}
exports.DemandaPersonaNatural = DemandaPersonaNatural;
