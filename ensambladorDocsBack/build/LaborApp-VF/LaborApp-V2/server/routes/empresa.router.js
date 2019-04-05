"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresa_controllers_1 = require("../controllers/empresa.controllers");
class EmpresaRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        //=====================================================================
        // Guardar Una Empresa
        //=====================================================================
        this.router.post('/empresa', empresa_controllers_1.EmpresaControllers.guardarEmpresa);
        //=====================================================================
        // Obtener Todas las empresas
        //=====================================================================
        this.router.get('/empresa', empresa_controllers_1.EmpresaControllers.obtenerEmpresa);
        //=====================================================================
        // Obtener Una Empresa
        //=====================================================================
        this.router.get('/empresa/:id', empresa_controllers_1.EmpresaControllers.obtenerUnaEmpresa);
        //=====================================================================
        // Actualizar Una Empresa
        //=====================================================================
        this.router.put('/empresa', empresa_controllers_1.EmpresaControllers.actualizarEmpresa);
        //=====================================================================
        // Borrar Una Empresa
        //=====================================================================
        this.router.delete('/empresa/:id', empresa_controllers_1.EmpresaControllers.borrarEmpresa);
    }
}
const empresaRouter = new EmpresaRouter();
exports.default = empresaRouter.router;
