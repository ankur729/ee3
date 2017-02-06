require('./routes/db.js');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');
var foods = require('./routes/foods');
var user_route = require('./routes/user_route');
var cook_route = require('./routes/cook_route');
var admin_route = require('./routes/admin_route');

var port = 3000;

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', tasks);
app.use('/foods', foods);
app.use('/user', user_route);
app.use('/cook', cook_route);
app.use('/admin', admin_route);


app.listen(port, function(){
    console.log('Server started on port '+port);
});