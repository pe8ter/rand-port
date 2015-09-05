var net = require('net')
var async = require('async')

var MIN = 1024
var MAX = 49151
var HARD_MIN = 1000
var HARD_MAX = 49999

/**
 * @param {Number} start
 * @param {Function} callback
 */

module.exports = function (start, callback) {

    var openRange = false

    // Patch parameters
    if (!callback) {
        openRange = true
        callback = start
        start = MIN
    }

    // Verify start
    start = parseInt(start)
    if (isNaN(start)) {
        throw Error('starting port is not a number')
    } else if (start < HARD_MIN || start > HARD_MAX) {
        throw Error('starting port is out of range')
    }

    // Verify callback
    if (typeof callback !== 'function') {
        throw Error('callback is not a function')
    }

    // Affix start to nearest lesser multiple of 1000
    start = 1000 * Math.floor(start/1000)

    // Lowest random number
    var low = start
    if (low < MIN) {
        low = MIN
    }

    // Highest random number
    var high = start + 1000
    if (high > MAX) {
        high = MAX + 1
    }

    // All ports are good
    if (openRange) {
        low = MIN
        high = MAX + 1
    }

    var diff = high - low
    var found = false
    var candidate

    async.doWhilst(_testRandomPort, _notFound, _finally)

    function _testRandomPort(done) {

        var socket = new net.Socket()

        // Connection refused: the candidate is an unused port so we're done
        socket.on('error', function (err) {
            found = true
            done()
        })

        // Connection accepted: the candidate is a used port so keep trying
        socket.on('end', function () {
            done()
        })

        // Open a connection on a random port.
        candidate = low + Math.floor(diff * Math.random())
        socket.connect(candidate, function () {
            socket.end()
        })
    }

    function _notFound() {
        return !found
    }

    function _finally(err) {
        if (err) {
            throw err
        } else {
            callback(candidate)
        }
    }
}
