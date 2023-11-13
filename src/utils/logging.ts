/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import {
  getApplicationName,
  getBundleId,
  getDeviceName,
  getSystemName,
  getSystemVersion,
  getVersion,
  isEmulator,
} from 'react-native-device-info';

type AttributeMap = Record<string, string>;

export const logger = (() => {
  const ddTok = 'pubb96b84a13912504f4354f2d794ea4fab';

  let attrMap: AttributeMap = {
    application: 'React Native Elements',
    applicationName: getApplicationName() ?? 'unknown application name',
    applicationVersion: getVersion() ?? 'Unknown application version',
    bundleId: getBundleId() ?? 'unknown vendor',
    ddsource: 'react-native',
    deviceOS: getSystemName() ?? 'Unknown device OS',
    deviceOsVersion: getSystemVersion() ?? 'Unknown device OS version',
    service: 'React Native Elements',
  };

  (async () => {
    attrMap = {
      ...attrMap,
      device: (await getDeviceName()) ?? 'unknown device',
      env: (await isEmulator()) ? 'local' : 'prod',
    };
  })();

  const log = async (
    message: string,
    level: string,
    error?: Error,
    attributes: AttributeMap = {}
  ) => {
    const payload = {
      ...attrMap,
      ...attributes,
      level,
      message:
        level === 'error' && error ? `${message}: ${error.message}` : message,
    };

    const request = new Request(
      `https://http-intake.logs.datadoghq.com/v1/input/${ddTok}`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    try {
      const response = await fetch(request);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      await response.json();
    } catch {
      // Do nothing
    }
  };

  return {
    log: {
      error: async (message: string, error: Error, attributes?: AttributeMap) =>
        log(message, 'error', error, attributes),
      info: async (message: string, attributes?: AttributeMap) =>
        log(message, 'info', undefined, attributes),
      warn: async (message: string, attributes?: AttributeMap) =>
        log(message, 'warn', undefined, attributes),
    },
  };
})();
