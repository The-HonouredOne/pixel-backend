const express = require('express')
app = express()
const cors= require('cors');
const connectDB = require('./config/db');
require('dotenv').config()
// const status= require('express-status-monitor')


app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(cors())
// app.use(status())

connectDB()


// routes------------------------------------------------------------------

app.use('/api/auth',  require('./routes/authRoute'))
app.use('/api/jobs', require('./routes/jobRoute'))
app.use('/api/user',  require('./routes/userRoute'))
app.use('/api/admin',  require('./routes/adminRoute'))

app.get('/', (req, res) => {
  res.send('Hello backend is working!');
});





const cron = require("node-cron");
const User = require('./models/User');
const Employer = require('./models/Employer');

// Runs every minute (adjust to your needs)
cron.schedule("* * * * *", async () => {
  console.log("Cron fired at:", new Date());
  const now = new Date();

  const suspendedUsers = await User.find({
    status: "suspended",
    suspendedUntil: { $lte: now },
  });

  console.log("Found suspended users ready to reactivate:", suspendedUsers.length);

  if (suspendedUsers.length > 0) {
    const result = await User.updateMany(
      { _id: { $in: suspendedUsers.map(u => u._id) } },
      { status: "active", suspendedUntil: null, suspensionReason: null }
    );
    console.log("Users reactivated:", result.modifiedCount);
  }
});









const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server running on ${PORT}`));