# rand-port

Find a random available registered port on localhost

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

```javascript
import { randPort } from 'rand-port';

const port1 = await randPort();       // [1024, 49151]
const port2 = await randPort(8000);   // [8000, 8999]
```
