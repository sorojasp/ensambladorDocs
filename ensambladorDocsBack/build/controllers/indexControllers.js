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
class IndexControllers {
    cliente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.send('nueva ruta desde el controlador');
            const resultado = yield index_models_1.Abogado.consulta();
            console.log(resultado);
            res.send(resultado);
            return (resultado[0]);
        });
    }
}
exports.indexControllers = new IndexControllers;
