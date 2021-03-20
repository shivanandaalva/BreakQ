const { app, BrowserWindow} = require('electron')

const server = require('./app'); //ADD THIS
const axios = require('axios');
let mainWindow;

function createWindow () {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL('http://localhost:3000')  //ADD THIS
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('resize', function(e,x,y){
  mainWindow.setSize(x, y);
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})


var express = require('express');
var path = require('path');


var app1 = express();
// var product = require('./route/product')
// view engine setup

app1.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-  With, Content-Type, Accept");
  
  next();   
});

app1.set('views', path.join(__dirname, 'views'));
app1.set('view engine', 'ejs');



app1.use(express.static(path.join(__dirname, 'views')));



app1.get('/', (req, res) => {

  async function getdata() {
    try {
      const response= await axios.get('http://6037c52d54350400177235f5.mockapi.io/product')
        var data = response.data;
        res.render('index',{data:data});
    } catch (error) {
      console.error(error);
    }
  }
  getdata();

 

})

app1.get('/product/:id', (req, res) => {
  var id=req.params.id;
  
  async function getdetails() {
    try {
      const response= await axios.get('http://6037c52d54350400177235f5.mockapi.io/product/'+id)
        var data =response.data;
        res.render('product',{data:data});

    } catch (error) {
      console.error(error);
    }
  }
  getdetails();

});

// app.use('/product', product)

// catch 404 and forward to error handler
app1.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app1.get('env') === 'development') {
  app1.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app1.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app1.listen(3000, () => console.log(`Express server listening on port 3000`));


module.exports = app1;

