import * as core from '@actions/core'
import { run } from '../src/main' // replace with your module path
import { getEnvironmentVariable } from '../src/helpers'
import {
  newGitHubApp,
  getInstallationId,
  getInstallationToken
} from '../src/auth'

// Mock the core module functions
jest.mock('@actions/core', () => {
  return {
    getInput: jest.fn(),
    info: jest.fn(),
    setSecret: jest.fn(),
    setOutput: jest.fn(),
    setFailed: jest.fn()
  }
})

// Mock the previously tested functions
jest.mock('../src/helpers', () => {
  return {
    getEnvironmentVariable: jest.fn()
  }
})

jest.mock('../src/auth', () => {
  return {
    newGitHubApp: jest.fn(),
    getInstallationId: jest.fn(),
    getInstallationToken: jest.fn()
  }
})

describe('run function', () => {
  beforeEach(() => {
    // Reset mocks before each test
    (core.getInput as jest.Mock).mockReset()
    ;(getEnvironmentVariable as jest.Mock).mockReturnValue('mockOwner')
    ;(newGitHubApp as jest.Mock).mockReturnValue({})
    ;(getInstallationId as jest.Mock).mockResolvedValue(1234)
    ;(getInstallationToken as jest.Mock).mockResolvedValue('mockToken')
  })

  it('executes the main action logic successfully', async () => {
    await run()

    expect(core.getInput).toHaveBeenCalledWith('private_key')
    expect(core.getInput).toHaveBeenCalledWith('client_id')
    expect(core.getInput).toHaveBeenCalledWith('client_secret')
    expect(core.getInput).toHaveBeenCalledWith('app_id')
    expect(getEnvironmentVariable).toHaveBeenCalledWith(
      'GITHUB_REPOSITORY_OWNER'
    )
    expect(core.info).toHaveBeenCalledWith('searching for installation')
    expect(core.info).toHaveBeenCalledWith(
      'found installation id, getting token'
    )
    expect(core.info).toHaveBeenCalledWith('got token, setting output')
    expect(core.setSecret).toHaveBeenCalledWith('mockToken')
    expect(core.setOutput).toHaveBeenCalledWith(
      'app_install_token',
      'mockToken'
    )
  })

  it('handles errors and sets the action as failed', async () => {
    (getInstallationId as jest.Mock).mockRejectedValue(new Error('Test error'))

    await run()

    expect(core.setFailed).toHaveBeenCalledWith('Test error')
  })
})
