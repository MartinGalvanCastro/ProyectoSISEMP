const mongoose = require('mongoose')
const statusList = ['Levantamiento de Requerimientos', 'Validación de QA', 'Desarollo', 'Despliegue']
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)

const ProjectSchema = mongoose.Schema({
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
            message: '{VALUE} no es valido como un estado del proyecto'
        }
    },
    deadline: {
        type: Date,
        required: true,
        min: [tomorrow, 'La fecha debe ser mayor a la fecha actual, se ingreso {VALUE}']
    },
    tasks: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        ref: 'Task'
    },
    team: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'TeamMember'
    }
})

module.exports = mongoose.model('Project', ProjectSchema,'Project')