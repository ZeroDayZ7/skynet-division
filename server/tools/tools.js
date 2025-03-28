function consoleLogRequest(req, res, next) {
  console.log(`= 1 => req.method: ${req.method}`);
  console.log(`= 2 => req.url: ${req.url}`);
  console.log(`= 3 => req.headers: ${JSON.stringify(req.headers, null, 2)}`);
  console.log(`= 4 => req.cookies: ${JSON.stringify(req.cookies, null, 2)}`);
  console.log(`= 5 => req.params: ${JSON.stringify(req.params, null, 2)}`);
  console.log(`= 6 => req.body: ${JSON.stringify(req.body, null, 2)}`);

  next();
}

module.exports = { consoleLogRequest };


// function consoleLogHeaders(req, res, next) {
//   console.log(`= 1 => req.headers: ${JSON.stringify(req.headers, null, 2)}`);

//   if (req.cookies) {
//     req.sessionToken = req.cookies['Oo!SK'];
//     req.accessToken = req.cookies['access_token'];
//   } else {
//     console.log('=> Brak ciasteczek w nagłówkach.');
//   }
  
//   console.log(`next(consoleLogHeaders)`);
//   next();
// }

// module.exports = { consoleLogHeaders };
