
SquaresGroup = Group.clone().newSlots({
	protoType: "SquaresGroup",
	items: null,
	spacing: 500,
	itemXScale: 1,
	itemYScale: 1,
	max: 5
}).setSlots({
	init: function()
	{
		Group.init.apply(this)
		this.addMover(MaxMover.clone())
		this.addMover(WaveMover.clone())
		this.addSquares()
	},
	
	addSquares: function()
	{
		var max = this._max
		for (var x = -max; x < max-1; x ++)
		{
			for (var y = -max; y < max-1; y ++)
			{
				var s = Square.clone()
				s._object.scale.x = this._itemXScale
				s._object.scale.y = this._itemYScale
				s.addMover(MaxMover.clone())
				s.addMover(XWaveMover.clone())
				s._object.position.x += x*this._spacing
				s._object.position.y += y*this._spacing
				this.addItem(s)
			}
		}
	}
})

