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
class ConflictoCesantias {
    constructor(idConflictoCesantias, fechaInicioContrato, fechaFinalContrato, fechaUltimasCesantiasPagadas, fechaFinalNoPagoCesantias, montoDinero_Cesantias, montoDinero_InteresesCesantias, idDemandaPersonaNatural, idDemandaEmpresa) {
        this.idConflictoCesantias = idConflictoCesantias;
        this.fechaInicioContrato = fechaInicioContrato;
        this.fechaFinalContrato = fechaFinalContrato;
        this.fechaUltimasCesantiasPagadas = fechaUltimasCesantiasPagadas;
        this.fechaFinalNoPagoCesantias = fechaFinalNoPagoCesantias;
        this.montoDinero_Cesantias = montoDinero_Cesantias;
        this.montoDinero_InteresesCesantias = montoDinero_InteresesCesantias;
        this.idDemandaPersonaNatural = idDemandaPersonaNatural;
        this.idDemandaEmpresa = idDemandaEmpresa;
    }
    static guardarConflictoCesantias(conflictoCesantias) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query("INSERT INTO conflictoCesantias set ?", [conflictoCesantias])
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                let conflictoCesantiasRes = yield this.obtenerConflictoCesantias();
                conflictoCesantias['idConflictoCesantias'] = conflictoCesantiasRes.result[conflictoCesantiasRes.result.length - 1]['idConflictoCesantias'];
                return {
                    ok: true,
                    message: 'ConflictoCesantias guardada exitosamente',
                    conflictoCesantias
                };
            }))
                .catch((error) => {
                if (error.code === 'ER_DUP_ENTRY') {
                    return {
                        ok: false,
                        err: {
                            message: 'ConflictoCesantias ya existente'
                        },
                    };
                }
                return {
                    ok: false,
                    err: {
                        message: 'Ocurrio un error al guardar la ConflictoCesantias',
                    },
                    error
                };
            });
        });
    }
    static obtenerConflictoCesantias(id, tipo) {
        let query = `SELECT * FROM conflictoCesantias`;
        if (id != undefined && tipo != undefined) {
            query = `SELECT * FROM conflictoCesantias WHERE ${tipo} = ${id}`;
        }
        return database_1.default.query(query)
            .then((result) => {
            if (result.length === 0) {
                return {
                    ok: false,
                    err: {
                        message: 'Query exitoso, Pero no hay coincidencias en las tabla ConflictoCesantias'
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
    }
}
exports.ConflictoCesantias = ConflictoCesantias;
