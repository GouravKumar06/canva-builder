
const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
    userId : String,
    name : String,
    canvaData : String,
    width : Number,
    height : Number,
    category : String,
    createdAt :{
        type : Date,
        default : Date.now()
    },
    updatedAt :{
        type : Date,
        default : Date.now()
    }
})

// Add compound index on userId and name
designSchema.index({ userId: 1 }); // Index on userId
designSchema.index({ name: 1 });   // Index on name

const Design = mongoose.model('Design', designSchema);

module.exports = Design