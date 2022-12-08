import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'fs';
const bodyParser = require('body-parser');
import { join } from 'path';

import { AppServerModule } from './src/main.server';

function generateAccessToken(credential: any, jwt: any, token: any) {
  return jwt.sign(credential, token, { expiresIn: '1800s' });
}

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  //body perser
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  const jwt = require('jsonwebtoken');
  const jose = require('jose');
  const dotenv = require('dotenv');
  const cookieParser = require('cookie-parser');

  // get config vars
  dotenv.config();

  const distFolder = join(process.cwd(), 'dist/angular-ssr/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser

  // server.post('/api/signin', async (req, res) => {
  //   const credential = {
  //     email: req.body.email,
  //     accesstoken: 'accesstokenFromDotNetapi',
  //   };

  //   const secret = jose.base64url.decode(
  //     'zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI'
  //   );
  //   const token = await new jose.EncryptJWT(credential)
  //     .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
  //     .setExpirationTime('2h')
  //     .encrypt(secret);
  //   res.cookie('authentication', `${token}`);
  //   res.send({ response: 'Sign in successfull' });
  // });

  // server.get('/api/contact', (req, res) => {
  //   res.send({ response: 'API Is Working ' });
  // });

  // server.get('/api/session', async (req, res) => {
  //   const secret = jose.base64url.decode(
  //     'zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI'
  //   );
  //   var regex = /authentication=(.[^;]*)/gi;
  //   var match = regex.exec(req.headers.cookie!);

  //   if (match) {
  //     const jwt = match[1];
  //     const { payload, protectedHeader } = await jose.jwtDecrypt(jwt, secret);
  //     console.log('this is payload', payload);
  //     res.send(payload);
  //   }
  // });

  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
