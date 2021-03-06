const mongoose = require('mongoose')

const config = require('config')

const db = config.get('mongoURI')


const connectDB = () => {
    mongoose.connect(db, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(() => console.log("Mongo Db Connected")
    ).catch(err => {
        console.error(err.message);



    })
   
}

module.exports = connectDB