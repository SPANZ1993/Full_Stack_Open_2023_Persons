const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI

console.log('Connecting to ', url)


mongoose.connect(url)
    .then(
        () => {console.log('Connected to MongoDB')}
    )
    .catch(
        error => {console.log('Error connecting to MongoDB:', error.message)}
    )


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        validate : {
            validator: v => {
                return /^\d{2,3}-\d{4,}$/.test(v) && v.length >= 8},
            message: props => `${props.value} is not a valid phone number`
        }            
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person', personSchema)