# corgi docs

The corgi documentation site is built using [Docusaurus 2](https://docusaurus.io/).

## Commands

⚠️ The following commands should be run from the `/docs/` directory

### Installation

```bash
npm install
```

### Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```bash
npm run deploy
```

This command will build the website and push to the `gh-pages` branch, which subsequently deploys to Github pages.

## Contributing

For local development, you'll want to:

- Clone this repo, and branch off `dev`.
- `cd` into `/docs/` and make your changes.
- Make any pull requests against the `dev` branch.
