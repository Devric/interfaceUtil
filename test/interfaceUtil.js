var expect          = require('chai').expect
var createInterface = require('../index')

describe('createInterface', function() {
    it('should create a new function', function() {
        var createCacheClass = createInterface()
        expect(createCacheClass).to.be.a('function')
    })

    it('should create a new instance from adapter with some required methods', function() {
        var createCacheClass = createInterface({
            'get' : 'key'
          , 'set' : 'key,val'
        })

        function adapter() {}
        adapter.prototype.get = function(key) {}
        adapter.prototype.set = function(key,val) {}

        var cacheClass = createCacheClass(adapter, {})

        expect(cacheClass.get).to.be.a('function')
        expect(cacheClass.set).to.be.a('function')
    })

    it('should create a new instance with adapter default', function() {
        var createCacheClass = createInterface()
        function adapter() {
            this.cache = 1
        }

        var someClass = createCacheClass(adapter, {})

        expect(someClass).to.have.keys('cache')
        expect(someClass.cache).to.be.equal(1)
    });

    it('should create a new instance with adapter default override default', function() {
        var createCacheClass = createInterface()
        function adapter() {
            this.cache = 1
        }

        var someClass = createCacheClass(adapter, {
            cache : 2
          , key   : 1
        })

        expect(someClass).to.have.keys('cache','key')
        expect(someClass.cache).to.be.equal(2)
        expect(someClass.key).to.be.equal(1)
    });
})

