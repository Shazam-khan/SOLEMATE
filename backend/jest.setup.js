import { jest } from '@jest/globals';

// Mock the database connection
jest.mock('../../DB/connect.js', () => {
  const dbMock = {
    connect: jest.fn(() => Promise.resolve()),
    query: jest.fn(() => Promise.resolve({ rows: [] })),
    end: jest.fn(() => Promise.resolve()),
  };
  console.log('DB mock created:', {
    connectIsMock: jest.isMockFunction(dbMock.connect),
    queryIsMock: jest.isMockFunction(dbMock.query),
    endIsMock: jest.isMockFunction(dbMock.end),
  });
  return { db: dbMock };
});