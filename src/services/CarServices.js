const HmkitServices = require('./HmkitServices');

class CarServices {
    
    async getMappedDiagnosticsData(session) {
        const diagnostics = await HmkitServices.getDiagnostics(session);

        return (!!diagnostics && !!diagnostics.tires) ? ({
            ...diagnostics,
            tires: diagnostics.tires.map(tire => this.mapTireData(tire))
        }) : null;
    }

    async getMappedDoorLocksData(session) {
        const { doors } = await HmkitServices.getDoorLocks(session);
        return doors.map((door) => this.mapDoorData(door));
    }

    mapDoorData(door) {
        return ({
            label: this.getPositionLabel(door.doorLocation),
            state: door.doorPosition,
            lock: door.doorLock
        });
    }

    mapTireData(tire) {
        return ({
            label: this.getPositionLabel(tire.tirePosition),
            pressure: tire.tirePressure,
            temperature: tire.tireTemperature,
            rpm: tire.wheelRPM
        });
    }

    getPositionLabel(position) {
        switch(position) {
            case 'front_left':
                 return 'Front left';
            case 'front_right':
                return 'Front right';
            case 'rear_right':
                return 'Rear right';
            case 'rear_left':
                return 'Rear left';
            default:
                return 'Unknown';
        }
    }
}

module.exports = new CarServices();
