import mysql from 'promise-mysql';
import keys from './keys';
import { MysqlError } from 'mysql';

const database = mysql.createPool(keys.database);

database.getConnection()
    .then(connection => {
        database.releaseConnection(connection);
        console.log('DB is Connected');
    }).catch( (err:MysqlError) => {

        console.log( 'Error al Conectar DB\n', {
    
          ok:false,
          err: err.fatal,
          errCode: err.code,
          errSqlState: err.sqlState,
          errSqlMessage: err.sqlMessage
    
        })
    })

export default database