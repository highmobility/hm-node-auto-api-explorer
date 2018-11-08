const HmkitServices = require('../services/HmkitServices');

class CarController {
  /*
   * renderCarView()
   *
   * We will ask for diagnostics and doors data from the vehicle and display it in our dashboard view.
   */
  async renderCarView(req, res) {
    const diagnostics = await HmkitServices.getDiagnostics(req.session);
    const doorsData = await HmkitServices.getDoorLocks(req.session);

    const tires = diagnostics.tirePressures.map(({ location, pressure }) => {
      const tireTemperatureData = diagnostics.tireTemperatures.find(
        tempData => tempData.location === location
      );
      const wheelRpmData = diagnostics.wheelRpms.find(rpmData => rpmData.location === location);

      return {
        location,
        pressure,
        temperature: tireTemperatureData.temperature,
        wheelRpm: wheelRpmData.rpm
      };
    });

    const doors = doorsData.positions.map(({ doorLocation, position }) => {
      const currentLock = doorsData.locks.find(lock => lock.doorLocation === doorLocation);

      return {
        doorLocation,
        position,
        lock: currentLock.lockState
      };
    });

    res.render('pages/car.ejs', { diagnostics, doors, tires });
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
