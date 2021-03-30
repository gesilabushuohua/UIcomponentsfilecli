module.exports = {
  root: false,
  env: {
    es6: true,
    node: true
  },
  files: ['*.js'],
  extends: [
    'standard'
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module"
  },
  rules: {
    semi: ['error', 'always']
  }
}