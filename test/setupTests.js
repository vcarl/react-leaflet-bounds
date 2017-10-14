const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-15');

configure({ adapter: new Adapter() });

const localStorageMock = {
  getItem: jest.fn().mockReturnValue(null),
  setItem: jest.fn().mockReturnValue(null),
  clear: jest.fn().mockReturnValue(null)
};
global.localStorage = localStorageMock;
