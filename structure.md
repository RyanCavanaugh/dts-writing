# Structuring: Overview

Broadly speaking, the way you *structure* your definition file depends on how the library is consumed.
There are many ways of offering a library for consumption in JavaScript,
  and you'll need to write your definition file to match it.
This guide covers how to identify common library patterns,
  and how to write definition files which correspond to that pattern.

# Identifying Kinds of Libraries

First, we'll review the kinds of libraries TypeScript definition files can represent.
We'll briefly show how each kind of library is *used*,
  how it is *written*,
  and list some example libraries from the real world.

Identifying the structure of a library is the first step in writing its definition file.
We'll give hints on how to identify structure both based on its *usage* and its *code*.
Depending on the library's documentation and organization, one might be easier than the other.
We recommend using whichever is more comfortable to you.

## *global*

A *global* library is one that can be accessed from the global scope (i.e. without using any form of `import`).
Many libraries simply expose one or more global variables for use.
For example, if you were using jQuery, the `$` variable can be used by simply referring to it:
```ts
$(() => { console.log('hello!'); } );
```

You'll usually see guidance in the documentation of a global library of how to use the library in a script tag:
```html
    <script src="http://a.great.cdn.for/someLib.js"></script>
```

Today, most popular globally-accessible libraries are actually written as UMD libraries (see below).
UMD library documentation is hard to distinguish from global library documentation.
Before writing a global definition file, make sure the library isn't actually UMD.

### Identifying a Global Library from Code

Global library code is usually extremely simple.
A global "Hello, world" library might look like this:
```js
function createGreeting(s) {
	return 'Hello, ' + s;
}
```
or like this:
```js
window.createGreeting = function(s) {
	return 'Hello, ' + s;
}
```

When looking at the code of a global library, you'll usually see:

 * Top-level `var` statements or `function` declarations
 * One or more assignments to `window.someName`
 * Assumptions that DOM primitives like `document` or `window` exist

You *won't* see:

  * Checks for, or usage of, module loaders like `require` or `define`
  * CommonJS/nodejs-style imports of the form `var fs = require('fs');`
  * Calls to `define(...)`
  * Documentation describing how to `require` the library

### Examples of Global Libraries

Because it's usually easy to turn a global library into a UMD library,
  very few popular libraries are still written in the global style.
However, libraries that are small and require the DOM (or have *no* dependencies) may still be global.

*TODO: Add some examples anyway*

## *module*

Some libraries only work in a module loader environment.
For example, because `express` only works in NodeJS,
  it must be loaded using the CommonJS `require` function.

ECMAScript 2016 (also known as ES2015, ECMAScript 6, ES6), CommonJS, and RequireJS have similar notions of *importing* a *module*.
In JavaScript CommonJS (nodejs), for example, you would write
```ts
var fs = require('fs');
```
In TypeScript or ES6, the `import` keyword serves the same purpose:
```ts
import fs = require('fs');
```

You'll typically see module libraries include one of these lines in their documentation:
```js
var someLib = require('someLib');
```
or
```ts
define(..., ['someLib'], function(someLib) {
	
});
```

As with global modules, you might see these examples in the documentation of a UMD module,
  so be sure to check the code or documentation.

### Identifying a Module Library from Code

Module libraries will typically have at least some of the following:

 * Unconditional calls to `require` or `define`*
 * Declarations like `import * as a from 'b';` or `export c;`
 * Assignments to `exports` or `module.exports`

They will rarely have:

 * Assignments to properties of `window` or `global`

### Examples of Module Libraries

Many popular nodejs libraries are in the module family, such as:

 * express
 * TODO: More!

## *UMD*

A *UMD* module is one that can *either* be used as module (through an import),
  or as a global (when run in an environment without a module loader).
Many popular libraries, such as `moment`, are written this way.
For example, in nodejs, you would write:
```ts
import moment = require('moment');
console.log(moment.format());
```
whereas in a vanilla browser environment you would write:
```ts
console.log(moment.format());
```

### Identifying a UMD library

TODO: Link to UMD page

UMD modules check for the existence of a module loader environment.
This is an easy-to-spot pattern that looks like this:
```js
TODO: fill in
```

If you see tests for `typeof require` or `typeof define` in the code of a library,
  especially at the top of the file,
  it's almost always a UMD library.

### Examples of UMD libraries

 * moment
 * TODO: More!

## *Global-modifying Libraries*

A *Global-modifying Libraries* alter existing values in the global scope when the are `import`ed.
For example, there might exist a library which adds new members to `String.prototype` when imported.
This pattern is somewhat dangerous due to the possibility of runtime conflicts,
  but we can still write a definition file for it.

## *Module Plugin* or *UMD Plugin*

A *module plugin* changes the shape of another module (either UMD or module).
For example, `moment-range` adds a new `range` method to the `moment` object.

### Sidebar: The Impact of ES6 on Module Plugins

Some plugins add or modify top-level exports on existing modules.
While this is legal in CommonJS and other loaders,
  ES6 modules are considered immutable and this pattern will not be possible.
Because TypeScript is loader-agnostic, there is no compile-time enforcement of this policy,
  but developers intending to transition to an ES6 module loader should be aware of this.

### *Global Plugin*

A *global plugin* is global code that changes the shape of some global.
In general these are written identically as normal global code,
  so this document won't call them out specifically unless needed.

## Structuring Patterns for Library Shapes

## Structuring Patterns for Types

Additionally, you'll need to write your definition file slightly differently depending on what kind of object is being represented.

### TODO: Write a ton of these...

#### Sidebar: The Impact of ES6 on Top-level Call Signatures

Many popular libraries, such as `express`, expose themselves as a callable function when imported.
For example, the typical `express` usage looks like this:
```ts
import exp = require('express');
var app = exp();
```
In ES6 module loaders, the top-level object (here imported as `exp`) can only have properties;
  the top-level module object is *never* callable.
The most common solution here is to define the `default` export as the callable object;
  some module loader shims will automatically detect this situation and replace the top-level
  object with the `default` export.

## Dependencies

There are several kinds of dependencies you might have.

### Module dependencies

### Dependencies on Global Libraries

If your library depends on a global library, use a `/// <reference types=` directive:
```ts
/// <reference types="someLib" />

function getThing(): someLib.thing;
```
This syntax is the same regardless if your library is global, a module, or UMD

### Depenencies on Modules

If your library depends on a module, use an `import` statement:
```ts
import * as moment from 'moment';

function getThing(): moment;
```

### Dependencies on UMD libraries

#### From a Global Library

If your global library depends on a UMD module, use a `/// <reference types` directive:
```ts
/// <reference types="moment" />

function getThing(): moment;
```

### From a Module or UMD Library

If your module or UMD library depends on a UMD library, use an `import` statement:
```ts
import * as someLib from 'someLib';
```
Do *not* use a `/// <reference` directive to declare a UMD dependency unless your library is global!

## Discouraged Patterns

TODO: Write about bad things
