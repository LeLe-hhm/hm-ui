module.exports = {
  env: {
    // 代码运行环境
    browser: true,
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser', // 定义eslint解析器
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended', //定义文件继承的子规范
    // 'standard', // 选用standard规范
  ],
  plugins: [
    'react', // eslint-plugin-react
    'react-hooks', // eslint-plugin-react-hooks
    '@typescript-eslint', //定义了该eslint文件所依赖的插件
  ],
  settings: {
    react: {
      version: '16.13.1',
    },
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.js', '*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 2,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
  rules: {
    // indent: ['error', 'tab'],
    // 'linebreak-style': ['error', 'unix'],
    // quotes: ['error', 'single'],
    // semi: ['error', 'always'],
  },
}
