InterfaceUtil
=========


### Description
When you want to create sets of javascript classes with common interface, you can use interfaceUtil to define the required methods and params

eg: you need to write a storageFactory, with 2 adapters sessionStorage, localStorage
both needs method

- get(key)
- set(key,val)
- delete(key)

InterfaceUtil will make sure you have these methods and params for each of the adapter


### How to use

	// define interface
	// =============================
	var interfaceMethods = {
    	 'get'   : 'key'
	   , 'set'   : 'key,val'
	   , 'trash' : 'key'
	   , 'flush' : ''
	}

	// create the interaceClass
	// =============================
	// with the previous interface
	var interface = interfaceUtil(interfaceMethods)
	
	// create your adapters
	// =============================
	
	// constructor
	var strategyA = function() {
		this.storeOne = {}
	}
	strategyA.prototype.get = function get(key){
		if (key) return this.storeOne[key]
		
		// else return all
		return this.storeOne
	}
	strategyA.prototype.set = function set(key,val){}
	strategyA.prototype.trash = function set(key){}
	strategyA.prototype.flush = function set(key){}
	
	// constructor
        var someFn = new someFn()
        var adapterB = function() {
            this.default = 1
        }
	adapterB.prototype.get = someFn.get
	adapterB.prototype.set = someFn.set
	adapterB.prototype.trash = someFn.remove
        adapterB.prototype.flush = function flush(key){
            var _this = this
            someFn.set(_this.default)
        }

        // implement the interface to the adapters
	// =============================
	
	// when user creating factories, they can override defaults settings
	var configs = {
		expres : 30 * ( 24 * 60 * 1000 )
	}

	var UserSession = interface(adapterA, configs)
	var UserPersist = interface(adapterB, configs)
	
	
