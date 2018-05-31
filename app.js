require('dotenv').config();

const hapi = require('hapi');
const hapiIoredis = require("hapi-ioredis");
// Plugin para rutas del servidor
const Routes = require('./routes/routes');

const hapiPlugin = [
  {
    register: hapiIoredis,
    options:{
      url: "redis://127.0.0.1:6379"

    }
  }
]

const server = new hapi.Server();


// Registro de routes en el servidor
// server.register([Routes]);

const serverPort = process.env["PORT_"+process.env.NODE_ENV.toLocaleUpperCase()];
console.log(serverPort);
server.connection({ port: serverPort });
// Defino ruta
server.route(Routes.rutas);

server.ext('onPreHandler', (request, reply) => {
  var client = request.redis;
  console.log(request.params.idservices);
  client.sismember('lista:'+process.env.NODE_ENV, request.params.idservices)
  .then(res =>{
    if(res){
      reply.continue();
    }else
      return reply({erro:"Todo se fue a la puta mi hermano"});

  })
  .catch(res => console.log('Error: '+ res));
 
});


server.register(hapiPlugin, (err2)=>{
  if(err2) throw err2;
  // Levanto server
  server.start((err) => {
    if (err) throw err;
    console.log(`Servidor levantado en: ${server.info.uri}`);
  });
});

module.exports = server;