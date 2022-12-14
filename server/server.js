const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const authRoute = require('./routes/auth');
const appointmentRoute = require('./routes/appointment');
const profileRoute = require('./routes/profile');

const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config({ path:'./config/config.env' })

const app = express();

connectDB()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());  
const PORT = process.env.PORT

app.use('/', authRoute);
app.use('/', appointmentRoute);
app.use('/', profileRoute);

app.listen( PORT || 5000, () =>
  console.log(`Server has started on port:${PORT}`)
);