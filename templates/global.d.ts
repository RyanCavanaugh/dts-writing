// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ If this library is callable (e.g. can be invoked as f(3)),
 *~ include those call signatures here.
 *~ Otherwise, delete this section
 */
declare function myLib(a: string): string;
declare function myLib(a: number): number;

/*~ If you want some types in the *global* namespace,
 *~ add them here. Don't add too many types here --
 *~ consider placing them in the 'namespace' block below.
 *~ Usually, you should delete this section and put
 *~ types in the namespace.
 */
interface myLib {
	name: string;
	length: number;
	extras?: string[];
}

/*~ If your library has properties exposed on a global variable, place them here.
 *~ You should also place types (interfaces and type alias) here.
 */
declare namespace myLib {
	//~ We can write 'myLib.timeout = 50;'
	let timeout: number;

	//~ We can access 'myLib.version', but not change it
	const version: string;

	//~ There's some class we can create via 'let c = new myLib.Cat(42)'
	class Cat {
		constructor(n: number);

		//~ We can read 'c.age' from a 'Cat' instance
		readonly age: number;

		//~ We can invoke 'c.purr()' from a 'Cat' instance
		purr(): void;
	}

	//~ We can declare a variable 'var s: CatSettings = { weight: 5, name: "Maru" };'
	interface CatSettings {
		weight: number;
		name: string;
		tailLength?: number;
	}

	//~ We can write 'const v: VetID = 42;' or 'const v: VetID = "bob";'
	type VetID = string | number;

	//~ We can invoke 'myLib.checkCat(c)' or 'myLib.checkCat(c, v);'
	function checkCat(c: Cat, s?: VetID);
}


