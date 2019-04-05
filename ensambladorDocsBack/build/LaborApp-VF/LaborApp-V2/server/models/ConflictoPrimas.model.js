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
class ConflictoPrimas {
    constructor(idConflictoPrima, fechaInicioContrato, fechaFinalContrato, fechaUltimaPrimaPagada, fechaFinalNoPagoPrima, montoDinero_Prima, idDemandaPersonaNatural, idDemandaEmpresa) {
        this.idConflictoPrima = idConflictoPrima;
        this.fechaInicioContrato = fechaInicioContrato;
        this.fechaFinalContrato = fechaFinalContrato;
        this.fechaUltimaPrimaPagada = fechaUltimaPrimaPagada;
        this.fechaFinalNoPagoPrima = fechaFinalNoPagoPrima;
        this.montoDinero_Prima = montoDinero_Prima;
        this.idDemandaPersonaNatural = idDemandaPersonaNatural;
        this.idDemandaEmpresa = idDemandaEmpresa;
    }
    static guardarConflictoPrimas(conflictoPrimas) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(`INSERT INTO conflictoPrimas set ?`, conflictoPrimas)
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                let conflictoPrimasRes = yield this.obtenerConflictoPrimas();
                conflictoPrimas['idConflictoPrima'] = conflictoPrimasRes.result[conflictoPrimasRes.result.length - 1]['idConflictoPrima'];
                return {
                    ok: true,
                    message: 'conflictoPrimas guardada exitosamente',
                    conflictoPrimas
                };
            }))
                .catch((error) => {
                if (error.code === 'ER_DUP_ENTRY') {
                    return {
                        ok: false,
                        err: {
                            message: 'conflictoPrimas ya existente'
                        }
                    };
                }
                return {
                    ok: false,
                    err: {
                        message: 'Ocurrio un error al guardar la conflictoPrimas',
                    },
                    error
                };
            });
        });
    }
    static obtenerConflictoPrimas(id, tipo) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `SELECT * From conflictoPrimas`;
            if (id != undefined && tipo != undefined) {
                query = `SELECT * From conflictoPrimas WHERE ${tipo} = ${id}`;
            }
            return database_1.default.query(query)
                .then((result) => {
                if (result.length === 0) {
                    return {
                        ok: false,
                        err: {
                            message: 'Query exitoso, Pero no hay coincidencias en las tabla conflictoPrimas'
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
}
exports.ConflictoPrimas = ConflictoPrimas;
