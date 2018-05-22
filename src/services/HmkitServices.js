const config = require('../config');
const HMKit = require('hmkit');
const FailureMessageResponse = require('hmkit/lib/Responses/FailureMessageResponse').default;

class HmkitServices {

  constructor() {
    const { clientCertificate, clientPrivateKey } = config.hm;
    this.hmkit = new HMKit(clientCertificate, clientPrivateKey);
  }

  /*
   * getDiagnostics()
   * 
   * session - this is used to get or download and save access certificate
   * 
   * Fetches diagnostics capability data from your vehicle.
   */
  getDiagnostics(session) {
    return this.sendCommand(
      session,
      this.hmkit.commands.DiagnosticsCommand.getState()
    );
  }

  /*
   * getDoorLocks()
   * 
   * session - this is used to get or download and save access certificate
   * 
   * Fetches door locks capability data from your vehicle.
   */
  getDoorLocks(session) {
    return this.sendCommand(
      session,
      this.hmkit.commands.DoorLocksCommand.getState()
    );
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
      this.hmkit.commands.DoorLocksCommand.lock()
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
      this.hmkit.commands.DoorLocksCommand.unlock()
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
    const response = await this.hmkit.telematics.sendCommand(accessCert.rawAccessCertificate.accessGainingSerialNumber, command);
    const parsedResponse = response.parse();

    if (parsedResponse instanceof FailureMessageResponse) {
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

    if (!accessCertificate) {
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
