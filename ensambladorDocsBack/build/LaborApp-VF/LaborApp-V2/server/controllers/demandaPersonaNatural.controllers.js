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
class DemandaPersonaNaturalController {
    static guardarDemandaPersonaNatural(req, res) {
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
            body['respuestaFinalDemandaersonaN'] = body['respuestaFinalDemandaersonaN'] === 'true' ? 1 : 0;
            body['superaMinimaCuantiaPersNat'] = body['superaMinimaCuantiaPersNat'] === 'true' ? 1 : 0;
            const databaseRes = yield index_models_1.DemandaPersonaNatural.guardarDemandaPersonaNatural(new index_models_1.DemandaPersonaNatural(undefined, body['fechaDemandaPersonaNatural'], body['codigoCiudad'], body['tipoDocumentoPersona'], body['numeroDocumentoPersona'], body['IdPersonaNatural'], body['idContrato'], body['fechaPropuestaRadicacionDemandaPersonaN'], body['fecharRealRadicacionDemandaPersonaN'], body['fechaPropuestaRadicacionDerechoPetiPersonaN'], body['fecharRealRadicacionDerechoPetiPersonaN'], body['informeDesicionFinalDemandaPersonaN'], body['respuestaFinalDemandaersonaN'], body['montoTotalDemandaPersNat'], body['superaMinimaCuantiaPersNat']));
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
    static obtenerDemandaPersonaNatural(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const databaseRes = yield index_models_1.DemandaPersonaNatural.obtenerDemandaPersonaNatural();
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
    static borraDemandaPersonaNatural(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            const databaseRes = yield index_models_1.DemandaPersonaNatural.borrarDemandaPersonaNatural(id);
            if (databaseRes['ok'] === false) {
                return res.status(400).json(databaseRes);
            }
            ;
            return res.status(200).json(databaseRes);
        });
    }
}
exports.DemandaPersonaNaturalController = DemandaPersonaNaturalController;
