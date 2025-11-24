// Basic functionality tests
const Solution = require('../models/Solution');

describe('Solution Model Tests', () => {
  test('Should return phishing solution', () => {
    const solution = Solution.getSolutionByIncidentType('phishing');
    expect(solution.title).toContain('Phishing');
    expect(solution.steps.length).toBeGreaterThan(0);
    expect(solution.urgency).toBe('high');
  });

  test('Should return default solution for unknown type', () => {
    const solution = Solution.getSolutionByIncidentType('unknown');
    expect(solution.title).toContain('General');
  });
});

// Mock test for now
test('Basic app functionality', () => {
  expect(1 + 1).toBe(2);
});