const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/vehicle-rental-app',{
    useNewUrlParser:true
}).then('connected').catch('error in connection');