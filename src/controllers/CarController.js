const CarServices = require('../services/CarServices');
const HmkitServices = require('../services/HmkitServices');

class CarController {

  /*
   * Fetch some data and render it in main view.
   */
  async renderCarView(req, res) {
    const diagnostics = await CarServices.getMappedDiagnosticsData(req.session);
    const doors = await CarServices.getMappedDoorLocksData(req.session);
    
    res.render('views/car', { diagnostics, doors });
  }
  
  async lockDoors(req, res) {
    await HmkitServices.lockDoors(req.session);
    res.redirect('/');
  }
  
  async unlockDoors(req, res) {
    await HmkitServices.unlockDoors(req.session);
    res.redirect('/');
  }

}

module.exports = new CarController();
