# App-Token Github Action

This action allows you to get the `GITHUB_TOKEN` for a given app installation to save you from using bot accounts. 

## Features

- Retrieve the GITHUB_TOKEN for a specified GitHub App in the current installation.
- Can be integrated into CI/CD workflows to automate tasks using the GitHub App's permissions.

## Usage

### Inputs

| Name | Description | Required |
| --- | --- | --- |
| `private_key` | The private key of the app. | `true` |
| `app_id` | The app ID. | `true` |
| `client_id` | The client ID of the app. | `true` |
| `client_secret` | The client secret of the app. | `true` |

### Outputs

| Name | Description |
| --- | --- |
| `app_install_token` | The token for the app installation used to authenticate to the GitHub API. |


## Example Workflow

Here's an example workflow that demonstrates how to use the "app-token" action:

```yaml

name: Example Workflow

on: [push]

jobs:
  use_app_token:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v2

    - name: Get App Token
      id: get_token
      uses: ActionsHub/app-token@v1  <!-- Replace with actual version -->
      with:
        private_key: ${{ secrets.APP_PRIVATE_KEY }}
        app_id: ${{ secrets.APP_ID }}
        client_id: ${{ secrets.APP_CLIENT_ID }}
        client_secret: ${{ secrets.APP_CLIENT_SECRET }}

    - name: Use App Token
      run: echo "App Token: ${{ steps.get_token.outputs.app_install_token }}"
```

Replace placeholders (like APP_PRIVATE_KEY) with your actual secrets or values.

## Development

## Pre-commit hooks

Install [Pre-Commit](https://pre-commit.com/#install) Hooks to run linting and tests before committing.
Run:

```bash
pre-commit install
```

This section is intended for developers who want to contribute to the app-token action.


### Clone the repository
```bash
git clone https://github.com/ActionsHub/app-token.git
cd app-token
```

### Install dependencies

```bash
npm install
```

## License

MIT License