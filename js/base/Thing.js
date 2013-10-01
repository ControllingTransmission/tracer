

Thing = Proto.clone().newSlots({
	protoType: "Thing",
	open: false,
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
		Visual.scene().add(this._object)
		this._open = true
		return this
	},	
	
	close: function()
	{
		Visual.scene().remove(this._object)
		this._open = false
		return this
	},

	toggle: function()
	{
		if(this._open)
			this.close()
		else
			this.open()
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
	},
	
	setColor: function (c)
	{
		console.log("setting color")
		var mat = this.object().material
		mat.color = c
		mat.needsUpdate = true
		return this
	}
})

