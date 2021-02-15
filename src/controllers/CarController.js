const HmkitServices = require('../services/HmkitServices');

class CarController {
  /*
   * renderCarView()
   * 
   * We will ask for diagnostics and doors data from the vehicle and display it in our dashboard view.
   */
  async renderCarView(req, res) {
    const carData = await HmkitServices.getData(req.session);
    const [diagnosticsResponse, doorsResponse] = carData.multiStates;
    const diagnostics = diagnosticsResponse.data.diagnostics;
    const doorsData = doorsResponse.data.doors;

    const tires = diagnostics.tirePressures ? diagnostics.tirePressures.map(tirePressure => {
      const location = tirePressure.data.location;
      const pressure = tirePressure.data.pressure;

      const tireTemperatureResponse = diagnostics.tireTemperatures && diagnostics.tireTemperatures.find(
        tempData => tempData.data.location.value === location.value
      );
      const wheelRpmResponse = diagnostics.wheelRPMs && diagnostics.wheelRPMs.find(
        rpmData => rpmData.data.location.value === location.value
      );

      const temperature = tireTemperatureResponse ? tireTemperatureResponse.data.temperature : {};
      const RPM = wheelRpmResponse ? wheelRpmResponse.data.RPM : {};

      return {
        location,
        pressure,
        temperature,
        RPM
      };
    }) : [];
    
    const doors = doorsData.positions ? doorsData.positions.filter(pos => {
      return !(pos && pos.data.location.value === 'all')
    }).map(doorData => {
      const location = doorData.data.location;
      const position = doorData.data.position;
      const currentLock = doorsData.locks.find(lock => lock.data.location.value === location.value);

      return {
        location,
        position,
        lock: currentLock ? currentLock.data.lockState : null
      };
    }) : [];

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
