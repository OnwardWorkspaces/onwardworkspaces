require('dotenv').config({ path: './../../.env' })
const mysql = require("mysql");


/****************************
*  DB connection            *
****************************/
var connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    localAddress: process.env.LOCALADDRESS,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    charset : process.env.DB_CHARSET,
    connectTimeout : 20000,
    connectionLimit : 1000
});


/****************************
*  All SQL Queries            *
****************************/

exports.testQuery = async () =>{
    return new Promise((resolve, reject) => {
	let query = `TEST QUERY`;	
//        let query = "SELECT * FROM domainUrls where beingCrawled = '0' and domainID = 244026"
        connection.query(query, (err, rows, fields) => {
            if (err) {
                console.log(err);
                err["query"] = query
                console.log(err);
                
                reject(err)
            }
            else{
                resolve({
                    rows : rows,
                    fields : fields,
                    query : query
                })
            }
        })
    })
}


