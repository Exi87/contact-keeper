const express = require('express');
const app = express();

const path = require('path')
const connectDB = require('./config/db')

//connect db
connectDB()

//Init middleware

app.use(express.json({extended:false}))

app.use(express.static(path.join(__dirname, 'client/build')));
//Define routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))


//Serve static asset in production

// if(process.env.NODE_ENV==='production'){
//     //set static folder

//     app.use(express.static('client/build'));

//     app.get('*', (req,res)=>
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     )
// }

console.log(__dirname);

app.get('*', (req,res)=>
res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
)
const Port = process.env.Port || 6060;

app.listen(Port, ()=>console.log(`Server started  on port ${Port}`))