"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const keys_1 = __importDefault(require("./keys"));
const database = promise_mysql_1.default.createPool(keys_1.default.database);
database.getConnection()
    .then(connection => {
    database.releaseConnection(connection);
    console.log('DB is Connected');
}).catch((err) => {
    console.log('Error al Conectar DB\n', {
        ok: false,
        err: err.fatal,
        errCode: err.code,
        errSqlState: err.sqlState,
        errSqlMessage: err.sqlMessage
    });
});
exports.default = database;
