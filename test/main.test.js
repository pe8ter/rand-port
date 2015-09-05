var test = require('tape')
var rp = require('../main')

function _floodTest(t, start, low, high) {

    t.plan(1)

    var i
    var N = 1000
    var count = 0

    if (start === null) {
        for (i = 0; i < N; ++i) {
            rp(function (port) {
                if (low <= port && port <= high) {
                    if (++count === N) {
                        t.pass('all ports in range')
                    }
                } else {
                    t.fail('port (' + port + ') out of range');
                }
            })
        }
    } else {
        for (i = 0; i < N; ++i) {
            rp(start, function (port) {
                if (low <= port && port <= high) {
                    if (++count === N) {
                        t.pass('all ports in range')
                    }
                } else {
                    t.fail('port (' + port + ') out of range');
                }
            })
        }
    }
}

test('correct range - no limit', function (t) {
    _floodTest(t, null, 1024, 49151)
})

test('correct range - low limit', function (t) {
    _floodTest(t, 1000, 1024, 1999)
})

test('correct range - mid limit', function (t) {
    _floodTest(t, 8000, 8000, 8999)
})

test('correct range - high limit', function (t) {
    _floodTest(t, 49000, 49000, 49151)
})

test('bad callback - one argument', function (t) {
    t.plan(1)
    t.throws(function () {
        rp()
    })
})

test('bad callback - two arguments', function (t) {
    t.plan(1)
    t.throws(function () {
        rp(1000)
    })
})

test('bad start - NaN', function (t) {
    t.plan(1)
    t.throws(function () {
        rp(null, function () {})
    })
})

test('bad start - out of range', function (t) {
    t.plan(1)
    t.throws(function () {
        rp(0, function () {})
    })
})
