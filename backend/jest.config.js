export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'json'],
  testMatch: ['**/?(*.)+(test).js'],
  setupFilesAfterEnv: ['./jest.setup.js'], 
};