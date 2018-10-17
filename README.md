This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can find the most recent version of this guide [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Installation
Run the following command:

```
npm install git+https://github.com/paduvi/techpago.design.git
``` 

or 

```
yarn add git+https://github.com/paduvi/techpago.design.git
```

(Optional) Add in `index.html` to use `RichTextEditor`:

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```
## Usage

```javascript
import {RichTextEditor} from "@techpago/design";
// or
import RichTextEditor from "@techpago/design/dist/RichTextEditor"; // this way better

const onChange = (value) => {
    console.log(value);
}

<RichTextEditor defaultValue="Hello world" onChange={onChange} />
```

For shorter code, you can using `babel-plugin-import`:

```
// .babelrc
"plugins": [
  ["import", { "libraryName": "@techpago/design", "libraryDirectory": "dist", "camel2DashComponentName": false}, "@techpago/design"]
]
```

```
import { RichTextEditor } from '@techpago/design';
ReactDOM.render(<RichTextEditor/>);
 
      ↓ ↓ ↓ ↓ ↓ ↓
      
var RichTextEditor = require('@techpago/design/dist/RichTextEditor');
ReactDOM.render(<RichTextEditor/>);
```

## List of Components

- LoadingScreen
- NotFound
- MarkdownEditor
- RichTextEditor

## Demo

[Demo](http://demo.techpago.com/)

Or you can clone this repo from git and run:
```
git clone https://github.com/paduvi/techpago.design.git
cd techpago.design
npm install
npm run start
```
