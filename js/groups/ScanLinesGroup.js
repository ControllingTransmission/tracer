
ScanLinesGroup = Group.clone().newSlots({
	protoType: "ScanLinesGroup",
	items: null,
	spacing: 27,
	itemXScale: 1000,
	itemYScale: .05,
	max: 50
}).setSlots({
	init: function()
	{
		Group.init.apply(this)
		//this.addMover(MaxMover.clone())
		this.addSquares()
	},
	
	addSquares: function()
	{
		var max = this._max
		for (var y = -max; y < max-1; y ++)
		{
			var s = Square.clone()
			s._object.scale.x = this._itemXScale
			s._object.scale.y = this._itemYScale
			s._object.position.y += y*this._spacing
			s.setGroupY(y)
			this.addItem(s)
		}
	}
})

