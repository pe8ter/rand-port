# rand-port

Find a random available registered port on localhost

## Important

rand-port requires a version of Node that supports generator functions and the `yield` keyword.

## Usage in ES5

```javascript
var randPort = require('rand-port').randPort;

randPort().then(function (port) {
    // port in range [1024, 49151]
});

randPort(3000).then(function (port) {
    // port in range [3000, 3999]
});
```

## Usage with experimental async/await

Until async/await officially becomes part of the ES standard, using rand-port this way requires a transpiler, like
TypeScript or Babel.

```javascript
import { randPort } from 'rand-port';

const port1 = await randPort();       // [1024, 49151]
const port2 = await randPort(8000);   // [8000, 8999]
```
