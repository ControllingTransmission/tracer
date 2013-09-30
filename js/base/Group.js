
Group = Thing.clone().newSlots({
	protoType: "Group",
	items: null
}).setSlots({
	init: function()
	{
		this._items = []
		this._object = new THREE.Object3D()
	},
	
	addItem: function(item)
	{
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
		this.updateItems()	
	},
	
	updateItems: function()
	{
		for (var i = 0; i < this._items.length; i++)
		{
			var item = this._items[i]
			item.update()
		}
	},
	
	setColor: function (c)
	{
		console.log("setting group color")
		this.items().forEach(function (item) { item.setColor(c) })
		return this
	}
	
})

