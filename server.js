const express = require('express')
const next = require('next')
const cookieParser = require('cookie-parser');
const session = require("express-session");
const mongoose = require('mongoose').set('debug',true);
const credentials = require('./config/credentials.js');
// const { parse } = require('url')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const Product = require('./models/Product');
const Cart = require('./models/Cart');
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


  app.get('/shops/:id', (req, res) => {
    // const { pathname, query } = parse(req.url, true)
    Product.findById(req.params.id, (err, product )=>{
      // console.log();
   const query = { id: req.params.id}
      return nextApp.render(req, res, '/view', query);

    })

  })
  app.get('/carts', (req, res) => {
    let user = "1234567890";
    Cart.find({ user, status:"uncomplete"}).populate('product').exec( (err, carts)=>{
      if(carts.length > 0){
        req.carts = carts;
        const query = { id: user}
        return nextApp.render(req, res, '/carts', query);
        // return res.json({status: "failed", msg:"already exist"});
      }
    })
  })

  app.get('/shops', (req, res) => {
    const query = { id: null}
    return nextApp.render(req, res, '/shops', query);
  })

  //route to /shops
  app.use('/api/shops', require('./routes/shops'))
  app.use('/shops', require('./routes/shops'));

  app.use('/api/carts', require('./routes/carts'));



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
