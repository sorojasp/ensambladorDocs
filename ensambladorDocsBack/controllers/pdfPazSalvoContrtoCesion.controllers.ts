// Modulos
import path from 'path';

//Conexion a la DB
import database from '../database/database';

//Models
import { Request, Response } from 'express';

//Funcionalidades

import GenerarPdf from '../funcionalidades/generarPdf/generatePdf';

//Definicion del Documento PDF
import DocDefinition from '../funcionalidades/generarPdf/DocDefinition';

//importa datos para generar el Pdf 

import {indexControllers} from '../controllers/indexControllers'

class pdfPazCesion {
    

    public async generarPdf(req: Request, res: Response) {

     const pdf = async (datosAbogado: any) => {
        try {
          const docDefinition = new DocDefinition(datosAbogado);
         
          await new GenerarPdf(docDefinition.getDoc, docDefinition.getAbogado);
  
        } 
        
        catch (e) {
          console.log(e, 'err')
        }
        
  
      }

      console.log(`datos abogado:${indexControllers.cliente}`)
      await pdf({nombre_apellido: 'Stiven Rojas',
      cedula: 899809,
      tarjeta_p: 76556,
      ciudad: 'Barranquilla'})
      
     // res.status(200).download(path.join(__dirname, `../front/Demanda.pdf`));
      
      
    }

  public async descargarPdf(req: Request, res: Response) {
      
   try{
    this.generarPdf(req,res)
  }catch (err){
    console.log(err)
  }
      try {
  
        //*** */const identificacion = req.params.identificacion;
  
        // const personaResult: Persona[] = await database.query(`SELECT * FROM Personas WHERE cedulaPersona = ${identificacion}`);
  
        // const persona: Persona = personaResult[0];
  
        res.status(200).download(path.join(__dirname, `../front/Demanda.pdf`));
  
      }
      catch (err) {
  
        console.log('Error al descargar el PDF para descargar\n', err);
  
        res.status(500).json({
          ok: false,
          err: 'Error al descargar el PDF para descargar',
          errMessge: err
        });
  
      }
  
  
    }

}

    export const PdfPazCesion = new pdfPazCesion;

   







