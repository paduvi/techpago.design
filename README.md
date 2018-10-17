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

const onChange = (value) => {
    console.log(value);
}

<RichTextEditor defaultValue="Hello world" onChange={onChange} />
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
