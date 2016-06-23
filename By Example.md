# Definition Files by Example

## Introduction

The purpose of this guide is to teach you how to write a high-quality definition file.
This guide is structured by showing an example *usage* and *documentation*,
  and explaining how to write the corresponding declaration.

These examples are ordered in approximately increasing order of complexity.

<!-- vvvvvvvvvvvvvvvv DO NOT EDIT THIS BLOCK! Run 'doctoc --notitle by-example.md' ! vvvvvvvvvvvvvvv -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [The Examples](#the-examples)
  - [Global variable](#global-variable)
  - [Global function](#global-function)
  - [Object with Properties](#object-with-properties)
  - [Overloaded function](#overloaded-function)
  - [Reusable Types (Global)](#reusable-types-global)
  - [Classes](#classes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- ^^^^^^^^^^^^^^^^ DO NOT EDIT THIS BLOCK! Run 'doctoc --notitle by-example.md' ! ^^^^^^^^^^^^^^^ -->

## The Examples

### Global variables

*Documentation*
> The global variable `foo` contains the number of widgets present.

*Code*
```ts
console.log('Half the number of widgets is ' + (foo / 2));
```

*Declaration*
Use `declare var` to declare variables.
If the variable is read-only, you can use `declare const`.
You can also use `declare let` if the variable is block-scoped.
```ts
/** The number of widgets present */
declare var foo: number;
```

### Global functions

*Documentation*
> You can invoke the function `greet` with a string to show a greeting to the user.

*Code*
```
greet('hello, world');
```

*Declaration*

Use `declare function` to declare functions.
```ts
declare function greet(greeting: string): void;
```

### Objects with Properties

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

Use `declare namespace` to describe types or values accessed by dotted notation.
```ts
declare namespace myLib {
    function makeGreeting(s: string): string;	
    let numberOfGreetings: number;
}
```

### Overloaded functions

*Documentation*
> The `getWidget` function accepts a number and return a Widget, or accepts a string and returns a Widget array

*Code*
```ts
let x: Widget = getWidget(43);
let arr = getWidget('all of them'); // arr: Widget[]
```

*Declaration*
```ts
declare function getWidget(n: number): Widget;
declare function getWidget(s: string): Widget[];
```

### Reusable Types (interfaces)

*Documentation*
> When specifying a greeting, you must pass a GreetingSettings object.
> This object has the following properties:
>  * greeting: Mandatory string
>  * duration: Optional length of time (in milliseconds)
>  * color: Optional string, e.g. '#ff00ff'

*Code*
```ts
greet({
  greeting: 'hello world',
  duration: 4000
});
```

*Declaration*

Use `interface` to define a type with properties.
```ts
interface GreetingSettings {
  greeting: string;
  duration?: number;
  color?: string;
}
declare function greet(setting: GreetingSettings): void;
```

### Reusable Types (type aliases)

*Documentation*
> Anywhere a greeting is expected, you can provide a `string`,
> a function returning a `string`, or a `Greeter` class.

*Code*
```ts
function getGreeting() {
    return 'howdy';
}
class MyGreeter extends Greeter { }

greet('hello');
greet(getGreeting);
greet(new MyGreeter());
```

*Declaration*

You can use a type alias to make a shorthand for a type:
```ts
type GreetingLike = string | (() => string) | Greeting;

declare function greet(g: GreetingLike): void;
```

### Classes

*Documentation*
> You can create a greeter by instantiating the `Greeter` object,
> or create a customized greeter by extending from it.

*Code*
```ts
const myGreeter = new Greeter('hello, world');
myGreeter.greeting = 'howdy';
myGreeter.showGreeting();

class SpecialGreeter extends Greeter {
    constructor() {
        super('Very special greetings');
    }
}
```

*Declaration*
Use `declare class` to describe a class or classlike object.
Classes can have properties and methods as well as a constructor.
```ts
declare class Greeter {
    constructor(greeting: string);

    greeting: string;
    showGreeting(): void;
}
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
