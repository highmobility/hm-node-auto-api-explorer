const HmkitServices = require('../services/HmkitServices');

class CarController {
  /*
   * renderCarView()
   *
   * We will ask for diagnostics and doors data from the vehicle and display it in our dashboard view.
   */
  async renderCarView(req, res) {
    const diagnostics = await HmkitServices.getDiagnostics(req.session);
    // const maintenance = await HmkitServices.getMaintenance(req.session);
    const ignition = await HmkitServices.getIgnition(req.session);
    const doorsData = await HmkitServices.getDoorLocks(req.session);
    const vehicleLocation = await HmkitServices.getVehicleLocation(req.session);

    const controlMessages = diagnostics.checkControlMessages;
    console.log("control message = ");
    console.log(controlMessages);

    // const CBS = maintenance.conditionBasedServices;
    // console.log("Condition Based Services = ");
    // console.log(CBS);
    

    // const tires = diagnostics.tirePressures.map(({ value: { location, pressure } }) => {
    //   const tireTemperatureData = diagnostics.tireTemperatures.find(
    //     tempData => tempData.value.location === location
    //   );

    //   const wheelRpmData = diagnostics.wheelRPMs.find(
    //     rpmData => rpmData.value.location === location
    //   );

    //   return {
    //     location,
    //     pressure,
    //     temperature: tireTemperatureData.value.temperature,
    //     wheelRpm: wheelRpmData.value.RPM
    //   };
    // });
    
    const doors = doorsData.positions.filter(pos => {
      return !(pos && pos.value.location === 'all')
    }).map(({ value: { location, position } }) => {
      const currentLock = doorsData.locks.find(lock => lock.value.location === location);

      return {
        location,
        position,
        lock: currentLock ? currentLock.value.lockState : null
      };
    });

    res.render('pages/car.ejs', { diagnostics, maintenance, ignition, doors, vehicleLocation, controlMessages});
  }
  // remove maintenance and cbs tires

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
