## Installation

```sh
yarn add reinventing-wheels/h
```

## Usage

```tsx
// example.tsx
import { Component, render, h } from 'h'

const Head: Component<{ title: string }> = props => <head>
  <title>{ props.title }</title>
</head>

const Body: Component<{ title: string, content: string }> = props => <body>
  <h1>{ props.title }</h1>
  <p>{ props.content }</p>
</body>

const Page: Component<{ title: string, content: string }> = props => <html>
  <Head { ...props } />
  <Body { ...props } />
</html>

const vdom = <Page title='foo' content='bar' />
const html = '<!doctype html>' + render(vdom)
```

```js
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "h"
  }
}
```
