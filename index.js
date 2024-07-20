const express = require('express');
const dotenv = require('dotenv');
const Boom = require('boom');

const CommonHelper = require('./server/helpers/CommonHelper');

const app = express();
const port = process.env.PORT || 8080;

// Import Route
const product = require('./server/api/product');
const productV2 = require('./server/api/productV2');

// Middleware
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const oldSend = res.send;
  res.send = async (data) => {
    res.send = oldSend; // set function back to avoid the 'double-send'
    const response = CommonHelper.unifyResponse(req, res, data);

    // Log Transaction
    const logData = CommonHelper.logRequest(req, response);

    CommonHelper.log(['API Request', 'info'], logData);
    return res.status(response.statusCode).send(response.bodyResponse); // just call as normal with data
  };

  next();
});

// Route middlewares
app.use('/api/v1/product', product);
app.use('/api/v2/product', productV2);

app.get('/sys/ping', (req, res) => {
  req.startTime = process.hrtime();
  res.send('ok');
});

app.all('*', (req, res) => {
  res.status(404).send(Boom.notFound('No route matched with those values', {}));
});

app.listen(port, () => {
  CommonHelper.log(['Info'], `Server started on port ${port}`);
});
