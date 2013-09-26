

Mover = Proto.clone().newSlots({
	protoType: "Mover",
	thing: null,
	t: null
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
		this._t ++	
	}
})

