interface GetEnvironmentVariableOptions {
  defaultValue?: string
}

const getEnvironmentVariable = (
  name: string,
  options: GetEnvironmentVariableOptions = {}
): string => {
  const value = process.env[name]

  if (value) {
    return value
  }

  if (options.defaultValue) {
    return options.defaultValue
  }

  throw new Error(`Environment variable ${name} not found`)
}

export { getEnvironmentVariable }
