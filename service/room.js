let express = require('express');
let app = express();
const bodyParser = require('body-parser');
let {dbConnect,getData, insertData, deleteData} = require('./controller/dbcontroller')
