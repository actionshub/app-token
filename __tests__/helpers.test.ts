import { getEnvironmentVariable } from '../src/helpers' // replace with your module path

describe('getEnvironmentVariable', () => {
  // Reset the environment after each test
  afterEach(() => {
    jest.resetModules()
  })

  it('returns the environment variable if it exists', () => {
    // Mocking the environment variable
    process.env.TEST_VARIABLE = 'Test Value'

    const result = getEnvironmentVariable('TEST_VARIABLE')
    expect(result).toBe('Test Value')
  })

  it('returns the default value if the environment variable does not exist and a default value is provided', () => {
    const result = getEnvironmentVariable('NON_EXISTENT_VARIABLE', {
      defaultValue: 'Default Value'
    })
    expect(result).toBe('Default Value')
  })

  it('throws an error if the environment variable does not exist and no default value is provided', () => {
    expect(() => getEnvironmentVariable('NON_EXISTENT_VARIABLE')).toThrow(
      'Environment variable NON_EXISTENT_VARIABLE not found'
    )
  })
})
