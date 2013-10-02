
GrayColor = function(v)
{
	if (v >= 1) { v = 10 }
	//console.log("v " + v)
	//return new THREE.Color().setRGB(v*255, v*255, v*255)
	return new THREE.Color().setRGB(v, v, v)
}

Group = Thing.clone().newSlots({
	protoType: "Group",
	items: null,
	isPaused: false,
	rate: 1
}).setSlots({
	init: function()
	{
		this._items = []
		this._object = new THREE.Object3D()
	},
	
	addItem: function(item)
	{
		item.setGroupPosToCurrent()
		this._items.push(item)
		this._object.add(item.object())
	},
	
	removeItem: function(item)
	{
		this._items.remove(item)
		this._object.remove(item.object())
	},

	update: function() 
	{	
		//Thing.update.apply(this)
		if (!this.isPaused()) 
		{
			this.updateItems()	
		}
	},
	
	updateItems: function()
	{
		for (var i = 0; i < this._items.length; i++)
		{
			var item = this._items[i]
			item.update(this.rate())
		}
	},
	
	setColor: function (c)
	{
		console.log("setting group color")
		this.items().forEach(function (item) { item.setColor(c) })
		return this
	},
	
	toggleIsPaused: function()
	{
		this.setIsPaused(!this.isPaused())
	},
	
	moverKeyMap: function()
	{
		if (this._moverKeyMap == null) 
		{
		
			var moverKeysArray = [	
				"Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
				"A", "S", "D", "F", "G", "H", "J", "K", "L"
			]
				
			var movers = Movers.movers()
			this._moverKeyMap = {}
			for (var i = 0; i < moverKeysArray.length; i++)
			{
				var k = moverKeysArray[i]
				var mover = Movers.movers()[i]
				this._moverKeyMap[k] = mover
			}
		}
		
		return this._moverKeyMap;
	},
	
	keydown: function(e)
	{
		console.log(this.protoType() + " keydown '" + e.key + "' ", e.keyCode)
		
		if (e.key == "P")
		{
			this.setIsPaused(true)
			return
		}
		
		if (e.key == "[")
		{
			this.setRate(this.rate()/2)
			console.log("rate: ", this.rate())
			return
		}
		
		if (e.key == "]")
		{
			this.setRate(this.rate()*2)
			console.log("rate: ", this.rate())
			return
		}
		
		// color
		var colorKeys = {
			"Z": GrayColor(0), 
			"X": GrayColor(.33), 
			"C": GrayColor(.66), 
			"V": GrayColor(1), 
			"B": GrayColor(0), 
			"N": new THREE.Color().setRGB(255, 0, 0), 
			"M": new THREE.Color().setRGB(0, 0, 255)
		}
		
		var color = colorKeys[e.key]
		
		if (color)
		{
			this.setColor(color)
			return
		}
		
		// alpha
		
		if (e.key == ",")
		{
			this.items().forEach(function (item) { item.increaseAlpha() })
			return
		}
		
		if (e.key == ".")
		{
			this.items().forEach(function (item) { item.decreaseAlpha() })
			return
		}
		
		// wireframe

		if (e.key == "-")
		{
			console.log("toggle wireframe")
			this.items().forEach(function (item) { item.toggleWireframe() })
			return
		}		
		
		var moverProto = this.moverKeyMap()[e.key]
		
		if (moverProto)
		{
			this.setItemMover(e.key, moverProto.clone().prepareToMove())
			return
		}
				
	},
	
	setItemMover: function(name, m)
	{
		console.log("setItemMover " + m.protoType())
		this.items().forEach(function (item) { item.setMover(name, m.clone()) })
	},
	
	keyup: function(e)
	{
		//console.log(this.protoType() + " keyup ", e.key)
		if (e.key == "P")
		{
			this.setIsPaused(false)
		}
	},
	
})

