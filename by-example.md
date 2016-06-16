# Definition Files by Example

## Introduction

The purpose of this guide is to teach you how to write a high-quality definition file.
This guide is structured by showing an example *usage* and *documentation*,
  and explaining how to write the corresponding declaration.

These examples are ordered in approximately increasing order of complexity.

<!-- vvvvvvvvvvvvvvvv DO NOT EDIT THIS BLOCK! Run 'doctoc' ! vvvvvvvvvvvvvvv -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [The Examples](#the-examples)
  - [Global variable](#global-variable)
  - [Global function](#global-function)
  - [Object with Properties](#object-with-properties)
  - [Overloaded function](#overloaded-function)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- ^^^^^^^^^^^^^^^^ DO NOT EDIT THIS BLOCK! Run 'doctoc' ! ^^^^^^^^^^^^^^^ -->

## The Examples

### Global variable

*Documentation*
> The global variable `foo` contains the number of widgets present.

*Code*
```ts
console.log('Half the number of widgets is ' + (foo / 2));
```

*Declaration*
```ts
/** The number of widgets present */
declare var foo: number;
```

### Global function

*Documentation*
> You can invoke the function `greet` with a string to show a greeting to the user.

*Code*
```
greet('hello, world');
```

*Declaration*
```ts
declare function greet(greeting: string): void;
```

### Object with Properties

*Documentation*
> The global variable `myLib` has a function `makeGreeting` for creating greetings,
> and a property `numberOfGreetings` indicating the number of greetings made so far.

*Code*
```ts
var result = myLib.makeGreeting('hello, world');
console.log('The computed greeting is:' + result);
var count = myLib.numberOfGreetings;
```

*Declaration*
```ts
declare namespace myLib {
    function makeGreeting(s: string): string;	
    let numberOfGreetings: number;
}
```

### Overloaded function

> The `getWidget` function accepts a number and return a Widget, or accepts a string and returns a Widget array

```ts
declare function getWidget(n: number): Widget;
declare function getWidget(s: string): Widget[];
```

<!-- Template

### 

*Documentation*
> 

*Code*
```ts

```

*Declaration*
```ts

```


-->
