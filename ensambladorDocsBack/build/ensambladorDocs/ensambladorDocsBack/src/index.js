"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.configApp();
        this.router();
    }
    configApp() {
        this.app.set('port', process.env.port || '3000');
    }
    router() {
        this.app.use(indexRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`server working in port  ${this.app.get('port')}`);
        });
    }
}
exports.Server = Server;
;
const server = new Server();
server.start();
