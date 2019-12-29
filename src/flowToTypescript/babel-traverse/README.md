# NOTE

This is a modified version of @babel/traverse that validation when calling
path.replaceWith().  This allows us to replace flow type annotation nodes in
an AST with typescript ones.

TODO: make this configurable and create a PR for this change.

# @babel/traverse

> The Babel Traverse module maintains the overall tree state, and is responsible for replacing, removing, and adding nodes

See our website [@babel/traverse](https://babeljs.io/docs/en/next/babel-traverse.html) for more information or the [issues](https://github.com/babel/babel/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3A%22pkg%3A%20traverse%22+is%3Aopen) associated with this package.

## Install

Using npm:

```sh
npm install --save-dev @babel/traverse
```

or using yarn:

```sh
yarn add @babel/traverse --dev
```