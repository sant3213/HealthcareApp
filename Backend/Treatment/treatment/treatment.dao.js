const mongoose = require('mongoose');
const treatmentSchema = require('./treatment.model');

treatmentSchema.statics = {
  create: function (data, cb) {
    const user = new this(data);
    user.save(cb);
  },
  get: function await(data, cb) {
    this.find(data, cb)
  },
  getByName: function (name, cb) {
    this.find(name, cb);
  },
  update: function (query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },
  delete: function (id, cb) {
    this.findOneAndDelete(id, cb);
  } 
}


const treatmentModel = mongoose.model('Treatment', treatmentSchema);
module.exports = treatmentModel;