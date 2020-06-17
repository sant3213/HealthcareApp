const Treatments = require('./treatment.controller');

module.exports = (router) => {
  router.post('/createTreatment',  Treatments.createTreatment);
  router.get('/getTreatment/:id', Treatments.getTreatmentInformation);
  router.get('/getTreatments', Treatments.getTreatmentsInformation);
  router.put('/updateTreatment/:id', Treatments.updateTreatmentInformation);
  router.delete('/deleteTreatment/:id', Treatments.deleteTreatment);
  router.post('/setComment', Treatments.setComment);
  router.get('/getAll/:email', Treatments.getAllTreatmentsByEmail);
 
}
