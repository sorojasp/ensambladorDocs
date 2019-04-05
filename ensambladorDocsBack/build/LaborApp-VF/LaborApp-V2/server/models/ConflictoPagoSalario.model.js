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
class ConflictoPagoSalario {
    constructor(idConflictoPagoSalario, fechaInicioContrato, fechaInicioNoPago, fechaFinalNoPagoSalario, fechaFinalContrato, montoDinero_PagoSalario, idDemandaPersonaNatural, idDemandaEmpresa) {
        this.idConflictoPagoSalario = idConflictoPagoSalario;
        this.fechaInicioContrato = fechaInicioContrato;
        this.fechaInicioNoPago = fechaInicioNoPago;
        this.fechaFinalNoPagoSalario = fechaFinalNoPagoSalario;
        this.fechaFinalContrato = fechaFinalContrato;
        this.montoDinero_PagoSalario = montoDinero_PagoSalario;
        this.idDemandaPersonaNatural = idDemandaPersonaNatural;
        this.idDemandaEmpresa = idDemandaEmpresa;
    }
    static guardarConflictoPagoSalario(conflictoPagoSalario) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query("INSERT INTO conflictoPagoSalario set ?", [conflictoPagoSalario])
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                let conflictoPagoSalarioRes = yield this.obtenerConflictoPagoSalario();
                conflictoPagoSalario['idConflictoPagoSalario'] = conflictoPagoSalarioRes.result[conflictoPagoSalarioRes.result.length - 1]['idConflictoPagoSalario'];
                return {
                    ok: true,
                    message: 'ConflictoPagoSalario guardada exitosamente',
                    conflictoPagoSalario
                };
            }))
                .catch((err) => {
                if (err.code === 'ER_DUP_ENTRY') {
                    return {
                        ok: false,
                        message: 'ConflictoPagoSalario ya existente'
                    };
                }
                return {
                    ok: false,
                    message: 'Ocurrio un error al guardar la ConflictoPagoSalario',
                    err
                };
            });
        });
    }
    static obtenerConflictoPagoSalario(id, tipo) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `SELECT * FROM conflictoPagoSalario`;
            if (id != undefined && tipo != undefined) {
                query = `SELECT * FROM conflictoPagoSalario WHERE ${tipo} = ${id}`;
            }
            return database_1.default.query(query)
                .then((result) => {
                if (result.length === 0) {
                    return {
                        ok: true,
                        err: {
                            message: 'Query exitoso, Pero no hay coincidencias en las tabla ConflictoPagoSalario'
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
exports.ConflictoPagoSalario = ConflictoPagoSalario;
