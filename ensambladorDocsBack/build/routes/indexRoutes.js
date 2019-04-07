"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); //se está importando el método Router desde express
const indexControllers_1 = require("../controllers/indexControllers");
const pdfPazSalvoContrtoCesion_controllers_1 = require("../controllers/pdfPazSalvoContrtoCesion.controllers");
class IndexRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/hola', (req, res) => {
            res.send('hola');
        });
        this.router.get('/usuarios', (req, res) => {
            res.send('usos');
        });
        this.router.get('/', (req, res) => {
            res.send('inicio');
        });
        this.router.get('/abogados', indexControllers_1.indexControllers.cliente);
        this.router.get('/abogadosPdf', pdfPazSalvoContrtoCesion_controllers_1.PdfPazCesion.descargarPdf);
    }
}
const indexRouter = new IndexRouter();
exports.default = indexRouter.router;
