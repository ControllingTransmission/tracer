

Mover = Proto.clone().newSlots({
	protoType: "Mover",
	thing: null,
	t: null,
	rate: 1
}).setSlots({
	init: function()
	{
	},
	
	prepareToMove: function()
	{
		return this
	},
	
	object: function()
	{
		return this._thing._object
	},
	
	update: function(dt) 
	{	
		this._t += dt*this._rate
	}
})

