const express = require('express');
const tls = require("tls");
const fs = require("fs");
const https = require("https");
const cors = require('cors');
const httpProxy = require('http-proxy');

const PORT = 8443;

  const app = express();
  const apiProxy = httpProxy.createProxyServer();
  app.use("/", function(req, res) {
        apiProxy.web(req, res, { target: 'https://bewp1.yerbas.org'})
  });
  
  const server = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/bewp0.yerbas.org/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/bewp0.yerbas.org/fullchain.pem'),
  SNICallback: (domain, cb) => {
    cb(null, tls.createSecureContext({
      key: fs.readFileSync('/etc/letsencrypt/live/bewp0.yerbas.org/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/bewp0.yerbas.org/fullchain.pem'),
    }));
  }
}, app).listen(PORT, () => {
  console.log(`Started on port ` + PORT);
});
