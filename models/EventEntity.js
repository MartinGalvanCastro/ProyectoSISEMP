const mongoose = require('mongoose')

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)

const EventSchema = mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    dates: {
        type: [Date],
        required: true,
        validate: {
            validator: dates => dates[1] > dates[0],
            message: () => 'Rango de fechas no valido, la segunda fecha es menor que la primera'
        }
    },
    participants:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'TeamMember',
        required:true
    }
})
module.exports = mongoose.model('Event', EventSchema)