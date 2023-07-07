const fs=require('fs');
const path=require('path');
const https=require('https')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { S3Client} = require("@aws-sdk/client-s3");
const multer = require('multer');
const multerS3 = require('multer-s3')
const mongoose = require('mongoose');
const morgan=require('morgan')
const helmet=require('helmet')
const compression =require('compression')
//
const PORT = process.env.PORT || 8080;

const s3 = new S3Client({
credentials:{
  accessKeyId:process.env.S3_BUCKET_ACCESS_KEY,
  secretAccessKey:process.env.S3_BUCKET_SECRET_KEY,
},
region:process.env.S3_BUCKET_REGION
})


const prodRoutes = require('./routes/products');
const authRoutes=require('./routes/auth')
const catRoutes=require('./routes/category')
const subCatRoutes=require('./routes/subcategory')
const orderRoutes=require('./routes/order')
const cartRoutes=require('./routes/cart')

const accessLogStream= fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  {flags:'a'}
  );

  // const privateKey=fs.readFileSync('server.key')
  // const certificate=fs.readFileSync('server.cert')

app.use(helmet())
app.use(compression())
app.use(morgan('combined',{stream:accessLogStream}))
app.use('/api',orderRoutes)
app.use(
  bodyParser.json({
      verify: function(req, res, buf) {
          req.rawBody = buf;
      }
  })
);

app.use(bodyParser.json());
app.use(multer({storage:multerS3({
  s3:s3,
  bucket:process.env.S3_BUCKET_NAME,
  metadata: function (req, file, cb) {
    cb(null, {fieldName: file.fieldname});
  },
  key: function (req, file, cb) {
    cb(null, Date.now().toString()+'-'+file.originalname)
  }
})}).single('image'))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use('/api',orderRoutes)
app.use('/api',prodRoutes)
app.use('/api',authRoutes)
app.use('/api',cartRoutes)
app.use('/api',catRoutes)
app.use('/api',subCatRoutes)


// app.use('/feed', feedRoutes);
// app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, error: data });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWD}@cluster0.wkaijzr.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => {
    // https.createServer({key:privateKey,cert:certificate},app).listen(PORT,()=>{
    //   console.log(`server started on port ${PORT}`);
    app.listen(PORT,()=>{
      console.log(`server started on port ${PORT}`)
    })
    
   
  })
  .catch(err => console.log(err));


