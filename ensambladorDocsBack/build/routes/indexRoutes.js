"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); //se está importando el método Router desde express
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
    }
}
const indexRouter = new IndexRouter();
exports.default = indexRouter.router;
