const Treatment = require('./treatment.dao');
const mongoose = require('mongoose');
exports.createTreatment = async (req, res) => {
  
  Treatment.create(req.body, (err, user) => {
    if (err) return res.status(500).send('Server error');
    res.send({ message: "success"});
  });
};

  exports.getTreatmentsInformation = async (req, res, next) => {
    Treatment.get({}, function (err, treatment) {
      if (err && err.code === 11000) return res.status(409).send('Treatment don´t exists');
      if (err) return res.status(500).send('Server error');
      res.json({ treatment: treatment });
    })
  };

  exports.getTreatmentInformation = async (req, res, next) => {
    const dataTreatment = {
      id: req.params.id
    }
    treatmentId = mongoose.Types.ObjectId(dataTreatment.id);
    Treatment.findById( treatmentId, function (err, treatment) {
      if (err && err.code === 11000) return res.status(409).send('Treatment don´t exists');
      if (err) return res.status(500).send('Server error');
      res.json({ treatment: treatment });
    })
  };

  exports.updateTreatmentInformation = (req, res, next) => {
    const treatment = {
      name: req.body.name,
      description: req.body.description,
      id: req.params.id
    }
    treatmentId = mongoose.Types.ObjectId(treatment.id);
    Treatment.findByIdAndUpdate({_id: treatmentId}, {$set: {name: treatment.name, description: treatment.description}},
      function (err, treatment) {
        if (err && err.code === 11000) return res.status(409).send('Treatment don´t exists');
        if (err) return res.status(500).send('Server error');
        res.json({ message: 'Tratamiento actualizado exitosamente' });
      })
  };

  exports.deleteTreatment = (req, res) => {
    Treatment.delete({ _id: req.params.id },
      function (err, treatment) {
        if (err && err.code === 11000) return res.status(409).send({ message: 'Treatment don´t exists'});
        if (err) return res.status(500).send('Server error');
        res.json({ message: 'Tratamiento eliminado exitosamente' });
      })
  };

  exports.setComment = (req, res) => {
    var dataComment = {
      text: req.body.text,
      doctorId: req.body.user,
      publicationId: req.body.publication
    }
    treatmentId = mongoose.Types.ObjectId(dataComment.publicationId);
    Treatment.findByIdAndUpdate(treatmentId , {$push: {comments: dataComment}},
      function (err, treatment) {
        if (err && err.code === 11000) return res.status(409).send('Commentary don´t exists');
        if (err) return res.status(500).send(err);
        res.json({ message: 'success' });   
      }) 
  };

  exports.getAllTreatmentsByEmail =  (req, res, next) => {
    const dataTreatment = {
      email: req.params.email
    }
    Treatment.find( {patiente: dataTreatment.email}, function (err, treatments) {
      if (err && err.code === 11000) return res.status(409).send('Treatment don´t exists');
      if (err) return res.status(500).send('Server error');
      res.json({ treatment: treatments });
      
    })
  };











