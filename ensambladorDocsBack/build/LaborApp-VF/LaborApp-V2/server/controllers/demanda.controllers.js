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
//Conexion a la DB
const database_1 = __importDefault(require("../database/database"));
//Funcionalidades
const sendEmail_1 = __importDefault(require("../funcionalidades/funcionalidadEmail/sendEmail"));
const generatePdf_1 = __importDefault(require("../funcionalidades/funcionalidad-pdf/generatePdf"));
//Definicion del Documento PDF
const docDefinition_1 = __importDefault(require("../funcionalidades/funcionalidad-pdf/docDefinition"));
const index_models_1 = require("../models/index.models");
const conflictoDespidoSJC_model_1 = require("../models/conflictoDespidoSJC.model");
const CorreoPersona_model_1 = require("../models/CorreoPersona.model");
const montosConflictos_1 = __importDefault(require("../funcionalidades/montosConflictos/montosConflictos"));
class DemandaControllers {
    /*
      METODOS PARA MANIPULAR LA DEMANDA => (PDF)
    */
    //GET = GENREA LA DEMANDA.
    generarPdf(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let idDemanda = req.params.id;
            let tipo = req.params.tipo;
            let databaseResDemanda;
            let query = (demanda) => __awaiter(this, void 0, void 0, function* () {
                let idDemanda;
                let tipo;
                let empresa;
                let representante;
                if (demanda.idDemandaEmpresa !== undefined) {
                    tipo = 'idDemandaEmpresa';
                    idDemanda = demanda.idDemandaEmpresa;
                    empresa = yield index_models_1.Empresa.obtenerUnaEmpresa(demanda.NItEmpresa);
                    if (empresa.result[0].tipoDocumentoPersona != undefined) {
                        representante = yield index_models_1.Persona.obtenerUnaPersona(empresa.result[0].numeroDocumentoPersona, empresa.result[0].tipoDocumentoPersona);
                    }
                }
                if (demanda.idDemandaPersonaNatural !== undefined) {
                    tipo = 'idDemandaPersonaNatural';
                    idDemanda = demanda.idDemandaPersonaNatural;
                }
                let persona = yield index_models_1.Persona.obtenerUnaPersona(demanda.numeroDocumentoPersona, demanda.tipoDocumentoPersona);
                let correo = yield CorreoPersona_model_1.CorreoPersona.obtenerCorreoPersona(persona.result[0].numeroDocumentoPersona, persona.result[0].tipoDocumentoPersona);
                let contrato = yield index_models_1.ContratoLaboral.obtenerContratoLaboral(demanda.idContrato);
                let conflicto1 = yield conflictoDespidoSJC_model_1.ConflictoDespidoSJC.obtenerConflictoDespidoSJC(idDemanda, tipo);
                let conflicto2 = yield index_models_1.ConflictoCesantias.obtenerConflictoCesantias(idDemanda, tipo);
                let conflicto3 = yield index_models_1.ConflictoPagoSalario.obtenerConflictoPagoSalario(idDemanda, tipo);
                let conflicto4 = yield index_models_1.ConflictoPrimas.obtenerConflictoPrimas(idDemanda, tipo);
                let conflicto5 = yield index_models_1.ConflictoVacaciones.obtenerConflictoVacaciones(idDemanda, tipo);
                return {
                    persona: persona.result[0],
                    correo: correo.result[0],
                    empresa: (empresa != undefined) ? empresa.result[0] : undefined,
                    representante: (representante != undefined) ? representante.result[0] : undefined,
                    contrato: contrato.result[0],
                    conflictoDespidoSJC: conflicto1.result[0],
                    conflictoCesantias: conflicto2.result[0],
                    conflictoPagoSalario: conflicto3.result[0],
                    conflictoPrimas: conflicto4.result[0],
                    conflictoVacaciones: conflicto5.result[0]
                };
            });
            let pdf = (datosDemanda) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const docDefinition = new docDefinition_1.default(datosDemanda);
                    yield new generatePdf_1.default(docDefinition.getDoc, docDefinition.getAccionante);
                }
                catch (e) {
                    console.log(e, 'err');
                }
            });
            try {
                if (tipo === 'empresa') {
                    databaseResDemanda = yield index_models_1.DemandaEmpresa.obtenerDemandaEmpresa(idDemanda);
                    if (databaseResDemanda.result.length !== 0) {
                        databaseResDemanda = databaseResDemanda.result[0];
                        let respuesta = yield query(databaseResDemanda);
                        let conflictoPagoSalario;
                        if ((respuesta.conflictoPagoSalario) !== undefined) {
                            conflictoPagoSalario = montosConflictos_1.default.MontoNoPagoSalario(respuesta.conflictoPagoSalario.fechaInicioNoPago, respuesta.conflictoPagoSalario.fechaFinalNoPagoSalario, respuesta.contrato.ultimoSalario);
                        }
                        let conflictoCesantias;
                        if (respuesta.conflictoCesantias != undefined) {
                            conflictoCesantias = montosConflictos_1.default.MontoCesantias((respuesta.conflictoCesantias.fechaUltimasCesantiasPagadas !== null) ? respuesta.conflictoCesantias.fechaUltimasCesantiasPagadas : new Date(), (respuesta.conflictoCesantias.fechaFinalNoPagoCesantias != null) ? respuesta.conflictoCesantias.fechaFinalNoPagoCesantias : new Date(), respuesta.contrato.ultimoSalario);
                        }
                        // let minimaCuantia
                        // if(respuesta.conflictoDespidoSJC != undefined){
                        //   minimaCuantia = MontosConflictos.calculaMinimaCuantia(
                        //     respuesta.conflictoDespidoSJC.montoDinero_DSJC,
                        //     20,
                        //   ).totalMontos
                        // }
                        function toTitleCase(str) {
                            return str.replace(/\w\S*/g, function (txt) {
                                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                            });
                        }
                        yield pdf({
                            accionante: toTitleCase(respuesta.persona.nombresPersona),
                            accionado: (respuesta.empresa != undefined) ? toTitleCase(respuesta.empresa.nombreEmpresaRS) : undefined,
                            cedulaAccionante: respuesta.persona.numeroDocumentoPersona,
                            cedulaAccionado: (respuesta.representante != undefined) ? respuesta.representante.numeroDocumentoPersona : 'No Aplica',
                            ciudadAccionante: respuesta.persona.codigoCiudad,
                            ciudadAccionado: (respuesta.empresa != undefined) ? respuesta.empresa.codigoCiudad : undefined,
                            correoAccionante: respuesta.correo.correoPersona,
                            correoAccionado: (respuesta.empresa != undefined) ? respuesta.empresa.emailEmpresa : undefined,
                            direccionDeNotificacionAccionante: respuesta.persona.direccionPersona,
                            direccionDeNotificacionAccionado: (respuesta.empresa != undefined) ? respuesta.empresa.direccionEmpresa : undefined,
                            lugarDeExpedicionAccionante: respuesta.persona.lugarExpedicionCedulaPersona,
                            lugarDeExpedicionAccionado: (respuesta.representante != undefined) ? respuesta.representante.lugarExpedicionCedulaPersona : undefined,
                            nit: (respuesta.empresa != undefined) ? respuesta.empresa.NItEmpresa : undefined,
                            represetanteLegal: (respuesta.representante != undefined) ? respuesta.representante.nombresPersona : 'No Aplica',
                            fechaDeIngresoALaEmpresa: respuesta.contrato.fechaInicioContrato,
                            primaDeServicios: undefined,
                            indemnizacionPorNoPago: undefined,
                            valorDeLasPretenciones: undefined,
                            salarioPactado: respuesta.contrato.ultimoSalario,
                            funcionesQueRealizaba: respuesta.contrato.descripcionFunciones,
                            conflictos: undefined,
                            incumplimientoDelEmpleador: undefined,
                            fechaDeLaPrimeraSolicitudAlEmpleador: undefined,
                            situacionActualFrenteALaRenunciaDelEmpleador: undefined,
                            causa: undefined,
                            salariosVencidos: conflictoPagoSalario,
                            cesantias: (conflictoCesantias != undefined) ? conflictoCesantias.cesantias : 'No Aplica',
                            diasDeTrabajo: (conflictoCesantias != undefined) ? conflictoCesantias.dias : 'No Aplica',
                            interesesDeCesantias: (conflictoCesantias != undefined) ? conflictoCesantias.interesesCesantias : 'No Aplica',
                        });
                        return res.json({
                            ok: true,
                            message: `creado`
                        });
                    }
                }
                else {
                    throw ('DemandaEmpresa no existe');
                }
                // if (tipo === 'natural') {
                //   return res.json({
                //     ok: true,
                //     message: `creado`
                //   });
                // } else {
                //   throw ('DemandaPersonaNatural no existe')
                // }
            }
            catch (e) {
                console.log(e, 'errooro');
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: e ? e : `ocurrio un error al asignar la respuesta de la db o esta no esta viene undefined`
                    }
                });
            }
            return res.json({ ok: true });
            // try{
            //   //Optenemos los patametros para la condulta
            //   //Consultas de la DB
            //   const empresaResult: Empresa[] = await database.query(`SELECT * FROM Empresa WHERE NItEmpresa = ${ nit }`);
            //   const personaResult: Persona[] = await database.query(`SELECT * FROM Personas WHERE cedulaPersona = ${ identificacion }`);
            //   //Navegando entre la respuesta y almacenandol en una valiable para su posterior uso.
            //   const accionante: Persona = personaResult[0];
            //   const accionado: Empresa = empresaResult[0];
            //   //Metemos los datos de la consulta en el objeto que define el contenido del pdf.
            //   const datosDemanda = {
            //     accionante: accionante.nombresPersona,
            //     accionado: accionado.nombreEmpresaRS,
            //     ciudadAccionante: "accionante.codigoDaneMunicipio",
            //     cedulaAccionante: accionante.numeroDocumentoPersona,
            //     lugarDeExpedicion: 'lugarDeExpedicion',
            //     nit: accionado.NItEmpresa,
            //     represetanteLegal: 'represetanteLegal',
            //     ciudadAccionado: 'ciudadAccionado'
            //   }
            //   console.log(datosDemanda)
            //   //Generando el contenido del pdf con el objeto previamente creado.
            //   const docDefinition = new DocDefinition(datosDemanda);
            //   //Generando el pdf ( contenido, nombre del accionante (para que cuando se genere el pdf, el nombre del mismo ('pdf') sea unico )).
            //   await new GenerarPdf(docDefinition.getDoc, docDefinition.getAccionante);
            //   res.status(200).json({
            //     ok: true,
            //     message: 'PDF generado con exito'
            //   });
            // }catch(err){
            //   console.log('Error al generar el pdf\n',err);
            //   res.status(500).json({
            //     ok:false,
            //     err: 'Error al generar el PDF',
            //     errMessge: err
            //   });
            // }
        });
    }
    //GET = ENVIA LA DEMANDA.
    enviapdf(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const identificacion = req.params.identificacion;
                const personaResult = yield database_1.default.query(`SELECT * FROM Personas WHERE cedulaPersona = ${identificacion}`);
                const persona = personaResult[0];
                sendEmail_1.default.sendPdf([], persona.nombresPersona);
                res.status(200).json({
                    ok: true,
                    message: 'Correo Enviado'
                });
            }
            catch (err) {
                console.log('Error al enviar el pdf\n', err);
                res.status(500).json({
                    ok: false,
                    err: 'Error al enviar el PDF por correo',
                    errMessge: err
                });
            }
        });
    }
    //GET = DESCARGAR LA DEMANDA.
    descargarPdf(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const identificacion = req.params.identificacion;
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
const demandaControllers = new DemandaControllers();
exports.default = demandaControllers;
