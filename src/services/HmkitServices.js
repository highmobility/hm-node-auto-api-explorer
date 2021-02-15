const config = require('../config');
const HMKit = require('hmkit');

class HmkitServices {
  constructor() {
    const { clientCertificate, clientPrivateKey } = config.hm;
    this.hmkit = new HMKit(clientCertificate, clientPrivateKey);
  }

  /*
   * getData()
   *
   * session - this is used to get or download and save access certificate
   *
   * Fetches diagnostics and doors capability data from your vehicle.
   */
  getData(session) {
    return this.sendCommand(session, this.hmkit.commands.MultiCommand.multiCommand({
      multiCommands: {
        diagnostics: {
          getState: [],
        },
        doors: {
          getState: []
        }
      }
    }));
  }

  /*
   * lockDoors()
   *
   * session - this is used to get or download and save access certificate
   *
   * Sends a command to lock your car doors.
   */
  lockDoors(session) {
    return this.sendCommand(
      session,
      this.hmkit.commands.Doors.lockUnlockDoors({
        locksState: 'locked'
      })
    );
  }

  /*
   * unlockDoors()
   *
   * session - this is used to get or download and save access certificate
   *
   * Sends a command to unlock your car doors.
   */
  unlockDoors(session) {
    return this.sendCommand(
      session,
      this.hmkit.commands.Doors.lockUnlockDoors({
        locksState: 'unlocked'
      })
    );
  }

  /*
   * sendCommand()
   *
   * session - this is used to get or download and save access certificate
   * command - command to send to your vehicle
   *
   * Sends a command to your vehicle via node SDK
   * If we receive failure message, we want to throw it to catch in our error middleware.
   */
  async sendCommand(session, command) {
    const accessCert = await this.getAccessCertificate(session);
    const response = await this.hmkit.telematics.sendCommand(
      command,
      accessCert
    );
    const parsedResponse = response.parse();
    
    if (parsedResponse.constructor.name === 'FailureMessageResponse') {
      console.log('Failed to execute the command (', command ,'): ', parsedResponse)
      throw parsedResponse;
    }

    return parsedResponse;
  }

  /*
   * getAccessCertificate()
   *
   * session - this is used to get or download and save access certificate
   *
   * This function tries to take access certificate from session.
   * If there is none, new access certificate is downloaded and saved to session.
   */
  async getAccessCertificate(session) {
    const { accessCertificate, accessToken } = session;

    if (!accessCertificate || typeof accessCertificate.getVehicleSerial !== 'function') {
      if (!!accessToken) {
        const newAccessCertificate = await this.hmkit.downloadAccessCertificate(accessToken);

        if (!newAccessCertificate) {
          throw new Error('Failed to download access certificate.');
        }

        session.accessCertificate = newAccessCertificate;
        return newAccessCertificate;
      }

      throw new Error('No access token to fetch access certificate.');
    }

    return accessCertificate;
  }
}

module.exports = new HmkitServices();
