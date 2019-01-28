const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser');
const session = require("express-session");
const mongoose = require('mongoose').set('debug',true);
const credentials = require('./config/credentials.js');

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare()
.then(() => {
  const app = express();
  //for form
  app.use(require('body-parser').json());
  app.use(require('body-parser').urlencoded({extended:true}));

  app.use(cookieParser());
  //express session middlewware
  app.use(session({
    	secret: "keyboard cat",
    	resave: true,
    	saveUninitialized : true,
    	// cookie : { secure : true}
  }));

//route to /shops
  app.use('/api/shops', require('./routes/shops'))

  app.get('*', (req, res) => {
    return handle(req, res)
  })

  //db connection
const opts = { useNewUrlParser: true,autoIndex: false }
switch(app.get('env')){
	case 'development':
		mongoose.connect(credentials.mongo.development.connectionString, opts);
		break;
	case 'production':
		mongoose.connect(credentials.mongo.production.connectionString, opts);
		break;
	default:
		throw new Error('Unknown execution environment: ' + app.get('env'));
}
mongoose.connect(credentials.mongo.development.connectionString );
let db = mongoose.connection;
db.on('open', function(){
	console.log("connected to mongodb");
});

  app.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
