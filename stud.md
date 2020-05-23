## 准备工作

**初始化项目**

`mkdir hm-ui && cd hm-ui && npm init -y && code .`

**创建组件库文件及入口**

`mkdir components && cd components && touch index.ts`

## 代码规范

**eslint**

安装： `yarn add eslint -D`

执行: `npx eslint --init`命令，根据指引生成所需的 eslint 配置方案

安装相关配置：

1. React:

   `yarn add eslint-plugin-react eslint-plugin-react-hooks -D`

2. TypeScript:

   `yarn add @typescript-eslint/parser @typescript-eslint/eslint-plugin -D`

   - `@typescript-eslint/parser`：ESLint 解析器，用于解析 typescript，从而检查和规范 Typescript 代

   - `@typescript-eslint/eslint-plugin`：ESLint 插件，包含了各类定义好的检测 Typescript 代码的规范

3. Standard:

   `yarn add eslint-plugin-standard eslint-config-standard -D`

   - `eslint-config-standard`: 自定义自己项目中需要的规则

4. 其他：

   `yarm add eslint-plugin-markdown eslint-plugin-node eslint-plugin-jest eslint-plugin-import eslint-plugin-promise -D`

```
// .eslintrc.js
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
  rules: {},
}

```

**standard**

安装：`yarn add standard -D`

应用了 ESLint 后，通常是需要自己来配置繁杂的 rules 规则，这也是一个喜好类的东西，多数人是不愿意在这上面耗费太多精力的（比如手动配置数百个 ESLint 规则），于是 github 上出现了一些开源的代码规范库，比较流行的有 airbnb、standard、prettier 等，项目中使用 standard（默认不支持修改规则，如果要使用 standard 并需要对其中某些规则进行自定义的话，需要使用`eslint-config-standard`）

**stylelint**

安装：`yarn add styelint styleint-config-standard -D`

```
// .stylelintrc.js
module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    'block-no-empty': true,
  },
}

```

package 配置命令：`npm run lint`

```
// package.json
 "scripts": {
    "clean": "rimraf dist lib esm types coverage docs site/build",
    "lint": "eslint './**/*.{js,ts,tsx}' --fix --color && stylelint 'components/**/*.less' --syntax less --fix --color"
  },
```

## react + ts 环境搭建

**安装 react 相关依赖**

`yarn add react react-dom classnames @types/react @types/react-dom @types/classnames -D`

**添加 TypeScriipt**

`yarn add typescript -D`

新建`tsconfig.json`并写入以下内容

```
{
  "compilerOptions": {
    "baseUrl": "./",
    "target": "esnext",
    "module": "commonjs",
    "jsx": "react",
    "declaration": true,
    "declarationDir": "lib",
    "strict": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  },
  "include": ["components", "global.d.ts"],
  "exclude": ["node_modules","components/**/docs"]
}

```

在搭建中遇到报错收集：

1. WARNING: You are currently running a version of TypeScript which is not officially supported by @typescript-eslint/typescript-estree.

   You may find that it works just fine, or you may not.

   SUPPORTED TYPESCRIPT VERSIONS: >=3.3.1 <3.8.0

   YOUR TYPESCRIPT VERSION: 3.9.3

   typescript 版本依赖问题，最后降级 3.7.5

1. React version not specified in eslint-plugin-react settings.

   在`.eslintrc.js`文件中设置 react 版本

   ```
     ...
   	settings: {
   		react: {
   			version: '16.13.1',
   		},
   	}
   ```
