const express = require('express');
const router = express.Router();
const Blog = require('../schema/blog.schema');

router.post('', async (req,res, next) => {
    try{
        const {title, content} = req.body;
        const blog = new Blog({title, content});
             await blog.save();
             res.status(201).json(blog);
    } 
    catch(e){next(e);}
});

router.get('/', async (req, res, next) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next)=>{
    try{
        const id = req.params.id;
        
        const blog = await Blog.findById(id);
        if(!blog){
            return res.status(404).json({message: 'Blog not found'});
            }
            res.json(blog);
            }
            catch(e){next(e);}

});

router.delete('/:id', async (req, res, next)=>{
    try{
        const id = req.params.id;
        
        
        const blog = await Blog.findById(id);
        if(!blog){
            return res.status(404).json({message: 'Blog not found'});
            }
            await Blog.findByIdAndDelete(id);
            res.status(200).json({message: 'Blog deleted successfully'});
            }
            catch(e){next(e);}
});


router.put('/:id', async (req, res, next)=>{
    try{
        const id = req.params.id;
        console.log(id);
        
        const blog = await Blog.findById(id);
        if(!blog){
            return res.status(404).json({message: 'Blog not found'});
            }
            const {title, content} = req.body;
            blog.title = title || blog.title;
            blog.content = content || blog.content;
            blog.updatedAt = Date.now();
            await blog.save();
            res.status(200).json({message: 'Blog updated successfully'});
    }
    catch(e){
        next(e);
    }
});


module.exports = router;