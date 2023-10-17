import * as core from '@actions/core'
import { getEnvironmentVariable } from './helpers'
import { newGitHubApp, getInstallationId, getInstallationToken } from './auth'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const privateKey: string = core.getInput('private_key')
    const clientId: string = core.getInput('client_id')
    const clientSecret: string = core.getInput('client_secret')
    const appId: string = core.getInput('app_id')
    const owner: string = getEnvironmentVariable('GITHUB_REPOSITORY_OWNER')

    core.info('searching for installation')
    const app = newGitHubApp(appId, privateKey, clientId, clientSecret)
    const id = await getInstallationId(app, owner)
    core.info('found installation id, getting token')
    const token = await getInstallationToken(
      appId,
      privateKey,
      clientId,
      clientSecret,
      id
    )
    core.info('got token, setting output')
    core.setSecret(token)
    core.setOutput('app_install_token', token)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
