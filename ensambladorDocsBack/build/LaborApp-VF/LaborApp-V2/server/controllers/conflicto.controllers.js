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
const conflictoDespidoSJC_model_1 = require("../models/conflictoDespidoSJC.model");
let revisarConflicto = (respuestaModelo, name, array) => {
    if (!respuestaModelo['ok']) {
        throw { [name]: respuestaModelo };
    }
    let objeto = {
        [name]: respuestaModelo
    };
    array.push(objeto);
};
class ConflictoController {
    static guardarConflicto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = req.body;
            console.log(body.conflictoDespidoSJC, typeof body.conflictoDespidoSJC);
            let conflictos = [];
            for (let clave in body) {
                console.log(clave, body[clave]);
                if (body[clave] === true) {
                    try {
                        switch (clave) {
                            case 'conflictoDespidoSJC':
                                let conflictoDespidoSJCRes = yield conflictoDespidoSJC_model_1.ConflictoDespidoSJC.guardarConflictoDespidoSJC(new conflictoDespidoSJC_model_1.ConflictoDespidoSJC(undefined, body['idDemandaPersonaNatural'], body['idDemandaEmpresa'], body['fechaInicioContrato'], body['tipoContrato'], body['fechaDespido'], body['montoDinero_DSJC']));
                                revisarConflicto(conflictoDespidoSJCRes, 'conflictoDespidoSJCRes', conflictos);
                                break;
                            case 'conflictoPagoSalario':
                                let conflictoPagoSalarioRes = yield index_models_1.ConflictoPagoSalario.guardarConflictoPagoSalario(new index_models_1.ConflictoPagoSalario(undefined, body['fechaInicioContrato'], body['fechaInicioNoPago'], body['fechaFinalNoPagoSalario'], body['fechaFinalContrato'], body['montoDinero_PagoSalario'], body['idDemandaPersonaNatural'], body['idDemandaEmpresa']));
                                revisarConflicto(conflictoPagoSalarioRes, 'conflictoPagoSalarioRes', conflictos);
                                break;
                            case 'conflictoVacaciones':
                                let conflictoVacacionesRes;
                                if (body['fechaUltimasVacaciones'] == undefined) {
                                    conflictoVacacionesRes = {
                                        ok: false,
                                        err: {
                                            message: 'fechaUltimasVacaciones no puede ser nulo'
                                        }
                                    };
                                }
                                else {
                                    conflictoVacacionesRes = yield index_models_1.ConflictoVacaciones.guardarConflictoVacaciones(new index_models_1.ConflictoVacaciones(undefined, body['fechaInicioContrato'], body['fechaFinalContrato'], body['fechaUltimasVacaciones'], body['fechaFinalNoPagoVacaciones'], body['montoDinero_Vacaciones'], body['idDemandaPersonaNatural'], body['idDemandaEmpresa']));
                                }
                                revisarConflicto(conflictoVacacionesRes, 'conflictoVacacionesRes', conflictos);
                                break;
                            case 'conflictoCesantias':
                                let conflictoCesantiasRes = yield index_models_1.ConflictoCesantias.guardarConflictoCesantias(new index_models_1.ConflictoCesantias(undefined, body['fechaInicioContrato'], body['fechaFinalContrato'], body['fechaUltimasCesantiasPagadas'], body['fechaFinalNoPagoCesantias'], body['montoDinero_Cesantias'], body['montoDinero_InteresesCesantias'], body['idDemandaPersonaNatural'], body['idDemandaEmpresa']));
                                revisarConflicto(conflictoCesantiasRes, 'conflictoCesantiasRes', conflictos);
                                break;
                            case 'conflictoPrimas':
                                let conflictoPrimasRes = yield index_models_1.ConflictoPrimas.guardarConflictoPrimas(new index_models_1.ConflictoPrimas(undefined, body['fechaInicioContrato'], body['fechaFinalContrato'], body['fechaUltimaPrimaPagada'], body['fechaFinalNoPagoPrima'], body['montoDinero_Prima'], body['idDemandaPersonaNatural'], body['idDemandaEmpresa']));
                                revisarConflicto(conflictoPrimasRes, 'conflictoPrimasRes', conflictos);
                                break;
                            case 'conflictosContactaAbogado':
                                let conflictosContactaAbogadoRes = yield index_models_1.ConflictosContactaAbogado.guardarConflictosContactaAbogado(new index_models_1.ConflictosContactaAbogado(undefined, body['conflictoARL'], body['conflictoPensiones'], body['conflictoHorasExtras'], body['conflictoDominicalesFestivos'], body['idDemandaPersonaNatural'], body['idDemandaEmpresa']));
                                revisarConflicto(conflictosContactaAbogadoRes, 'conflictosContactaAbogadoRes', conflictos);
                                break;
                        }
                    }
                    catch (err) {
                        console.log(err);
                        return res.status(400).json({
                            ok: false,
                            err: {
                                message: err[`${Object.keys(err)}`]['err']['message'] + ' En la tabla: ' + Object.keys(err)[0].replace('Res', ' ') + `;PERO TODOS LOS DEMAS CONFLICTOS ESTAN GUARDADOS EXITOSAMENTE`
                            }
                        });
                    }
                }
            }
            return res.status(200).json({
                ok: true,
                conflictos,
            });
        });
    }
    static obtenerConflictos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let tipo = req.params.tipo;
            if (tipo == undefined) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Error al enviar datos desde el front'
                    }
                });
            }
            let conflictos = [];
            try {
                switch (tipo) {
                    case 'conflictoDespidoSJC':
                        let conflictoDespidoSJCRes = yield conflictoDespidoSJC_model_1.ConflictoDespidoSJC.obtenerConflictoDespidoSJC();
                        revisarConflicto(conflictoDespidoSJCRes, 'conflictoDespidoSJCRes', conflictos);
                        break;
                    case 'conflictoPagoSalario':
                        let conflictoPagoSalarioRes = yield index_models_1.ConflictoPagoSalario.obtenerConflictoPagoSalario();
                        revisarConflicto(conflictoPagoSalarioRes, 'conflictoPagoSalarioRes', conflictos);
                        break;
                    case 'conflictoVacaciones':
                        let conflictoVacacionesRes = yield index_models_1.ConflictoVacaciones.obtenerConflictoVacaciones();
                        revisarConflicto(conflictoVacacionesRes, 'conflictoVacacionesRes', conflictos);
                        break;
                    case 'conflictoCesantias':
                        let conflictoCesantiasRes = yield index_models_1.ConflictoCesantias.obtenerConflictoCesantias();
                        revisarConflicto(conflictoCesantiasRes, 'conflictoCesantiasRes', conflictos);
                        break;
                    case 'conflictoPrimas':
                        let conflictoPrimasRes = yield index_models_1.ConflictoPrimas.obtenerConflictoPrimas();
                        revisarConflicto(conflictoPrimasRes, 'conflictoPrimasRes', conflictos);
                        break;
                    case 'conflictosContactaAbogado':
                        let conflictosContactaAbogadoRes = yield index_models_1.ConflictosContactaAbogado.obtenerConflictosContactaAbogado();
                        revisarConflicto(conflictosContactaAbogadoRes, 'conflictosContactaAbogadoRes', conflictos);
                        break;
                }
            }
            catch (err) {
                console.log(err);
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: err[`${Object.keys(err)}`]['err']['message'] + ' En la tabla: ' + Object.keys(err)[0].replace('Res', ' ') + `;PERO TODOS LOS DEMAS CONFLICTOS ESTAN GUARDADOS EXITOSAMENTE`
                    }
                });
            }
            return res.status(200).json({
                ok: true,
                conflictos,
            });
        });
    }
}
exports.ConflictoController = ConflictoController;
