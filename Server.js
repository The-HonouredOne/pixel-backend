const express = require('express')
app = express()
const cors= require('cors');
const connectDB = require('./config/db');
require('dotenv').config()


app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(cors())

connectDB()


// routes------------------------------------------------------------------

app.use('/api/auth',  require('./routes/authRoute'))
app.use('/api/jobs', require('./routes/jobRoute'))
app.use('/api/user',  require('./routes/userRoute'))

app.get('/', (req, res) => {
  res.send('Hello backend is working!');
});


const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server running on ${PORT}`));