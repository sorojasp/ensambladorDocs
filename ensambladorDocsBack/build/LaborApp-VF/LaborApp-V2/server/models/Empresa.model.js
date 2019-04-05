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
class Empresa {
    constructor(NItEmpresa, nombreEmpresaRS, direccionEmpresa, codigoCiudad, telefonoEmpresa, emailEmpresa, tipoDocumentoPersona, numeroDocumentoPersona) {
        this.NItEmpresa = NItEmpresa;
        this.nombreEmpresaRS = nombreEmpresaRS;
        this.direccionEmpresa = direccionEmpresa;
        this.codigoCiudad = codigoCiudad;
        this.telefonoEmpresa = telefonoEmpresa;
        this.emailEmpresa = emailEmpresa;
        this.tipoDocumentoPersona = tipoDocumentoPersona;
        this.numeroDocumentoPersona = numeroDocumentoPersona;
    }
    //=====================================================================
    //  Esta Consulta Guarda una empresa en DB
    //=====================================================================
    /*
    * El metodo identifica si la empresa tiene representante legal, que seria
    * una  Persona, usando el modelo de Persona la guarda y
    * continua guardando la empresa; en el caso de que alguien introduzca la
    * misma empresa, pero esta vez tenga informacion del representante lega la info
    * de la empresa se actualiza.
    */
    static guardarEmpresa(empresa, persona) {
        return __awaiter(this, void 0, void 0, function* () {
            if (persona.numeroDocumentoPersona != undefined) {
                //console.log(persona)
                persona.codigoCiudad = empresa.codigoCiudad;
                empresa.tipoDocumentoPersona = persona.tipoDocumentoPersona;
                empresa.numeroDocumentoPersona = persona.numeroDocumentoPersona;
                let personaRes = yield index_models_1.Persona.guardarPersona(persona, empresa.emailEmpresa);
                if (personaRes.ok === false) {
                    console.log(personaRes);
                }
            }
            console.log(persona);
            return database_1.default.query("INSERT INTO Empresa set ?", [empresa])
                .then(result => {
                return {
                    ok: true,
                    message: 'Empresa guardada exitosamente'
                };
            })
                .catch((err) => __awaiter(this, void 0, void 0, function* () {
                if (err.code === 'ER_DUP_ENTRY') {
                    if (persona != undefined) {
                        let empresaRes = yield this.obtenerUnaEmpresa(empresa.NItEmpresa);
                        if (empresaRes['ok'] && empresaRes.result[0]['numeroDocumentoPersona'] === null) {
                            return this.actualizarEmpresa(empresa);
                        }
                    }
                    return {
                        ok: false,
                        message: 'Empresa ya existente'
                    };
                }
                return {
                    ok: false,
                    message: 'Ocurrio un error al guardar la empresa',
                    err
                };
            }));
        });
    }
    //=====================================================================
    // Esta consulta Actualiza una Empresa en DB
    //=====================================================================
    /*
    * Como parametro recive la nueva empresa y mediante los datos de la nueva
    * empresa se busca la que se actualiza.
    */
    static actualizarEmpresa(empresa) {
        return __awaiter(this, void 0, void 0, function* () {
            if (empresa.numeroDocumentoPersona || empresa.tipoDocumentoPersona) {
                return {
                    ok: false,
                    err: {
                        message: 'Cambiar los datos de el representante legal, no esta disponble, porfavor no los envie'
                    }
                };
            }
            return database_1.default.query(`
      UPDATE Empresa set ?
      WHERE NItEmpresa = '${empresa.NItEmpresa}'`, [empresa])
                .then(result => {
                return {
                    ok: true,
                    message: 'Empresa Modificado exitosamente'
                };
            })
                .catch((err) => {
                console.log(err);
                return {
                    ok: false,
                    err: {
                        message: 'Ocurrio un error al modificar la Empresa'
                    }
                };
            });
        });
    }
    //=====================================================================
    // Esta consulta retorna una las empresas en DB
    //=====================================================================
    /*
    * Busca a una sola empresa mediante el nit.
    */
    static obtenerUnaEmpresa(nit) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(`
      SELECT *
      FROM Empresa
      WHERE Empresa.NItEmpresa = ${nit}`)
                .then((result) => {
                if (result.length === 0) {
                    return {
                        ok: false,
                        err: {
                            message: 'Query exitoso, Pero no hay coincidencias en las tablas Personas y Empresas',
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
    //=====================================================================
    // Esta consulta Borra una empresas en DB
    //=====================================================================
    /*
    *  Mediante el nit se busca y se borra la empresa.
    */
    static borrarEmpresa(nit) {
        return __awaiter(this, void 0, void 0, function* () {
            return database_1.default.query(`
      DELETE
      FROM Empresa
      WHERE Empresa.NItEmpresa = ${nit}`)
                .then((result) => {
                if (result['affectedRows'] === 0) {
                    return {
                        ok: false,
                        err: {
                            message: 'Query exitoso, Pero no hay coincidencias en las tabla Empresas',
                        }
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
    //=====================================================================
    // Esta consulta retorna todas las empresas en DB
    //=====================================================================
    static obtenerEmpresas() {
        return database_1.default.query(`
      SELECT *
      FROM Empresa`)
            .then((result) => {
            if (result.length === 0) {
                return {
                    ok: false,
                    err: {
                        message: 'Query exitoso, Pero no hay coincidencias en las tabla Empresas',
                    }
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
}
exports.Empresa = Empresa;
