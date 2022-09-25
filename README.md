### Lab Notebook

- Yarn workspaces
- Next.js
- Express

### 1. create repository

```sh
mkdir monorepo-test
cd monorepo-test
yarn init -y
mkdir packages/frontend
```

### 2. install Next.js to `packages/frontend`

```sh
npx create-next-app --typescript packages/frontend @monorepo-test/frontend
```

### 3. clean up frontend package

```sh
cd packages/frontend
rm -rf .git node_modules yarn.lock
```

### 4. yarn workspace startup test

```sh
cd ../../ # => its projects root directory
yarn
yarn workspace @monorepo-test/frontend run dev
```

### 5. add backend service package that uses `express`

```sh
mkdir packages/backend
cd packages/backend
yarn init -y # => and rename name to `@monorepo-test/backend`
```

### 6. install `express`

```sh
cd ../../ # => its projects root directory
yarn workspace @monorepo-test/backend add express@latest --exact
```

### 7. create endpoint `app.js`

cf) https://expressjs.com/ja/starter/hello-world.html

- packages/backend/package.json
```json
  "scripts": {
    "dev": "node app.js"
  }
```

- package.json
```json
  "scripts": {
    "dev:frontend": "yarn workspace @monorepo-test/frontend run dev",
    "dev:backend": "yarn workspace @monorepo-test/backend run dev" // <= add
  }
```

### 8. Backend uses TypeScript

```sh
yarn workspace @monorepo-test/backend add -D @types/express @types/node ts-node typescript@4.8.3 --exact
```

Note that `typescript@4.8.3` uses frontend too. So I uses this version.

- move app.js to index.ts
- `script` change `node` to `ts-node`

### 9. `tsconfig.json` inheritance

| options                          | frontend | backend   | enable |
| -------------------------------- | -------- | --------- | ------ |
| target                           | es5      | es2016    |        |
| skipLibCheck                     | true     | true      | *      |
| strict                           | true     | true      | *      |
| forceConsistentCasingInFileNames | true     | true      | *      |
| noEmit                           | true     | - (false) |        |
| esModuleInterop                  | true     | false     |        |
| module                           | esnext   | commonjs  |        |
| moduleResolution                 | node     | - (?)     |        |
| resolveJsonModule                | true     | - (false) |        |
| isolatedModules                  | true     | - (false) |        |
| jsx                              | preserve | - (?)     |        |
| incremental                      | true     | - (false) |        |

Touch `./tsconfig.base.json` from previous tsconfig's build option.

And, each package touched `tsconfig.json` extends from base.json.

### 10. `.eslintrc.js` inheritance via monorepo's package

1. create `eslint-config` package directory in `packages`
2. `yarn init -y` and rename package name to `@monorepo-test/eslint-config`
  The reasons that adopt this name, please read https://eslint.org/docs/latest/developer-guide/shareable-configs
3. create `index.js` to configure eslint shareable config. I love these rules so I setted.
  - extends eslint recommended and prettier
  - `semi` to always
  - `quotes` to single
  - `comma-dangle` to always-multiline
  - `quote-props` to as-needed
4. install eslint, @typescript-eslint/parser and plugins to frontend and backend package
5. install `@monorepo-test/eslint-config` in frontend and backend via following command
  ```sh
  yarn workspace @monorepo-test/{frontend|backend} add -D @monorepo-test/eslint-config
  ```
6. extends each package from @monorepo-test/eslint-config
7. add `lint` script to backend package
