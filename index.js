// const express = require("express")
const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

// require("dotenv").config()
// const Entry = require("./models/note")
// // const morgan = require('morgan')
// const app = express()
// const cors = require("cors")
// app.use(cors())


// app.use(express.static("build"))
// app.use(express.json())
// app.use(requestLogger)
// app.use(express.static("dist"))


// handler of requests with unknown endpoint

// morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// const entry = new Entry({
//   name: name,
//   number: number,
//   id: generateId(),
// })




// const PORT =process.env.PORT || 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)
