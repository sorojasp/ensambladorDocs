"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
class Autenticacion {
    constructor() { }
    static verificacionToken(req, res, next) {
        const token = req.get('token');
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    ok: false,
                    err: {
                        message: 'Token invalido valido'
                    }
                });
            }
            req.usuario = decoded['usuario'];
            next();
        });
    }
}
exports.Autenticacion = Autenticacion;
