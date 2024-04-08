const express = require('express');
const cors = require('cors');
console.log("Testing")

const userRouter = require('./routes/userRoutes')
const adminrubricRouter = require('./routes/adminrubricRoutes')
const app = express();
app.use(express.json())
app.use(cors());

app.use('/api/v1/users',userRouter);
app.use('/api/v1/adminrubric',adminrubricRouter);



module.exports = app;



