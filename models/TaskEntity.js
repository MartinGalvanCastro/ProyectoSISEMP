const mongoose = require('mongoose')
const statusList = ['Creada, En progreso, Pendiente, Completa']
const priorityList = ['Alta', 'Baja', 'Media']
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: statusList,
            message: '{VALUE} no es valido como un estado de la tarea'
        }
    },
    startDate: {
        type: Date,
        required: false,
        default: today
    },
    deadline: {
        type: Date,
        required: true,
        min: [tomorrow, 'La fecha debe ser mayor a la fecha actual, se ingreso {VALUE}']
    },
    priority: {
        type: String,
        required: true,
        enum: {
            values: priorityList,
            message: '{VALUE} no es valido como prioridad de la tarea'
        }
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    asignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TeamMember',
        required: true
    }
})
module.exports = mongoose.model('Task', TaskSchema)