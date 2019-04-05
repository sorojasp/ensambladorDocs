"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const demanda_router_1 = __importDefault(require("./demanda.router"));
const persona_router_1 = __importDefault(require("./persona.router"));
const empresa_router_1 = __importDefault(require("./empresa.router"));
const personaNatural_router_1 = __importDefault(require("./personaNatural.router"));
const contratoLaboral_router_1 = __importDefault(require("./contratoLaboral.router"));
const demandaEmpresa_router_1 = __importDefault(require("./demandaEmpresa.router"));
const demandaPersonaNatural_router_1 = __importDefault(require("./demandaPersonaNatural.router"));
const conflicto_router_1 = __importDefault(require("./conflicto.router"));
class IndexRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.use('/pdf', demanda_router_1.default);
        this.router.use(persona_router_1.default);
        this.router.use('/demandado', empresa_router_1.default);
        this.router.use('/demandado', personaNatural_router_1.default);
        this.router.use(contratoLaboral_router_1.default);
        this.router.use('/demanda', demandaEmpresa_router_1.default);
        this.router.use('/demanda', demandaPersonaNatural_router_1.default);
        this.router.use(conflicto_router_1.default);
    }
}
const indexRouter = new IndexRouter();
exports.default = indexRouter.router;
