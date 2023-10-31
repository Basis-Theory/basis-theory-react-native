// https://jestjs.io/docs/tutorial-react-native#mock-native-modules-using-jestmock
jest.mock('react-native-device-info', () => ({
  getApplicationName: jest.fn(() => 'application name'),
  getBundleId: jest.fn(() => 'bundle id'),
  getDeviceName: jest.fn(() => 'device name'),
  getSystemName: jest.fn(() => 'system name'),
  getSystemVersion: jest.fn(() => 'system version'),
  getVersion: jest.fn(() => 'version'),
  isEmulator: jest.fn(() => true),
}));
