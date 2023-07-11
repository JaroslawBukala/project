const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({

        
        ID:{
          type: Schema.Types.ObjectId
        },
        title:{
            type:String,
            required: true
        },
        imageUrl:{
            type:String,
            required: true
        },
        categories:{
            type: [String],
            required: true
        },
        description:{
            type:String,
            required: true
        },
        createdDate:{
            type: Date,
            default: Date.now
        },
        likes:{
            type: Number,
            default: 0,
            required: true
        },
        createdBy:{
            type: Schema.Types.ObjectId,
            required:true,
            ref: 'User'
        },
        messages: [
            {
              messageBody: {
                type: String,
                required: false
              },
              messageDate: {
                type: Date,
                default: Date.now
              },
              messageUser: {
                type: Schema.Types.ObjectId,
                required: false,
                ref: "User"
              }
            }
          ]
})

module.exports = mongoose.model('Post', PostSchema);