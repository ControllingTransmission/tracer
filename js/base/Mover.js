

Mover = Proto.clone().newSlots({
	protoType: "Mover",
	thing: null,
	t: null,
	rate: 1
}).setSlots({
	init: function()
	{
	},
	
	object: function()
	{
		return this._thing._object
	},
	
	update: function() 
	{	
		this._t += this._rate
	}
})

