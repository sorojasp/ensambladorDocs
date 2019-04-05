"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); //se está importando el método Router desde express
class IndexRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('hello');
        });
    }
}
const indexRouter = new IndexRouter();
exports.default = indexRouter.router;
