const Blog = require('../model/blog')
// create blog
const createablog = async (req,res)=>{
const {userId} = req.user;
req.body.createdby = userId
console.log(userId);

try {
     const blog = await Blog.create(req.body);
     res.status(201).json({success: true, blog})
} catch (error) {
    res.json({error})
    
}
}
//get all blogs 
const getallblog = async (req,res)=>{
const {userId} = req.user;
try {
    const blog = await Blog.find({createdby: userId })
    res.status(201).json({success: true, blog})
} catch (error) {
     res.json({error})
}
}
//get a single blog
const getasingleblog = async (req,res)=>{
const {userId} = req.user;
const {blogId}=req.params;
try {
    const blog = await Blog.find({createdby: userId, _id: blogId})
    res.status(200).json({success: true, blog})
} catch (error) {
     res.json({error})  
}
}
const updateablog = async (req,res)=>{
const {userId} = req.user;
const {blogId} = req.params;
try {
    const blogs = await Blog.findOneAndUpdate({createdby: userId, _id: blogId}, req.body, {new: true, runValidators: true})
  res.status(200).json({success: true, blogs})
} catch (error) {
     res.json({error})
}
}
//delete a blog
const deleteablog = async (req,res)=>{
const {userId} = req.user;
const {blogId}=req.params;
try {
    const blog = await Blog.findByIdAndDelete({createdby: userId, _id: blogId})
    res.status(200).json({success: true, msg: 'succesfully deleted'})
} catch (error) {
     res.json({error})  
}

}

const getallwithoutuser = async (req,res)=>{
    
try { 
    const blog = await Blog.find({});
    res.status(200).json({success: true, blog})
    
} catch (error) {
    res.json({error})
}

}
const getsinglewithoutuser = async (req,res)=>{
    const {userId} = req.user;
   try { 
    const blog = await Blog.find({tag: userId, _id: blogId});
    res.status(200).json({success: true, blog})
    
} catch (error) {
    res.json({error})
}
} 

// get all blogs regardless of user
// get a single blog regardless of th user
// youll need to function, export it out, setup appropriate routes and setup postman
module.exports = {createablog, getallblog, updateablog, deleteablog, getasingleblog, getallwithoutuser, getsinglewithoutuser}

