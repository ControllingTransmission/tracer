

Thing = Proto.clone().newSlots({
	protoType: "Thing",
	object: null,
	movers: null,
	t: 0
}).setSlots({
	init: function()
	{
		this._movers = []
	},

	open: function()
	{
		scene.add(this._object)
		return this
	},	
	
	close: function()
	{
		scene.remove(this._object)
		return this
	},
	
	addMover: function(mover)
	{
		mover.setThing(this)
		this._movers.push(mover)
		return this
	},
	
	update: function() 
	{			
		this._movers.forEach(function (mover) { mover.update() })
	}
})

