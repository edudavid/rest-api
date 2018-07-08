const LeadsController = require('../controllers/LeadsController')

module.exports = (app) => {
  
  app.route('/leads')
    .get(LeadsController.get)
    .post(LeadsController.create);


  app.route('/leads/:id')
    .get(LeadsController.findById)
    .put(LeadsController.update)
    .delete(LeadsController.delete)
};