# SquaEditor

A rich text editor for [React](https://github.com/facebook/react), built around [Quill's Delta](https://github.com/quilljs/delta) to provide collaborative capabilities.

Inspired by [Draft.js](https://github.com/facebook/draft-js), [Quill](https://github.com/quilljs/quill) and [Slate](https://github.com/ianstormtaylor/slate).

## Installation

First, you have to install [Quill's Delta](https://github.com/quilljs/delta):

```
npm install --save quill-delta
```

Then, you can install the editor:

```
npm install --save squa-editor
```

## Quickstart

```jsx
import React, { PureComponent } from "react";
import Delta from "quill-delta";
import { Value, Editor } from "squa-editor";

const contents = new Delta().insert("Hello world!\n");
const value = Value.fromJSON({ contents });

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { value };
  }

  onChange = ({ value }) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return <Editor value={value} onChange={this.onChange} />;
  }
}
```

You can find more examples in the [documentation](packages/squa-editor/README.md).

## Licence

GNU LGPLv3
