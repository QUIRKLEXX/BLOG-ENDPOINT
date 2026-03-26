// title field, description, tag/title, created by
const { default: mongoose } = require('mongoose')
const mong = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
      type:String,
      required: [true, 'please provide a blog title']
    
    },
    description: {
      type:String,
      required: [true, 'provide a blog description']
    },
    tag :{
        type:String,
        enum: ["Nature", "Lifestyle","Technology","Sport"],
     
    },
    createdby:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
      required: [true, 'provide a writer']
    }
},{timestamps: true})

module.exports = mongoose.model('Blog',blogSchema)