# rand-port

Find a random available registered port on localhost

## Usage

Include the module:

```
var rp = require('rand-port')
```

At a minimum rand-port needs a callback. You'll get a random available registered port:

```
rp(function (port) {
    // port in range [1024, 49151]
})
```

Pass a multiple of 1000 as the first argument to get a random available port between it and the next multiple of 1000:

```
rp(3000, function (port) {
    // port in range [3000, 3999]
})
```

## Development

Clone the repository, install dependencies, and test:

```
git clone https://github.com/pe8ter/rand-port.git
npm install
npm test
```

The tests aren't perfect because of the module's random behavior. A test failure is always a sign that something's wrong, but the whole suite passing is not necessarily proof that everything is okay. It's a strong signal, just not as strong as I would like it to be.
