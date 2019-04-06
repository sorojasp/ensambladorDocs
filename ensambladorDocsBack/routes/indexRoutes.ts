import {Router} from 'express'; //se está importando el método Router desde express
import {indexControllers} from '../controllers/indexControllers'


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

        this.router.get('/clientes',indexControllers.cliente)
      
}
}

const indexRouter = new IndexRouter();
export default indexRouter.router;