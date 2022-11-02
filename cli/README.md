# Corgi CLI

Tools for streamlining common tasks on corgi projects.

- [Installation](#installation-optional)
- [Quick-start](#quick-start)
- [Commands](#commands)
  - [project](#project)
  - [page](#page)
  - [component](#component)
- [Contributing](#contributing)

---

## Installation (optional)

You can install this command globally if needed. In most cases, it's recommended to use `npx` (read on).

```sh
npm install -g @corgi/cli
```

---

## Quick-start

From your command line, `cd` into an empty project directory and run:

```sh
npx corgi project .
```

(the dot indicates the current working directory).  
You'll be prompted to enter an optional template repo — more on that later.

---

## Commands

### `project`

Sets up a Corgi project.  
Basic usage:

```sh
corgi project
```

| Arguments | Description                                                                                                         |
| --------- | ------------------------------------------------------------------------------------------------------------------- |
| directory | Relative directory to create the project in. If you do not pass a directory argument, you will be prompted for one. |

#### Options

| Flag       | Short flag | Description                                                                                                                                                                                                           |
| ---------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --template | -t         | Optional. URL of a Github repo's branch containing a Corgi template. Example: `https://github.com/<user>/<repo>/tree/<branchname>`. If you do not pass this flag, you will be prompted to enter an optional template. |
| --help     | -h         | Displays a list of arguments and options.                                                                                                                                                                             |

#### Examples:

```sh
corgi project my-awesome-web-app
```

```sh
corgi project my-awesome-web-app --template https://github.com/<user>/<repo>/tree/<branch>
```

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

### `page`

Sets up a page component and locale data files in a Corgi project. Must be executed from the root of the project directory.  
Basic usage:

```sh
corgi page
```

| Arguments | Description                                                                                                                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| name(s)   | A space-separated list of page component names. If you do not pass any name arguments, you will be prompted to enter a page component name. |

#### Options

| Flag      | Short flag | Default value | Description                                       |
| --------- | ---------- | ------------- | ------------------------------------------------- |
| --locales | -l         | `en`          | Optional. A space-separated list of locale slugs. |
| --help    | -h         |               | Displays a list of arguments and options.         |

#### Examples:

```sh
corgi page About
```

```sh
corgi page About --locales en es fr pt
```

```sh
corgi page About Contact Work Blog  --locales en-us es-mx fr-ca
```

### `component`

Sets up one or multiple new React components within a Corgi app. Includes a `.scss` module file for each. Must be executed from the root of the project directory.
Basic usage:

```sh
corgi component
```

| Arguments | Description                                                                                                                       |
| --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| name(s)   | A space-separated list of component names. If you do not pass any name arguments, you will be prompted to enter a component name. |

#### Options

| Flag   | Short flag | Description                               |
| ------ | ---------- | ----------------------------------------- |
| --help | -h         | Displays a list of arguments and options. |

#### Examples:

```sh
corgi component ToggleButton
```

```sh
corgi component ToggleButton Pagination TabbedList
```

---

## Contributing

For local development, you'll want to:

- Clone this repo, and branch off `dev`, using the appropriate Git Flow naming convention.
- `cd` into the `cli` directory, and run `npm install`.
- Run `npm link` to create a symlink to the corgi executable.
- Create an empty test project somewhere else on your machine, and run `npm link @corgi/cli`.
- You can now make changes to the corgi codebase and see them reflected in your test project.
