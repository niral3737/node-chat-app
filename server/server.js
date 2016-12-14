/**
 * Created by niral on 14/12/16.
 */
'use strict'
let path = require('path');
let express = require('express');

const publicPath = path.join(__dirname, '../public');
let app = express();

app.use(express.static(publicPath));

app.listen(3000, () => {
    console.log('Express app is up and running on port 3000');
});