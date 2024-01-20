const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
if (process.argv.length<3) {
    console.log('give password as argument')
    // eslint-disable-next-line no-undef
    process.exit(1)
}
// eslint-disable-next-line no-undef
else if (process.argv.length == 4){
    console.log('please provide a name and number')
    // eslint-disable-next-line no-undef
    process.exit(1)
}
// eslint-disable-next-line no-undef
else if (process.argv.length > 5){
    console.log('too many arguments provided')
    // eslint-disable-next-line no-undef
    process.exit(1)
}

// eslint-disable-next-line no-undef
const password = process.argv[2]

const url =
  `mongodb+srv://rigginsspencer:${password}@clustermcclusterface.kjxjhso.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Person = mongoose.model('Person', personSchema)


// eslint-disable-next-line no-undef
if (process.argv.length == 5){
    const person = new Person({
        // eslint-disable-next-line no-undef
        name: process.argv[3],
        // eslint-disable-next-line no-undef
        number: process.argv[4]
    })

    person.save().then( () => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}
else {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(person)
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}