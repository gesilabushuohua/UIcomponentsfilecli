const jsSettings = {
  files: ['*.js'],
  extends: [
    'standard'
  ],
  rules: {
    semi: ['error', 'always']
  }
};

/* const tsSettings = {
  
}; */

module.exports = {
  root: false,
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module"
  },
  overrides: [
    jsSettings
  ]
}