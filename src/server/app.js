const express = require('express');
const app = express();
const bodyParser = require('body-parser');


NODE_ENV = 'development';

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (NODE_ENV === 'development') {
  app.use('/assets', express.static('dist'));
} else {
  app.use('/assets', express.static('build'));
}

app.use('/api', require('./routes/api'));
app.use('/', require('./routes/view'));

// Server
const port = 3000;
app.listen(port, () => {
  console.log('listening on port:' + port);
});
