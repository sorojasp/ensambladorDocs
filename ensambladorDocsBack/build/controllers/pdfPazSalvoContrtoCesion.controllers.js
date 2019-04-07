"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modulos
const path_1 = __importDefault(require("path"));
//Funcionalidades
const generatePdf_1 = __importDefault(require("../funcionalidades/generarPdf/generatePdf"));
//Definicion del Documento PDF
const DocDefinition_1 = __importDefault(require("../funcionalidades/generarPdf/DocDefinition"));
//importa datos para generar el Pdf 
const indexControllers_1 = require("../controllers/indexControllers");
class pdfPazCesion {
    generarPdf(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pdf = (datosAbogado) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const docDefinition = new DocDefinition_1.default(datosAbogado);
                    yield new generatePdf_1.default(docDefinition.getDoc, docDefinition.getAbogado);
                }
                catch (e) {
                    console.log(e, 'err');
                }
            });
            console.log(`datos abogado:${indexControllers_1.indexControllers.cliente}`);
            yield pdf({ nombre_apellido: 'Stiven Rojas',
                cedula: 899809,
                tarjeta_p: 76556,
                ciudad: 'Barranquilla' });
            // res.status(200).download(path.join(__dirname, `../front/Demanda.pdf`));
        });
    }
    descargarPdf(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.generarPdf(req, res);
            }
            catch (err) {
                console.log(err);
            }
            try {
                //*** */const identificacion = req.params.identificacion;
                // const personaResult: Persona[] = await database.query(`SELECT * FROM Personas WHERE cedulaPersona = ${identificacion}`);
                // const persona: Persona = personaResult[0];
                res.status(200).download(path_1.default.join(__dirname, `../front/Demanda.pdf`));
            }
            catch (err) {
                console.log('Error al descargar el PDF para descargar\n', err);
                res.status(500).json({
                    ok: false,
                    err: 'Error al descargar el PDF para descargar',
                    errMessge: err
                });
            }
        });
    }
}
exports.PdfPazCesion = new pdfPazCesion;
