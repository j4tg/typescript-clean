/* eslint @typescript-eslint/no-var-requires: off */

const { pathsToModuleNameMapper } = require('ts-jest')
const { jsWithTs } = require('ts-jest/presets')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  transform: jsWithTs.transform,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: __dirname
  }),
  setupFiles: ['./test/setup.ts'],
  collectCoverageFrom: ['src/**']
}
