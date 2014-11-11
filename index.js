/**
 * @name createFunctionWithInterface
 *
 * @param {Object} requiredMethods
 * @returns {Function} CreateClass
 *
 * @description
 * create a new curry function, it compares
 * adapter.prototype methods to required interfaceMethods
 * if it contains all methods than create, otherwise throw error
 *
 * @example
 * // define interface
 * var interfaceMethods = {
 *      'get'   : 'key'
 *    , 'set'   : 'key,val'
 *    , 'trash' : 'key'
 *    , 'flush' : ''
 * }
 *
 * // create a new function and compare adapter.prototype methods to required interfaceMethods
 * var newCurryFunction = createFunctionWithInterface(interfaceMethods)
 * 
 * // add adapters
 * var myFunc = newCurryFunction(adapter, configs)
 */
module.exports = function createFunctionWithInterface(requiredMethods) {

    /**
     * @name    _checkImplementation
     * @access  Private
     * @param   {Function} adapterFn a class constructor function with prototype methods
     * @param   {Object} requiredMethods
     * @returns {void}
     *
     * @description
     * Check a function's prototype methods and compare it with required required interface methods
     * check every method has required params
     *
     * @example
     * var requiredMethods = 
     *      'get'   : 'key'
     *    , 'set'   : 'key,val'  // multiple params are seperated with comma with no spacing
     *    , 'trash' : 'key'
     *    , 'flush' : ''         // use empty strings if no params requried
     * }
     *
     */
    function _checkImplementation(adapterFn, requiredMethods) {

        // if no required methods
        if (!requiredMethods) return

        var missingMethods = []
          , missingParams = []

        for (var key in requiredMethods) {
            // if does not have method
            if (!adapterFn.prototype[key]) {
                missingMethods.push(key)
            }

            // if does not have param
            if ( (requiredMethods[key] !== '') && (_getParams(adapterFn.prototype[key]) !== requiredMethods[key]) ){
                missingParams.push({
                    key    : key
                  , params : requiredMethods[key]
                })
            }

        }

        if ( missingMethods.length ) {
            throw new Error("Interface implemtation - Missing methods: " + missingMethods.toString())
        }
        if ( missingParams.length ) {
            missingParams.forEach(function(missing){
                throw new Error("Interface implemtation - "+ missing.key +" Missing params: (" + missing.params +")")
            })
        }
        return
    }

    /**
     *  @name _getParams
     *  @access Private
     *  @param {Function} method the method of th adapter
     *  @returns {Array}
     *  @description
     *  Get all paramerter of a function
     */
    function _getParams(method) {
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var ARGUMENT_NAMES = /([^\s,]+)/g;
        var fnStr = method.toString().replace(STRIP_COMMENTS, '')
        var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES)
        if(result === null)
            result = []
        return result.toString()
    }

    /**
     * @name createClass
     * @access Public
     * @param {Function} adapter
     * @param {Object} configs
     *
     * @returns {Function} curry function
     *  - @method {Function} adapter
     *  - @method {Object} configs
     *
     */
    return function createClass(adapter, configs) {

        // check if any method is missing from the adapter
        _checkImplementation(adapter, requiredMethods)

        // if not we create a new function
        function fn() {
            // default
            adapter.call(this)

            // assign configuration to instance
            for (var i in configs) {
                this[i] = configs[i]
            }

        }

        // attach prototypes
        fn.prototype = adapter.prototype 

        // return a new instance of created function
        return new fn()
    }
}

