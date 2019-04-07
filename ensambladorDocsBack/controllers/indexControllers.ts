import {Request,Response} from  'express';
import {Abogado} from '../models/index.models';



class IndexControllers{
    datosAbogado:any
       public  async cliente  (req: Request, res: Response){
        //res.send('nueva ruta desde el controlador');
        
         const resultado= await Abogado.consulta();
         console.log(resultado)
         res.send(resultado);
         return (resultado[0])    
    }

}


export const indexControllers = new IndexControllers;
