
ColorMover = Mover.clone().newSlots({
	protoType: "ColorMover",
}).setSlots({
	init: function()
	{
		Mover.init.apply(this)
	},
	
	object: function()
	{
		return this._thing._object
	},
	
	update: function() 
	{	
		Mover.update.apply(this)
		var mat = this.object().material
		var c = Math.random()
		mat.color = new THREE.Color().setRGB(0, 0, c)
		mat.needsUpdate = true
		//this._t ++	
	}
})

