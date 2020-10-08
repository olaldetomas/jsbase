module.exports = {
  parser: 'babel-eslint',

  env: {
    node: true,
    es6: true,
  },

  rules: {
    camelcase: 'error',
    'comma-dangle': 0,
    'class-methods-use-this': 0,
    'no-use-before-define': ['error', { functions: false }],
    indent: [
      'warn',
      2,
      { VariableDeclarator: { var: 2, let: 2, const: 3 }, SwitchCase: 1 },
    ],
    'keyword-spacing': ['error', { before: true }],
    'no-control-regex': 0,
    // "no-unused-vars": "warn",
    'no-console': 'off',
    // 'padded-blocks': ['warn', { classes: 'always' }],
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'space-before-function-paren': ['error', 'never'],
    'block-spacing': ['error', 'always'],
  },
}
