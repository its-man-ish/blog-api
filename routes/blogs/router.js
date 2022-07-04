const router = require('express').Router()
const blogDB = require('../../database/models/blogs')

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

router.post('/create',async(req,res)=>{
    const newBlog = new blogDB(req.body);
    console.log(req.body)

    try {
        const saveBlog = await newBlog.save()
        res.status(200).json(saveBlog)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router