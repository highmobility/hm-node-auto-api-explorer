const HmkitServices = require('../services/HmkitServices');

class CarController {

  /*
   * renderCarView()
   * 
   * We will ask for diagnostics and doors data from the vehicle and display it in our dashboard view.
   */
  async renderCarView(req, res) {
    const diagnostics = await HmkitServices.getDiagnostics(req.session);
    const doors = await HmkitServices.getDoorLocks(req.session);
    
    res.render('pages/car.ejs', { diagnostics, doors });
  }
  
  /*
   * lockDoors()
   * 
   * This function sends a command to lock your vehicle's doors.
   * HmkitServices.lockDoors function actually returns a DoorLocksResponse containing the new doors state so
   * if you are rocking a single page application then it would be more reasonable to return the new state
   * instead of fetching it again like in this example.
   */
  async lockDoors(req, res) {
    await HmkitServices.lockDoors(req.session);
    res.redirect('/');
  }
  
  /*
   * unlockDoors()
   * 
   * This function sends a command to unlock your vehicle's doors.
   * HmkitServices.lockDoors function actually returns a DoorLocksResponse containing the new doors state so
   * if you are rocking a single page application then it would be more reasonable to return the new state
   * instead of fetching it again like in this example.
   */
  async unlockDoors(req, res) {
    await HmkitServices.unlockDoors(req.session);
    res.redirect('/');
  }

}

module.exports = new CarController();
