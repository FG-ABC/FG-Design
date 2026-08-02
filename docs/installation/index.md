- In local ~/.npmrc

```Bash
//npm.pkg.github.com/:_authToken= something
```

- In local ~/.zshrc

```Bash
export NODE_AUTH_TOKEN = something
```

- In project .npmrc
  @fg-abc:registry=https://npm.pkg.github.com

- In project vercel.json

```js
{
  "installCommand": "npm config set //npm.pkg.github.com/:_authToken $NODE_AUTH_TOKEN && npm install"
}

```

- In Vercel projects

```Bash
NODE_AUTH_TOKEN = something
```

- Updating

```Bash
npm update fg-design
```
