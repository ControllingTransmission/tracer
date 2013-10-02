
BackgroundGroup = Group.clone().newSlots({
	protoType: "BackgroundGroup",
	items: null,

}).setSlots({
	init: function()
	{
		Group.init.apply(this)
	},
	
	keydown: function(e)
	{
		console.log("Background keydown '" + e.key + "' ", e.keyCode)
		
		// color
		
		if (e.key == "Z")
		{
			this.setColor(GrayColor(0))
		}
		
		if (e.key == "X")
		{
			this.setColor(GrayColor(.25))
		}
		
		if (e.key == "C")
		{
			this.setColor(GrayColor(.5))
		}
		
		if (e.key == "V")
		{
			this.setColor(GrayColor(.75))
		}
		
		if (e.key == "B")
		{
			this.setColor(GrayColor(1))
		}	
	},
	
	keyup: function()
	{
	},
	
	setColor: function(c)
	{
		var s = "rgb(" + Math.floor(c.r*255) + ", " + Math.floor(c.g*255) + ", " + Math.floor(c.b*255) + ")"
		console.log(this.protoType() + " set " + s)
		document.body.style.backgroundColor = s
		return this
	}
})

