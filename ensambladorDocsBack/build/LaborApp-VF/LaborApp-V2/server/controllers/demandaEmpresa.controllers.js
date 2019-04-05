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
class DemandaEmpresaControllers {
    static guardarDemandaEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = req.body;
            let resNegativaErrorFront = (res) => {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Error al enviar datos desde el frontend'
                    }
                });
            };
            if (JSON.stringify(body).length <= 2) {
                return resNegativaErrorFront(res);
            }
            for (let key in body) {
                if (body[key] === undefined) {
                    return resNegativaErrorFront(res);
                }
            }
            body['respuestaFinalDemandaEmpresa'] = body['respuestaFinalDemandaEmpresa'] === 'true' ? 1 : 0;
            body['superaMinimaCuantiaPersJuri'] = body['superaMinimaCuantiaPersJuri'] === 'true' ? 1 : 0;
            const databaseRes = yield index_models_1.DemandaEmpresa.guardarDemandaEmpresa(new index_models_1.DemandaEmpresa(undefined, body['fechaDemandaEmpresa'], body['codigoCiudad'], body['tipoDocumentoPersona'].toLowerCase(), body['numeroDocumentoPersona'], body['NItEmpresa'], body['idContrato'], body['fechaPropuestaRadicacionDemandaEmpresa'], body['fecharRealRadicacionDemandaEmpresa'], body['fechaPropuestaRadicacionDerechoPetiEmpresa'], body['fecharRealRadicacionDerechoPetiEmpresa'], body['informeDesicionFinalDemandaEmpresa'], body['respuestaFinalDemandaEmpresa'], body['montoTotalDemandaPersJuri'], body['superaMinimaCuantiaPersJuri']));
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
    static obtenerDemandaEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const databaseRes = yield index_models_1.DemandaEmpresa.obtenerDemandaEmpresa();
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
    static borraDemandaEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            const databaseRes = yield index_models_1.DemandaEmpresa.borrarDemandaEmpresa(id);
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
}
exports.DemandaEmpresaControllers = DemandaEmpresaControllers;
