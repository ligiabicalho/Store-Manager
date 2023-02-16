const express = require('express');
const { productRouter, saleRouter } = require('./routers');
const { SERVER_ERR } = require('./utils/httpStatus');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);
app.use('/sales', saleRouter);

app.use((error, _req, res, _next) => {
  const { status, message } = error;
  console.error('Error:', error);
  return res.status(status || SERVER_ERR).json({ message });
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;