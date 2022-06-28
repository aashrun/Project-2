const mongoose=require("mongoose")

const internSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique:true,
        
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    collegeId : {
        type : ObjectId,
        ref : 'College'
    },
    
    isDeleted: {
        type: boolean,
        default: false,
    
      },
    },

 { timestamps: true });

module.exports = mongoose.model('Intern', internSchema)