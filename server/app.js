require('dotenv').config();
const express = require ('express');
const app = express();
const userRouter = require('./api/user/user.router');

app.use(express.json());
app.use('/api/users', userRouter);

app.get('/api', (req, res) => {
    res.json({
        success: 1,
        message: 'My first Rest API Working!'
    })
});

app.listen(process.env.APP_PORT, () => {
    console.log('Server is up and running on port 3000!');
});