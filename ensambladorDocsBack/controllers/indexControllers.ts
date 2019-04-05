import {Request,Response} from  'express';
class IndexControllers{

    cliente(req: Request,res:Response){
        res.send('nueva ruta desde el controlador')
    }

}


export const indexControllers = new IndexControllers;
