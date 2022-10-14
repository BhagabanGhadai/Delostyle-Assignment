const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
heading:{
    type:String,
    required:true
},
category:{
    type:Array,
    required:true
},
description:{
    type:String,
    required:true
}
}, { timestamps: true })

module.exports = mongoose.model('newsModel', newsSchema)