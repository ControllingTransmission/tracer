
Group = Thing.clone().newSlots({
	protoType: "Group",
	items: null
}).setSlots({
	init: function()
	{
		var dt = .002
		this._rd = new THREE.Vector3(0, dt, dt)
		this._t = 0
		this._zd = 1
		this._nextShift = 3*60
		this._items = []
		this.setup()
	},
	
	setup: function()
	{
		this._object = new THREE.Object3D()
		this.addSquares()
	},
	
	addSquares: function()
	{
		var s = Square.clone()
		this.addItem(s)

		for (var x = -1; x < 2; x ++)
		{
			for (var y = -1; y < 2; y ++)
			{
				var s = Square.clone()
				s._object.position.x += x*550
				s._object.position.y += y*550
				this.addItem(s)
			}
		}
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
		//this._object.rotation.add(this._rd)
		this._object.position.x = 0
		this._object.position.y = 0
		this._object.position.z = 0

		this._t ++	
		this.updateItems()	
	},
	
	updateItems: function()
	{
		for (var i = 0; i < this._items.length; i++)
		{
			var item = this._items[i]
			item.update()
		}
	}
})

