const router = require('express').Router()
const blogDB = require('../../database/models/blogs')
const multer = require('multer')
const fs = require('fs')
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
 
var upload = multer({ storage: storage })

router.get('/blog',async (req,res)=>{

    try {
        const blogs = await blogDB.find();
        res.status(200).json(blogs)
        
    } catch (error) {
        res.status(500).json(error)
    }
    
})
router.get('/blog/:id',async (req,res)=>{

    try {
        const blog = await blogDB.findById({_id:req.params.id});
        res.status(200).json(blog)
        
    } catch (error) {
        res.status(500).json(error)
    }
    
})

router.delete('/blog/:id',async(req,res)=>{
    try {
        const deleteblog = await blogDB.findByIdAndDelete({_id:req.params.id})
        res.status(200).json('blog deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/create',upload.single('myImage'),async(req,res)=>{

    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');

    try {
        const newBlog = new blogDB({
            title:req.body.title,
            body:req.body.body,
            category:req.body.category,
            author:req.body.author,
            image:{
                contentType:req.file.mimetype,
                data: fs.readFileSync(path.join('uploads/' + req.file.filename))
            }
         });

         newBlog.save()
         .then((data)=>res.status(200).json(data))
         .catch((err)=>console.log(err))

        
    } catch (error) {
        console.log(error)
    }
           
   
})


module.exports = router