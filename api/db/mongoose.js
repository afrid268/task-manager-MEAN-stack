//connection handling of db

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TaskManager', {useNewUrlParser : true}).then(()=>{
console.log("connected to mongoDB successfully");
}).catch((e)=>{
    console.log("Erro in connecting to database");
    console.log(e);
});



module.exports = {
    mongoose
};