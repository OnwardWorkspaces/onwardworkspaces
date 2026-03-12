require('dotenv').config({ path: './../../.env' })
var redis = require('redis')
    , client = redis.createClient();
 
client.on('error', function (err) {
    console.log('Error ' + err);
    console.log("REDIS CLIENT CONNECTION FAILED FOR CACHE");
});
 
client.on('connect', ()=>{
    console.log("REDIS CLIENT CONNECTED FOR CACHE SUCCESSFULLY");
});

/*
The function takes input key & value for storing
And expiry in seconds in number to put a key-value
pair in memory cache of redis
And returns true if data added successfully
NOTE : WE ARE SETTING DEFAULT EXPIRY FROM ENV FILE
*/
const puts = async (key, value, expiry = process.env.CACHE_KEY_EXPIRY) => {
   
    if(typeof key != "string"){
    	return false
    }
    // Checking value if it's null then
    // we throw error
    if(value === null){
        return false;
    }
    let _value = ''

    // converting the object to valid string
    if(typeof value === "object"){
        _value = JSON.stringify(value);
    }

    // setting the key - value pair in cache
    client.set(key, _value, (err) => {
        console.log(err);
        if(err){
            return false;
        }
        
    });
    client.expire(key, expiry);

    return true;

}

/*
The function takes input key & returns
its value . In return data it sends back
isExists other data key containing key's
value in it
*/
const gets = async (key) => {
    return new Promise((resolve, reject) => {
        client.get(key, function (err, reply) {
            if(err){
		    console.log(err)
                reject({
                    isExists : false,
                    data : null,
                    error : err
                })
            }
            if(reply) {
                
                resolve({
                    isExists : true,
                    data : reply
                })
            } else {
                resolve({
                    isExists : false,
                    data : null
                })
            }
        });
    })

}




exports.puts = puts;
exports.gets = gets;
