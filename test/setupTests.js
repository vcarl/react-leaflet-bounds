const localStorageMock = {
  getItem: jest.fn().mockReturnValue(null),
  setItem: jest.fn().mockReturnValue(null),
  clear: jest.fn().mockReturnValue(null)
};
global.localStorage = localStorageMock;
