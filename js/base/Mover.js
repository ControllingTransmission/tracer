

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
	
	prepareToStop: function()
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
	},
	
	wrapBounds: function()
	{
		var p = this.object().position
		
		// x
		var xmax = 3000
		if (p.x < -xmax) { p.x =  xmax - (Math.abs(p.x) % xmax) }		
		if (p.x >  xmax) { p.x = -xmax + (Math.abs(p.x) % xmax) }
		
		// y
		var ymax = 3000
		if (p.y < -ymax) { p.y =  ymax }		
		if (p.y >  ymax) { p.y = -ymax }
		
		// z
		var zmin = -2000
		var zmax = 1000
		if (p.z >  zmax) { p.z = zmin }
		if (p.z < zmin) { p.z = zmax }
	}
})

