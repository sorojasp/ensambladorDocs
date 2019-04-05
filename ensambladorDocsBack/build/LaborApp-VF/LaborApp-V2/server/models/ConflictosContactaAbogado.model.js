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
class ConflictosContactaAbogado {
    constructor(idConflictoContactaAbogado, conflictoARL, conflictoPensiones, conflictoHorasExtras, conflictoDominicalesFestivos, idDemandaPersonaNatural, idDemandaEmpresa) {
        this.idConflictoContactaAbogado = idConflictoContactaAbogado;
        this.conflictoARL = conflictoARL;
        this.conflictoPensiones = conflictoPensiones;
        this.conflictoHorasExtras = conflictoHorasExtras;
        this.conflictoDominicalesFestivos = conflictoDominicalesFestivos;
        this.idDemandaPersonaNatural = idDemandaPersonaNatural;
        this.idDemandaEmpresa = idDemandaEmpresa;
    }
    static guardarConflictosContactaAbogado(conflictosContactaAbogado) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query("INSERT INTO conflictosContactaAbogado set ?", [conflictosContactaAbogado])
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                let conflictosContactaAbogadoRes = yield this.obtenerConflictosContactaAbogado();
                conflictosContactaAbogado['idConflictoContactaAbogado'] = conflictosContactaAbogadoRes.result[conflictosContactaAbogadoRes.result.length - 1]['idConflictoContactaAbogado'];
                return {
                    ok: true,
                    message: 'ConflictosContactaAbogado guardada exitosamente',
                    conflictosContactaAbogado
                };
            }))
                .catch((error) => {
                if (error.code === 'ER_DUP_ENTRY') {
                    return {
                        ok: false,
                        err: {
                            message: 'ConflictosContactaAbogado ya existente',
                        }
                    };
                }
                MediaStreamError;
                return {
                    ok: false,
                    err: {
                        message: 'Ocurrio un error al guardar la ConflictosContactaAbogado',
                    },
                    error
                };
            });
        });
    }
    static obtenerConflictosContactaAbogado(id, tipo) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `SELECT * FROM conflictosContactaAbogado`;
            if (id != undefined) {
                query = `SELECT * FROM conflictosContactaAbogado WHERE ${tipo} = ${id}`;
            }
            return database_1.default.query(query)
                .then((result) => {
                if (result.length === 0) {
                    return {
                        ok: false,
                        err: {
                            message: 'Query exitoso, Pero no hay coincidencias en las tabla ConflictoDespidoSJC'
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
exports.ConflictosContactaAbogado = ConflictosContactaAbogado;
