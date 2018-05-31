const Handler = require("../handler/index")
module.exports = {
  rutas: [
    {
      method: 'GET',
      path: '/',
      config: {
        handler: Handler.indexHand.index.handler,
      },
    },
    {
      method: 'GET',
      path: '/2',
      config: {
        handler: Handler.indexHand.index_get2.handler,
      },
    },
    {
      method: 'POST',
      path: '/{idservices}',
      config: {
        handler: Handler.indexHand.index.handler_post,
      },
    },
    {
      method: 'POST',
      path: '/WS/{idservices}',
      config: {
        handler: Handler.indexHand.index.WSPOST,
      },
    },
    {
      method: 'GET',
      path: '/WS/{idservices}',
      config: {
        handler: Handler.indexHand.index.WSGET,
      },
    },
  ],
};
