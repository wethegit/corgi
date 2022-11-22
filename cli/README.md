# corgi CLI

The corgi CLI provides a toolkit for quickly and easily setting up projects, pages, and components within a corgi project.

Check out the [corgi CLI documentation](https://wethegit.github.io/corgi/docs/category/corgi-cli).

## Contributing

For local development, you'll want to:

- Clone this repo, and branch off `dev`.
- `cd` into the `cli` directory, run `npm install`.
- Run `npm link` to create a symlink to the corgi executable.
- Create an empty test project somewhere else on your machine, and run `npm link @corgi/cli`.
- You can now make changes to the corgi codebase and see them reflected in your test project.
- Make any pull requests against the `dev` branch.
