const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/venue',require('./routes/venue'))
app.use('/event',require('./routes/event'))
app.use('/attendee',require('./routes/attendee'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
