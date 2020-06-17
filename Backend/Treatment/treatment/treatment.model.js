const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.set('useCreateIndex', true);

const treatmentSchema = new Schema({
  id: {
    type: String,
    required: false,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  patiente: {
    type: String,
    required: true,
    trim: true
  },
  specialization: {
    type: String,
    required: true,
    trim: true
  }, 
  comments: [{ 
    text: {
      type: String,
      required: false
    },
    doctorId: {
      type: String,
      required: false
    },
    publicationId: {
      type: String,
      required: false
    }  
  }]
}, {
    timestamps: true
  });

module.exports = treatmentSchema;