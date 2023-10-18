import {
  newGitHubApp,
  getInstallationId,
  getInstallationToken
} from '../src/auth' // replace with your module path

jest.mock('@octokit/app', () => {
  return {
    App: jest.fn().mockImplementation(() => {
      return {
        eachInstallation: {
          iterator: jest.fn().mockImplementation(async function* () {
            yield {
              installation: {
                account: {
                  login: 'mockOwner'
                },
                id: 1234
              }
            }
          })
        }
      }
    })
  }
})

jest.mock('@octokit/auth-app', () => {
  return {
    createAppAuth: jest.fn().mockImplementation(() => {
      return async () => ({
        token: 'mockToken'
      })
    })
  }
})

describe('GitHub App utilities', () => {
  it('returns the installation ID for a given owner', async () => {
    const app = newGitHubApp('appId', 'privateKey', 'clientId', 'clientSecret')
    const installationId = await getInstallationId(app, 'mockOwner')
    expect(installationId).toBe(1234)
  })

  it('throws an error when no installation is found for the given owner', async () => {
    const app = newGitHubApp('appId', 'privateKey', 'clientId', 'clientSecret')
    await expect(getInstallationId(app, 'unknownOwner')).rejects.toThrow(
      'No installation found for this app, is it installed on this org/user?'
    )
  })

  it('returns a token when getting an installation token', async () => {
    const token = await getInstallationToken(
      'appId',
      'privateKey',
      'clientId',
      'clientSecret',
      1234
    )
    expect(token).toBe('mockToken')
  })

  it('creates a new GitHub App instance', () => {
    const app = newGitHubApp('appId', 'privateKey', 'clientId', 'clientSecret')
    expect(app).toBeDefined()
  })
})
