module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: [
    'plugin:vue/strongly-recommended'
  ],
  // add your custom rules here
  rules: {
    'no-console': ['error', { allow: ['debug', 'warn', 'error'] }],
    'padded-blocks': ['off', {
      blocks: 'always',
      classes: 'always',
      switches: 'never'
    }]
  }
}
