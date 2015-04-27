Try Until
=========

A small library providing an utility method to perform safe intervals.

## Installation

```
npm install @skyrpex/tryuntil --save
```

## Usage

```javascript
import tryUntil from "@skyrpex/tryuntil";
tryUntil(done => {
	if ("something" in global) {
		done(global.something);
	}
});
```

```javascript
import tryUntil from "@skyrpex/tryuntil";
const options = {
	frequency: 50,  // Minimum time between calls
	maxTime: 0,     // Maximum time before failing
	maxAttempts: 0, // Maximum attempts before failing
	context: global // Context of the given callback
};
tryUntil(done => {
	if ("something" in global) {
		done(global.something);
	}
}, options);
```
