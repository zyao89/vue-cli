#!/usr/bin/env node

const { semver, error } = require('@vue/cli-shared-utils')
const requiredVersion = require('../package.json').engines.node

if (!semver.satisfies(process.version, requiredVersion)) {
  error(
    `You are using Node ${process.version}, but vue-cli-service ` +
    `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`
  )
  process.exit(1)
}

const Service = require('../lib/Service')
const getGlobalParams = require('../lib/util/getGlobalParams')
const context = process.env.VUE_CLI_CONTEXT || process.cwd()
const service = new Service(context, getGlobalParams(context))

const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv, {
  boolean: [
    // build
    'modern',
    'report',
    'report-json',
    'inline-vue',
    'watch',
    // serve
    'open',
    'copy',
    'https',
    // inspect
    'verbose'
  ]
})
const command = args._[0]

service.run(command, args, rawArgv).catch(err => {
  error(err)
  process.exit(1)
})
