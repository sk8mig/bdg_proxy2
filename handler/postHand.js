const RP = require('request-promise');

//PETICION
const requestToServer = (headers, payload, params, objRedis)=>{
    payload.wsdl = objRedis.wsdl; 
    const option = {
        method: objRedis.method,
        uri: "http://" + objRedis.ip + ":" + objRedis.port + "/" + objRedis.idservices,
        headers: headers,
        body: payload,
        json: true
    };
    console.log(option);
    return RP(option);
}

module.exports.index = {
    handler: (request, reply) => {
        var client = request.redis; 
        const res = "Hola mundo";
        // Do something with it
        /*client.hgetall('dataset', function (err, obj) {
            
                if (err) {
                    // handle error (https://github.com/luin/ioredis#error-handling)
                }
            
                return reply({ result: obj });
            });*/
            client.get('val1')
            .then(res => reply(res))
            .catch(res => reply(res));
       //return reply({res});
    },

    handler_post: (request, reply) => {
        const parametro = request.payload;
        var client = request.redis; 
        client.hgetall('endpoint'+request.params.idservices+':'+process.env.NODE_ENV)
        .then(res => {
            console.log(res);
            // requestToServer(request.headers, request.payload, request.parametro, res);
        })
        .then(res => reply(res))
        .catch(err => reply(err))
       
    },

    WSPOST: (request, reply) => {
        return reply({data:1});  
    },

    WSGET: (request, reply) => {
        return reply({data:1});  
    }

} 

module.exports.index_get2 = {
    handler: (request, reply) => {
        const res = "SHITI";
        return reply({res});
    },
}; 

