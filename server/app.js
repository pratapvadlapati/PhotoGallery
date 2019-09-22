const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

let Gallery = require('./gallery.model');

//setup db
//const mongoDB = 'mongodb://localhost:27017/gallery';
const mongoDB = 'mongodb+srv://dbadmin:mongo@234@cluster0-1w9dq.mongodb.net/gallery?retryWrites=true&w=majority'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoDB connectionn error: '));

const app = express();
//enable cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Access-Control-Request-Method, Content-Type, Accept, Authorization, *");
    next();
  });

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'))

let storage = multer.diskStorage({
    destination: './uploads',
    filename: function(req, file, cb){
        cb(null, file.fieldname +'-'+ Date.now()+'-'+ path.extname(file.originalname))
    }
})

//instantiate upload
let upload = multer({
    storage: storage
}).single('image')

app.get('/images',(req, res)=>{
    //fetch imagePath and caption
    Gallery.find()
    .exec()
    .then(docs=>{
        const response = {
            count: docs.length,
            images: docs.map(docs => {
                return{
                    caption: docs.caption,
                    imagePath: docs.imagePath,
                    imageId: docs._id
                }
            }

            )
        }
        res.send(response);
    })
})



//route for uploading images
app.post('/upload', (req, res)=>{
    upload(req, res, (err)=>{
       // console.log(req.body.caption);
        if(err){
            res.send({'status': 'there is an error'});
        }else{
           /*  console.log(req.file);
            res.send({'response': {
                'status': 'File uploaded success',
                'imagePath': req.file.path
            }}) */

            //save caption & image path in db
            uploadImage = new Gallery({
                'caption': req.body.caption,
                'imagePath': req.file.path
            })
            console.log(uploadImage);
            uploadImage.save()
            .then(doc=>{
                res.send({'resp': {
                    'status': 'success',
                    'imagePath': req.file.path
                }})
            })

        }
    })
})


//delete image
app.get('/delete/:imageId', (req, res, next)=>{
  //  console.log(req.params.imageId)
if(req.params.imageId != ''){
    Gallery.findByIdAndDelete({'_id': req.params.imageId},(err,done)=>{
        if(err){
            return next(new Error('unable to delete image'))
        }else{
           res.json({'status':'true'})
          
        }
    })
    
}
})

app.listen(3002, ()=>{
    console.log('server has started')
})