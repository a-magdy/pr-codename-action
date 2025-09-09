# PR Codename Generator

[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

A fun GitHub Action that generates unique codenames for your pull requests and posts them as comments! 🎉

Add some personality to your PRs with randomly generated codenames like "Silent Pancake" or "Cosmic Jaguar". This action helps teams create a more engaging and memorable experience when working with pull requests.

## What it does

This action:

- 🎲 Generates a random codename by combining an adjective and a noun
- 💬 Posts the codename as a comment on the pull request
- 🎨 Allows customization of adjective and noun lists
- 📤 Outputs the codename for use in other workflow steps

## Quick Start

Add this action to your workflow to automatically generate codenames for new pull requests:

```yaml
name: PR Codename
on:
  pull_request:
    types: [opened]

jobs:
  codename:
    runs-on: ubuntu-latest
    steps:
      - name: Generate PR Codename
        uses: a-magdy/pr-codename-action@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `adjectives` | Comma-separated list of adjectives | No | `Silent,Cosmic,Quantum,Hidden,Electric,Golden,Lunar,Crimson` |
| `nouns` | Comma-separated list of nouns | No | `Pancake,Jaguar,Llama,Storm,Voyager,River,Mirage,Tsunami` |
| `github-token` | GitHub token for posting comments | Yes | - |

## Outputs

| Output | Description |
|--------|-------------|
| `codename` | The generated codename (e.g., "Silent Pancake") |

## Examples

### Basic Usage

```yaml
- name: Generate PR Codename
  uses: a-magdy/pr-codename-action@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
```

### Custom Word Lists

```yaml
- name: Generate PR Codename
  uses: a-magdy/pr-codename-action@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    adjectives: 'Swift,Mighty,Brilliant,Stealthy,Fierce'
    nouns: 'Eagle,Tiger,Phoenix,Dragon,Wolf'
```

### Using the Output

```yaml
- name: Generate PR Codename
  id: codename
  uses: a-magdy/pr-codename-action@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}

- name: Use the codename
  run: echo "The codename is ${{ steps.codename.outputs.codename }}"
```

## Sample Output

When this action runs, it will post a comment on your pull request like:

> 🎉 Your codename for this PR is: **Cosmic Jaguar**

## Requirements

- This action must be run in the context of a pull request
- Requires a GitHub token with permission to post comments (typically `secrets.GITHUB_TOKEN`)

## Contributing

This action is built with TypeScript and uses the GitHub Actions Toolkit. To contribute:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Make your changes to the TypeScript source in `src/`

3. Add tests in `__tests__/` for any new functionality

4. Build and test:

   ```bash
   npm run all
   ```

5. The action will be automatically bundled to `dist/` when you run the build

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please [open an issue](../../issues) on GitHub.
