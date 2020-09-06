<p align="center">
  <img src="https://github.com/githug/images/blob/master/rosz2js.png?raw=true" alt="Rosz2JS">
</p>

[![Build Status](https://travis-ci.org/GitHug/rosz2js.svg?branch=master)](https://travis-ci.org/GitHug/rosz2js)

# rosz2js
Convert Battlescribe roster files (.rosz) to Javascript. Written in Typescript and it supports it fully.

## Installation
```
npm install rosz2js
```
or
```
yarn add rosz2js
```
## Usage
The parser accepts either an absolute file path to a roster file or a buffer of a roster file.

```
import parser from 'rosz2js';

parser.parse('/absolute/path/to/battlescribe/rosterfile.rosz').then((output) => {
  console.log(output); // Javascript representation of above roster file
});
```

