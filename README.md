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
```
import { parse } from 'rosz2js';

parse('/absolute/path/to/battlescribe/rosterfile.rosz').then((output) => {
  console.log(output); // Javascript representation of above roster file
});
```

