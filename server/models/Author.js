const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
    
    _id:{
            type: Schema.Types.ObjectId
    },
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    age:{
        type: Number,
        required:true,
        trim:true
    },
    book:{
        type: [Schema.Types.ObjectId],
        required:true,
        ref: 'Book'
    }

});

module.exports = mongoose.model("Author", AuthorSchema);