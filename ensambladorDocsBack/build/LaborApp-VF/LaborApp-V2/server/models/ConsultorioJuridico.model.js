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
class ConsultorioJuridico {
    constructor(IdconsultorioJuridico, nombreConsultorioJuridico, telefonoConsultorioJuridico, codigoCiudad, tipoDocumentoPersona, numeroDocumentoPersona, tipoConsultorioJuridico, emailConsultorioJuridico, direccionConsultorioJuridico) {
        this.IdconsultorioJuridico = IdconsultorioJuridico;
        this.nombreConsultorioJuridico = nombreConsultorioJuridico;
        this.telefonoConsultorioJuridico = telefonoConsultorioJuridico;
        this.codigoCiudad = codigoCiudad;
        this.tipoDocumentoPersona = tipoDocumentoPersona;
        this.numeroDocumentoPersona = numeroDocumentoPersona;
        this.tipoConsultorioJuridico = tipoConsultorioJuridico;
        this.emailConsultorioJuridico = emailConsultorioJuridico;
        this.direccionConsultorioJuridico = direccionConsultorioJuridico;
    }
    static existeConsultorioJuridico(persona) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_1.default.query(`SELECT * FROM consultorioJuridico WHERE numeroDocumentoPersona = '${persona.numeroDocumentoPersona}' AND tipoDocumentoPersona = '${persona.tipoDocumentoPersona}'`)
                .then((result) => {
                if (result.length === 0) {
                    return false;
                }
                return true;
            });
        });
    }
    static guardarConsultorioJuridico(consultorio) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(`INSERT INTO consultorioJuridico set ?`, [consultorio])
                .then(result => {
                return {
                    ok: true,
                    message: 'Consultorio Juridico guardado exitosamente'
                };
            })
                .catch((err) => {
                if (err.code === 'ER_DUP_ENTRY') {
                    return {
                        ok: false,
                        err: {
                            message: 'Consultorio Juridico ya existente'
                        }
                    };
                }
                console.log(err);
                return {
                    ok: false,
                    err: {
                        message: 'Ocurrio un error al guardar el Consultorio Juridico'
                    }
                };
            });
        });
    }
}
exports.ConsultorioJuridico = ConsultorioJuridico;
