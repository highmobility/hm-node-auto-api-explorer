const config = require('../config');
const HMKit = require('hmkit');

class HmkitServices {

  constructor() {
    const { clientCertificate, clientPrivateKey } = config.hm;
    this.hmkit = new HMKit(clientCertificate, clientPrivateKey);
    // this.hmkit.api.url = 'https://localhost:4443/hm_cloud/api/v1/';
  }

  getDiagnostics(session) {
    return this.sendCommand(
      session,
      this.hmkit.commands.DiagnosticsCommand.getState()
    );
  }

  getDoorLocks(session) {
    return this.sendCommand(
      session,
      this.hmkit.commands.DoorLocksCommand.getState()
    );
  }

  lockDoors(session) {
    return this.sendCommand(
      session,
      this.hmkit.commands.DoorLocksCommand.lock()
    );
  }

  unlockDoors(session) {
    return this.sendCommand(
      session,
      this.hmkit.commands.DoorLocksCommand.unlock()
    );
  }

  async sendCommand(session, command) {
    try {
      const accessCert = await this.getAccessCertificate(session);
      const response = await this.hmkit.telematics.sendCommand(accessCert.rawAccessCertificate.accessGainingSerialNumber, command);
      return !!response ? response.parse() : null;
    } catch (e) {
      console.log('Failed to send command', e);
      return null;
    }
  }

  async getAccessCertificate(session) {
    const { accessCertificate, accessToken } = session;

    if (!accessCertificate) {
      if (!!accessToken) {
        const newAccessCertificate = await this.hmkit.downloadAccessCertificate(accessToken);
        session.accessCertificate = newAccessCertificate;
        return newAccessCertificate;
      }

      throw new Error('No access token to fetch access certificate.');
    }

    return accessCertificate;
  }

}

module.exports = new HmkitServices();
