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
	var interface = {
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
	var adapterA = function() {
		this.storeOne = {}
	}
	adapterA.prototype.get = function get(key){
		if (key) return this.storeOne[key]
		
		// else return all
		return this.storeOne
	}
	adapterA.prototype.set = function set(key,val){}
	adapterA.prototype.trash = function set(key){}
	adapterA.prototype.flush = function set(key){}
	
	// constructor
	var adapterB = function() {
		this.defaultThree = {}
		this.defaultTwo = {}
	}
	adapterB.prototype.get = function get(key){}
	adapterB.prototype.set = function set(key,val){}
	adapterB.prototype.trash = function set(key){}
	adapterB.prototype.flush = function set(key){}



	// create the factory
	// =============================
	
	// when user creating factories, they can override defaults settings
	var configs = {
		expres : 30 * ( 24 * 60 * 1000 )
	}

	var UserSession = interface(adapterA, configs)
	var UserPersist = interface(adapterB, configs)
	
	