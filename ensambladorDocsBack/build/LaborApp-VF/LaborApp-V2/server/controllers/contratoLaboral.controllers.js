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
const index_models_1 = require("../models/index.models");
class ContratoLaboralController {
    static guardarContratoLaboral(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = req.body;
            if (req.body == null || req.body == undefined) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Error al enviar datos del front'
                    }
                });
            }
            const databaseRes = yield index_models_1.ContratoLaboral.guardarContratoLaboral(new index_models_1.ContratoLaboral(undefined, body['tipoContrato'].toLowerCase(), body['fechaInicioContrato'], body['fechaFinalContrato'], body['ultimoSalario'], body['descripcionFunciones'], body['tipoDocumentoPersona'].toLowerCase(), body['numeroDocumentoPersona'], body['IdPersonaNatural'], body['NItEmpresa']));
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
    static obtenerContratoLaboral(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const databaseRes = yield index_models_1.ContratoLaboral.obtenerContratoLaboral();
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
    static obtenerUnContratoLaboral(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let identificacion = req.params.id;
            let tipoIdentificacion = req.params.tipoId;
            const databaseRes = yield index_models_1.ContratoLaboral;
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
    static actualizarContratoLaboral(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = req.body;
            const databaseRes = yield index_models_1.ContratoLaboral;
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
    static borrarContratoLaboral(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            const databaseRes = yield index_models_1.ContratoLaboral.borrarContratoLaboral(id);
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
}
exports.ContratoLaboralController = ContratoLaboralController;
