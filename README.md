# 💬 Chatter - XMTP App Template

Web3 App Template built using Next.js, Privy, Tailwind, XMTP, and more.

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](http://perso.crans.org/besson/LICENSE.html)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F0xchin%2Ftemplate-xmtp-app&project-name=Chatter&repository-name=xmtp-app&demo-title=Chatter&env=NEXTAUTH_SECRET&envDescription=How%20to%20get%20these%20env%20variables%3A&envLink=https%3A%2F%2Fgithub.com%2Fturbo-eth%2Ftemplate-web3-app%2Fblob%integrations%2F.env.example)

  

### [Documentation](https://docs.turboeth.xyz)

  

- Getting Started

- [Environment Variables](https://docs.turboeth.xyz/getting-started/environment)

- [JSON-RPC](https://docs.turboeth.xyz/getting-started/json-rpc)

- [WAGMI CLI](https://docs.turboeth.xyz/getting-started/wagmi-cli)

- [UI Components](https://docs.turboeth.xyz/getting-started/design-system)

- Core Integrations

- [🌈 Privy](https://docs.turboeth.xyz/integration/privy)
- [💬 XMTP](https://xmtp.org/)

  

#  Getting Started

  

The `pnpm` CLI is the recommended package manager but `npm` and `yarn` should work too.

  

```bash

pnpm  install

```

  

####  Development

  

```bash

pnpm  dev

```

  

####  Build

  

```bash

pnpm  build

```

  

###  Web3 Core

  

-  [WAGMI CLI](https://wagmi.sh/cli/getting-started) - Automatic React Hook Generation

-  [Privy](https://privy.io/) - Wallet connection manager

  

###  Web2 Frameworks

  

-  [Vercel](https://vercel.com/) - App Infrastructure

  

###  Developer Experience

  

-  [TypeScript](https://www.typescriptlang.org/) – Static type checker for end-to-end typesafety

-  [Prettier](https://prettier.io/) – Opinionated code formatter for consistent code style

-  [ESLint](https://eslint.org/) – Pluggable linter for Next.js and TypeScript

  

###  User Interface

  

-  [TailwindCSS](https://tailwindcss.com) – Utility-first CSS framework for rapid UI development

-  [Radix](https://www.radix-ui.com/) – Primitives like modal, popover, etc. to build a stellar user experience

-  [Framer Motion](https://www.framer.com/motion/) – Motion library for React to animate components with ease

-  [React Icons](https://react-icons.github.io/react-icons) – Beautifully simple, pixel-perfect icons

  

The [ui.shadcn.com](https://ui.shadcn.com) components are included in the `/components/shared/ui` folder.

  

#  💻 Developer Experience

  

###  🐕 What is husky

  

Husky improves your git commits.

  

You can use it to lint your commit messages, run tests, lint code, etc... when you commit or push. Husky supports all Git hooks.

  

####  🪝 Hooks

  

- pre-commit: lint app codebase

- commit-msg: apply commintlint

  

###  📋 What is commitlint

  

commitlint checks if your commit messages meet the [conventional commit format](https://conventionalcommits.org).

  

In general the pattern mostly looks like this:

  

```sh
type(scope?): subject #scope is optional; multiple scopes are supported (current delimiter options: "/", "\" and ",")
```

  

Real world examples can look like this:

  

```
chore: run tests on travis ci
```

  

```
fix(server): send cors headers
```

  

```
feat(blog): add comment section
```

  

Common types according to [commitlint-config-conventional (based on the Angular convention)](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum) can be:

  

- build

- chore

- ci

- docs

- feat

- fix

- perf

- refactor

- revert

- style

- test

  

#  Acknowledgements

  

Original template was forked from https://github.com/wslyvh/nexth

  

Thank you @wslyvh 🙏

  

<hr/>

  

Copyright 2023 [Kames Geraghty](https://twitter.com/KamesGeraghty)
