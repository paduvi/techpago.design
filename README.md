This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Installation
Run the following command:

```
npm install git+https://github.com/paduvi/react_shared_components.git
``` 

or 

```
yarn add git+https://github.com/paduvi/react_shared_components.git
```

(Optional) Add in `index.html` to use `RichTextEditor`:

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```
## Usage

```javascript
import {RichTextEditor} from "react_shared_components";

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
git clone https://github.com/paduvi/react_shared_components.git
cd react_shared_components
npm install
npm run start
```
