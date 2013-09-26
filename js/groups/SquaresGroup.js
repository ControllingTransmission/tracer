
SquaresGroup = Group.clone().newSlots({
	protoType: "SquaresGroup",
	items: null
}).setSlots({
	init: function()
	{
		Group.init.apply(this)
		//this.addMover(MaxMover.clone())
		this.addSquares()
	},
	
	addSquares: function()
	{
		var max = 5
		var spacing = 590
		for (var x = -max; x < max-1; x ++)
		{
			for (var y = -max; y < max-1; y ++)
			{
				var s = Square.clone()
				s.addMover(MaxMover.clone())
				s.addMover(WaveMover.clone())
				s._object.position.x += x*spacing
				s._object.position.y += y*spacing
				this.addItem(s)
			}
		}
	}
})

