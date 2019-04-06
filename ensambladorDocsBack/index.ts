import express, {Application} from 'express';
import indexRouter from './routes/indexRoutes';
import morgan from 'morgan';
import cors from 'cors';
import pool from './database/database';


export class Server {
   public app: Application;
   
    constructor() {
        this.app = express();
        this.configApp();
        this.router();
        

    }

    configApp(): void{ //método para configurar app
        this.app.set('port' , process.env.port || '3000');

    }

    router(): void{ //método para configurar las rutas 
        this.app.use(indexRouter);

    }

    start (){//método para inicializar el servidor y quedarse escuchando
       this.app.listen(this.app.get('port'),()=>{
           console.log(`server working in port  ${this.app.get('port')}`)
       })

    }

    public middlewares(): void{
        /*
          Este metodo se ejecuta en el constructor luego de las configuracione generales del server (Ej: port) y antes de las rutas, con el objetivo de registrar, procesar Cabeceras entre otras funcionalidades.
        */
        this.app.use(morgan('dev'));//Registra las peticiones que llegan al server
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use((req,res,next)=>{
            console.log(`urlRequerida:${req.url} - métodoRequerido:${req.method}`);

        })
        
    
      }

     /* public conexionDB (){
          pool
      }
      */

   

};


const server = new Server();

server.middlewares();
server.start();

