# Structuring

Broadly speaking, the way you *structure* your definition file depends on how the library is consumed.
There are many ways of offering a library for consumption in JavaScript,
  and you'll need to write your definition file to match it.

## Kinds of Libraries

Let's define the kinds of libraries TypeScript definition files can represent.

### *global*

A *global* library is one that can be accessed from the global scope (i.e. without using any form of `import`).
Many libraries simply expose one or more global variables for use.
For example, if you were using jQuery, the `$` variable can be used by simply referring to it:
```ts
$(() => { console.log('hello!'); } );
```

Today, most popular globally-accessible libraries are actually written as UMD libraries (see below).
Before writing a global definition file, make sure the library isn't actually UMD.

### *module*

ES6, CommonJS, and RequireJS have similar notions of *importing* a *module*.
In JavaScript CommonJS (nodejs), for example, you would write
```ts
var fs = require('fs');
```
In TypeScript or ES6, the `import` keyword serves the same purpose:
```ts
import fs = require('fs');
```

### *UMD*

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

### *Global-modifying Modules*

A *Global-modifying Modules* alter existing values in the global scope when the are `import`ed.
For example, there might exist a library which adds new members to `String.prototype` when imported.
This pattern is somewhat dangerous due to the possibility of runtime conflicts,
  but we can still write a definition file for it.

### *Module Plugin* or *UMD Plugin*

A *module plugin* changes the shape of another module (either UMD or module).
For example, `moment-range` adds a new `range` method to the `moment` object.

#### Sidebar: The Impact of ES6 on Module Plugins

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
