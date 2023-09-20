const mongoose = require('mongoose')

if (process.argv.length==3) {
  const password = process.argv[2]
   
  const url =
  `mongodb+srv://sample:${password}@cluster1.xnqmntb.mongodb.net?w=majority&retryWrites=true`
  mongoose.connect(url)
  
  const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
  })
  
  const Entry = mongoose.model('Entry', entrySchema)

  Entry.find({}).then(result => {
    result.forEach(entry => {
      console.log(entry)
    })
    mongoose.connection.close()
  })

}
else if(process.argv.length==4){
    console.log('give name and number as argument')
    process.exit(1)
}
else if(process.argv.length==5){
   
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const generateId = () => {
  const randomNumber = Math.floor(Math.random() * 1000000) + 1;
  return randomNumber;
  }
  

const url =
`mongodb+srv://sample:${password}@cluster1.xnqmntb.mongodb.net?w=majority&retryWrites=true`
mongoose.connect(url)

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Entry = mongoose.model('Entry', entrySchema)

const entry = new Entry({
  name: name,
  number: number,
  id: generateId(),
})

entry.save().then(response => {
  console.log('entry saved!')
  mongoose.connection.close()
})

}
else {
    console.log('arguments are correct')
    process.exit(1)
}
