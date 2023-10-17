import { createAppAuth } from '@octokit/auth-app'
import { App } from '@octokit/app'

async function getInstallationId(app: App, owner: string): Promise<number> {
  for await (const { installation } of app.eachInstallation.iterator()) {
    if (installation.account?.login.toLowerCase() === owner.toLowerCase()) {
      return installation.id
    }
  }
  throw new Error(
    'No installation found for this app, is it installed on this org/user?'
  )
}

async function getInstallationToken(
  appId: string,
  privateKey: string,
  clientId: string,
  clientSecret: string,
  installationId: number
): Promise<string> {
  const auth = createAppAuth({
    appId,
    privateKey,
    clientId,
    clientSecret,
    installationId
  })
  const { token } = await auth({ type: 'installation' })
  return token
}

function newGitHubApp(
  appId: string,
  privateKey: string,
  clientId: string,
  clientSecret: string
): App {
  return new App({
    appId,
    privateKey,
    clientId,
    clientSecret
  })
}

export { newGitHubApp, getInstallationId, getInstallationToken }
