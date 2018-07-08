const SCWorker = require('socketcluster/scworker');
const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const morgan = require('morgan');
const healthChecker = require('sc-framework-health-check');
const bodyParser = require('body-parser');

class Worker extends SCWorker {
  run() {
    console.log('   >> Worker PID:', process.pid);
    const environment = this.options.environment;

    const app = express();

    const httpServer = this.httpServer;
    const scServer = this.scServer;

    if (environment === 'dev') {
      // Log every HTTP request. See https://github.com/expressjs/morgan for other
      // available formats.
      app.use(morgan('dev'));
    }
    app.use(serveStatic(path.resolve(__dirname, 'public')));

    // Add GET /health-check express route
    healthChecker.attach(this, app);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    require('./routes')(app);
    app.get('*', (req, res) => res.status(200).send({
        message: 'This method does not support',
    }));

    httpServer.on('request', app);

    // let count = 0;

    /*
      In here we handle our incoming realtime connections and listen for events.
    */
    scServer.on('connection', function (socket) {

      // Some sample logic to show how to handle client events,
      // replace this with your own logic

      // socket.on('sampleClientEvent', function (data) {
      //   count++;
      //   console.log('Handled sampleClientEvent', data);
      //   scServer.exchange.publish('sample', count);
      // });

      // let interval = setInterval(function () {
      //   socket.emit('random', {
      //     number: Math.floor(Math.random() * 5)
      //   });
      // }, 1000);

      socket.on('disconnect', function () {
        clearInterval(interval);
      });
    });
  }
}

new Worker();
