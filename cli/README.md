# Corgi CLI

Tools for streamlining common tasks on corgi projects.

- [Installation](#installation-optional)
- [Quick-start](#quick-start)
- [Commands](#commands)
- [Contributing](#contributing)

---

## Installation (optional)

You can install this command globally if needed. In most cases, it's recommended to use `npx` (read on).

```sh
npm install -g @corgi/cli
```

---

## Quick-start

From your command line, `cd` into an ampty project directory and run:

```sh
npx corgi project .
```

(the dot indicates the current working directory)

---

## Commands

### `project`

Sets up a Corgi project.  
Usage:

```sh
corgi project
```

With options:

```sh
corgi project my-project-directory --use-config
```

The `--use-config` (or `-c`) option will look for a JSON file called `corgi-project.config.json` in your project's directory, which can include some overrides for the project. The default Corgi config settings look like this:

```js
  name: "corgi-project",
  dependencies: {},
  devDependencies: {},
  scripts: {},
```

You can overwrite all of these properties from within your `corgi-project.config.json`, and also add an optional `templateURL` which points to a Github repo and branch containing a Corgi template. Example of a custom `corgi-project.config.json`:

```json
{
  "templateURL": "https://github.com/wethegit/wtc-next-starter/tree/test/corgi-template",
  "name": "andrews-corgi-test-project",
  "dependencies": {},
  "devDependencies": {
    "eslint": "8.8.0",
    "eslint-config-next": "12.0.10",
    "eslint-config-prettier": "~8.3.0",
    "sass": "~1.49.7",
    "stylelint": "~14.5.1",
    "stylelint-config-standard-scss": "~3.0.0",
    "stylelint-order": "~5.0.0"
  },
  "scripts": {
    "serve-https": "node https-server.js"
  }
}
```

---

## Contributing

For local development, you'll want to:

- Clone this repo, and branch off `dev`, using the appropriate Git Flow naming convention.
- `cd` into the `cli` directory, and run `npm install`.
- Run `npm link` to create a symlink to the corgi executable.
- Create an empty test project somewhere else on your machine, and run `npm link @corgi/cli`.
- You can now make changes to the corgi codebase and see them reflected in your test project.
