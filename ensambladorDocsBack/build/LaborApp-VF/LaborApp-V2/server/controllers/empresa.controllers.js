"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//Models
const index_models_1 = require("../models/index.models");
class EmpresaControllers {
    //=====================================================================
    // Controller para Guardar una Persona (METODO = POST)
    //=====================================================================
    /*
    * Este Controller seencarga de guardar una empresa en DB usando su modelo,
    * e interactua con la respuesta del modelo.
    */
    static guardarEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = req.body;
            req.body['empresa'];
            const databaseRes = yield index_models_1.Empresa.guardarEmpresa(new index_models_1.Empresa(body['NItEmpresa'], body['nombreEmpresaRS'], body['direccionEmpresa'], body['codigoCiudad'], body['telefonoEmpresa'], body['emailEmpresa'], body['tipoDocumentoPersona'], body['numeroDocumentoPersona']), new index_models_1.Persona(body['tipoDocumentoPersona'], body['numeroDocumentoPersona'], body['nombresPersona'], body['apellidosPersona']));
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
    //=====================================================================
    // Controller Para Obtener Todas las Empresas (METODO = GET)
    //=====================================================================
    /*
    * Este Controller se encarga de enviar todas las empresas en la DB
    */
    static obtenerEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const databaseRes = yield index_models_1.Empresa.obtenerEmpresas();
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
    //=====================================================================
    // Controller Para Obtener UNA  Empresa (METODO = GET)
    //=====================================================================
    /*
    * Este Controller se encarga de enviar una las empresas en la DB
    */
    static obtenerUnaEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let identificacion = req.params.id;
            const databaseRes = yield index_models_1.Empresa.obtenerUnaEmpresa(identificacion);
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
    //=====================================================================
    // Controller Para actualizar UNA  Empresa (METODO = PUT)
    //=====================================================================
    /*
    * Este Controller se encarga de actualizar una las empresas en la DB
    */
    static actualizarEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const databaseRes = yield index_models_1.Empresa.actualizarEmpresa(req.body);
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
    //=====================================================================
    // Controller Para Borrar UNA  Empresa (METODO = DELETE)
    //=====================================================================
    /*
    * Este Controller se encarga de actualizar una las empresas en la DB
    */
    static borrarEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            const databaseRes = yield index_models_1.Empresa.borrarEmpresa(id);
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
}
exports.EmpresaControllers = EmpresaControllers;
