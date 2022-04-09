require('./db/database');
const cors = require('cors');
const express = require('express');
const userRouter = require('./router/userRouter')

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(userRouter);

app.listen(port , () => {
    console.log('The server is up on port '+port);
});