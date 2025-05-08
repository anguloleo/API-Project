// backend/routes/index.js
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

router.use('/api', apiRouter);



//FRONT END: Static routes
//serve react build files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  //serve the frontends index.html file at the root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });

  //serve the static assets in the frontends build folder
  router.use(express.static(path.resolve("../frontend/dist")));

  //serve the frontends index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
 } );
  }


  //FRONT END: add a XSRF-TOKEN cookie in develoopment
  if (process.env.NODE_ENV !== 'production') {
    router.get('/api/csrf/restore', (req, res) => {
      const csrfToken = req.csrfToken();
      res.cookie('XSRF-TOKEN', csrfToken);
      res.status(200).json({
        'XSRF-Token': csrfToken
      });
    });
  }




module.exports = router;