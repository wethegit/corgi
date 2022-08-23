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

(the dot indicates the current working directory).  
You'll be prompted to enter an optional template repo — more on that later.

---

## Commands

### `project`

Sets up a Corgi project.  
Usage:

```sh
corgi project
```

You'll be prompted to enter a project directory and an optional project template URL.  
You can skip these prompts by entering them in the inital command, like so:

```sh
corgi project my-awesome-web-app --template https://github.com/<user>/<repo>/tree/<branch>
```

#### Options

##### `--template, -t`

Specify an optional URL which points to a Github repo and branch containing a Corgi template.  
Example: `https://github.com/<user>/<repo>/tree/<branch>`

#### Custom config

If using a custom template, the command will look for an optional JSON file located the root of the template repo, called `corgi-project.config.json`.  
This config file can include overrides for the project, such as NPM dependencies, scripts, and a project name. The default Corgi config settings look like this:

```js
  name: "corgi-project",
  dependencies: {},
  devDependencies: {},
  scripts: {},
```

You can overwrite any of these properties from within your template's `corgi-project.config.json`, like so:

```json
{
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
