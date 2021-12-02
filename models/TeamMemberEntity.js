const mongoose = require('mongoose')

const TeamMemberSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    porfilePic:{
        type:String,
        required:true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref:'Project'
    },
    events: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        ref:'Event'
    },
    asignedTask: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        ref:'Task'
    }
})
module.exports = mongoose.model('TeamMember', TeamMemberSchema)