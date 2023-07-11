const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BookSchema = new Schema({

 
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    genre:{
        type: String,
        required:true,
        trim:true
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'Author'
    }
});

module.exports = mongoose.model('Book', BookSchema );