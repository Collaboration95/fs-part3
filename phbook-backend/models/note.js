const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const password = process.env.MONGODB_URI

const url = `mongodb+srv://sample:${password}@cluster1.xnqmntb.mongodb.net?w=majority&retryWrites=true`
console.log("connecting to", url)

mongoose.connect(url)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

const entrySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (value) {
        // Regular expression to validate the phone number format
        return /^(\d{2,3}-\d+)$/.test(value)
      },
      message: "Phone number must be in the format xx-xxxxxxx or xxx-xxxxxxxx.",
    },
    required: true,
  },
  id: Number,
})
entrySchema.set("toJSON",{
  transform:( document,returnedObject ) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model("Entry", entrySchema)
