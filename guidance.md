# Do's and Don'ts

## General Types

### `Number`, `String`, `Boolean`, and `Object`

*Don't* ever use the types `Number`, `String`, `Boolean`, or `Object`. These types refer to non-primitive boxed objects that are almost never used appropriately in JavaScript code.

*Do* use the types `number`, `string`, and `boolean`.

If you're tempted to use the type `Object`, consider using `any` instead. All types are compatible with `Object`. <!--(Revisit if/when #1809 is implemented)-->

## Generics

*Don't* ever have a generic type which doesn't use its type parameter.
TODO: Link to FAQ

TODO: More

## Callback Types

### Return Types of Callbacks

*Don't* use the return type `any` for callbacks whose value you will discard:
```ts
function fn(x: () => any) {
	x();
}
```

*Do* use the return type `void` for callbacks whose value you will discard:
```ts
function fn(x: () => void) {
	x();
}
```

*Why*: Using `void` is safer because it prevents you from accidently using the return value of `x` in an unchecked way:
```ts
function fn(x: () => void) {
	var k = x(); // oops! meant to do something else
	k.doSomething(); // error, but would be OK if the return type had been 'any'
}
```

### Optional Parameters in Callbacks

*Don't* use optional parameters in callbacks unless you really mean it:
```ts
interface Fetcher {
	getObject(done: (data: any, elapsedTime?: number) => void): void;
}
```
This has a very specific meaning: the `done` callback might be invoked with 1 argument or might be invoked with 2 arguments. The author probably intended to say that the callback might not care about the `elapsedTime` parameter, but there's no need to make the parameter optional to accomplish this -- it's always legal to provide a callback that accepts fewer arguments.

*Do* write callback parameters as non-optional:
```ts
interface Fetcher {
	getObject(done: (data: any, elapsedTime: number) => void): void;
}
```

### Overloads and Callbacks

*Don't* write separate overloads that differ only on callback arity:
```ts
declare function beforeAll(action: () => void, timeout?: number): void;
declare function beforeAll(action: (done: DoneFn) => void, timeout?: number): void;
```

*Do* write a single overload with the correct arity:
```ts
declare function beforeAll(action: (done: DoneFn) => void, timeout?: number): void;
```

*Why*: It's always legal for a callback to disregard a parameter, so there's no need for the shorter overload.


## Function Overloads

### Ordering

*Don't* put more general overloads before more specific overloads:
```ts
declare function fn(x: any): any;
declare function fn(x: HTMLElement): number;
declare function fn(x: HTMLDivElement): string;

var myElem: HTMLDivElement;
var x = fn(myElem); // x: any, wat?
```

*Do* sort overloads by putting the more general signatures after more specific signatures:
```ts
declare function fn(x: HTMLDivElement): string;
declare function fn(x: HTMLElement): number;
declare function fn(x: any): any;

var myElem: HTMLDivElement;
var x = fn(myElem); // x: string, :)
```

*Why*: TypeScript chooses the *first matching overload* when resolving function calls. When an earlier overload is "more general" than a later one, the later one is effectively hidden and cannot be called.

### Use Optional Parameters

*Don't* write several overloads that differ only in trailing parameters:
```ts
interface Moment {
    diff(b: MomentComparable): number;
    diff(b: MomentComparable, unitOfTime: string): number;
    diff(b: MomentComparable, unitOfTime: string, round: boolean): number;
}
```

*Do* use optional parameters whenever possible:
```ts
interface Moment {
    diff(b: MomentComparable, unitOfTime?: string, round?: boolean): number;
}
```

Note that this collapsing should only occur when all overloads have the same return type.

*Why*: This is important for two reasons.

TypeScript resolves signature compatibility by seeing if any signature of the target can be invoked with the arguments of the source, *and extraneuous arguments are allowed*.
This code, for example, exposes a bug only when the signature is correctly written using optionals:
```ts
function fn(x: (a: string, b: number, c: number) => void) { }
var x: Moment;
// When written with overloads, OK -- used first overload
// When written with optionals, correctly an error
fn(x.diff);
```

The second reason is when a consumer uses the "strict null checking" feature of TypeScript. Because unspecified parameters appear as `undefined` in JavaScript, it's usually fine to pass an explicit `undefined` to a function with optional arguments.
This code, for example, should be OK under strict nulls:
```ts
var x: Moment;
// When written with overloads, incorrectly an error because of passing 'undefined' to 'string' 
// When written with optionals, correctly OK
x.diff(something, someOtherThing ? undefined : "hour");
```


### Use Union Types

*Don't* write overloads that differ by type in only one argument position:
```ts
interface Moment {
    utcOffset(): number;
    utcOffset(b: number): Moment;
    utcOffset(b: string): Moment;
}
```

*Do* use union types whenver possible:
```ts
interface Moment {
    utcOffset(): number;
    utcOffset(b: number|string): Moment;
}
```

Note that we didn't make `b` optional here because the return types of the signatures differ.

*Why*: This is important for people who are "passing through" a value to your function:
```ts
function fn(x: string): void;
function fn(x: number): void;
function fn(x: number|string) {
	// When written with separate overloads, incorrectly an error
	// When written with union types, correctly OK
	return moment().utcOffset(x);
}
```


# Introduction

The purpose of this guide is to teach you how to write a high-quality definition file.
This guide is structured by showing an example *usage* and explaining how to write the corresponding declaration.

## A Word on Approach

The best way to write a definition file is by reading the documentation for the underlying library.
This will allow you to write better names for types and variables, and avoid accidently documenting non-public API surface.

# Definition Files By Example

In each example, we'll begin with either example prose from the documentation, or a code sample of a valid call.

> Prose from the documentation will be formatted like this

and

> `example.code("will be formatted", "like this");`

```ts
// Definition file code will be formatted like this
```

## Global variable

> The global variable `foo` contains the number of widgets present

```ts
/** The number of widgets present */
declare var foo: number;
```

## Global function

> `greet('hello, world');`

```ts
declare function greet(greeting: string): void;
```

## Object with properties

> `var result = myLib.makeGreeting('hello, world');`
> `console.log('The computed greeting is:' + result);`
> `var count = myLib.numberOfGreetings;`

```ts
declare namespace myLib {
    function makeGreeting(s: string): string;	
    let numberOfGreetings: number;
}
```

## Overloaded function

> The `getWidget` function accepts a number and return a Widget, or accepts a string and returns a Widget array

```ts
declare function getWidget(n: number): Widget;
declare function getWidget(s: string): Widget[];
```

