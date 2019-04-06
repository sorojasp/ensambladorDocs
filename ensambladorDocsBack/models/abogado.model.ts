import database from "../database/database";
import { MysqlError } from "mysql";


 class abogado {

    dataAbogado: any;
    

      public async consulta () {
          this.dataAbogado = undefined; 
          this.dataAbogado =  await database.query('SELECT *FROM db_abogados WHERE cedula=9147634');
          if(this.dataAbogado== undefined){
            throw new Error("you was problem")
          }else{
              
              return(this.dataAbogado)
          }
        
          
    } 
}


export const Abogado = new abogado;



