import {Router} from 'express'; //se está importando el método Router desde express
import {indexControllers} from '../controllers/indexControllers'
import {PdfPazCesion} from '../controllers/pdfPazSalvoContrtoCesion.controllers';


 class IndexRouter {
    public router : Router = Router();

    constructor(){
        this.config();

    }

    config():void {
        this.router.get('/hola',(req,res)=>{
            res.send('hola')
        })
        this.router.get('/usuarios',(req,res)=>{
            res.send('usos')
        })

        this.router.get('/',(req,res)=>{
            res.send('inicio')
        })

        this.router.get('/abogados',indexControllers.cliente)
        this.router.get('/abogadosPdf',PdfPazCesion.descargarPdf)
      
}
}

const indexRouter = new IndexRouter();
export default indexRouter.router;