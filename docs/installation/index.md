# How to install @fg-abc/ui

## 1. Generate a classic GitHub PAT

Go to **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)** and generate a token with the `read:packages` scope.

> Fine-grained tokens do not work with GitHub Packages.

## 2. Add the token to your environment

For local development, add to your shell profile or `.env.local`:

```bash
FGD_GITHUB_TOKEN=<your-classic-PAT>
```

For Vercel, add `FGD_GITHUB_TOKEN` under **Project Settings → Environment Variables**.

## 3. Add `.npmrc` to the consuming project root

```
@fg-abc:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${FGD_GITHUB_TOKEN}
```

## 4. Add the dependency to `package.json`

```json
"@fg-abc/ui": "^0.1.0"
```

## 5. Install

```bash
npm install
```
