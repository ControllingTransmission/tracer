
Movers = Mover.clone().newSlots({
	protoType: "Movers",
	movers: []
}).setSlots({
	add: function(m)
	{
		this.movers().append(m)
	}
})

// ------------------------------------------------------------------
	
BlackColorResetMover = Mover.clone().newSlots({
	protoType: "BlackColorResetMover",
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
		console.log("BlackColorResetMover")
		Mover.update.apply(this)
		var mat = this.object().material
		if (mat == null) { return }
		mat.color = new THREE.Color().setRGB(0, 0, 0)
		mat.needsUpdate = true
		this.thing().removeMover(this)
	}
})

Movers.add(BlackColorResetMover)

// ------------------------------------------------------------------
	
RedJitterColorMover = Mover.clone().newSlots({
	protoType: "RedJitterColorMover",
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
		if (mat == null) { return }
		var c = Math.random()
		mat.color = new THREE.Color().setRGB(c, 2, 2)
		mat.needsUpdate = true
		//this._t ++	
	}
})

Movers.add(RedJitterColorMover)
	
// ------------------------------------------------------------------
	
BlueJitterColorMover = Mover.clone().newSlots({
	protoType: "BlueJitterColorMover",
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
		if (mat == null) { return }
		var c = Math.random()
		mat.color = new THREE.Color().setRGB(0, 0, c)
		mat.needsUpdate = true
		//this._t ++	
	}
})

Movers.add(BlueJitterColorMover)

// ------------------------------------------------------------------

	
WhiteJitterColorMover = Mover.clone().newSlots({
	protoType: "WhiteJitterColorMover",
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
		if (mat == null) { return }
		var c = Math.random()
		mat.color = new THREE.Color().setRGB(c, c, c)
		mat.needsUpdate = true
		//this._t ++	
	}
})

Movers.add(WhiteJitterColorMover)

// ------------------------------------------------------------------

LeapMotionBackgroundGreyMover = Mover.clone().newSlots({
	protoType: "LeapMotionBackgroundGreyMover",
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
		var hand = LeapMotion._hands[0]
		if(typeof hand == "undefined") return
		var x = hand.palmPosition[0];
		var y = hand.palmPosition[1];
		var z = hand.palmPosition[2];

		var hue = 0;
		var saturation = 0;
		var lightness = Math.round(z/2);

		document.body.style.background = "hsl(" + hue + "," + saturation + "%," + lightness + "%)";
		//this._t ++	
	}
})

Movers.add(LeapMotionBackgroundGreyMover)

// ------------------------------------------------------------------

LeapMotionBackgroundHueMover = Mover.clone().newSlots({
	protoType: "LeapMotionBackgroundHueMover",
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
		var hand = LeapMotion._hands[0]
		if(typeof hand == "undefined") return
		var x = hand.palmPosition[0];
		var y = hand.palmPosition[1];
		var z = hand.palmPosition[2];

		var hue = Math.round(x) % 360;
		var saturation = Math.round(y/3);
		var lightness = Math.round(z/2);

		document.body.style.background = "hsl(" + hue + "," + saturation + "%," + lightness + "%)";
		//this._t ++	
	}
})

Movers.add(LeapMotionBackgroundHueMover)

// ------------------------------------------------------------------

XInterleveMover = Mover.clone().newSlots({
	protoType: "XInterleveMover",
	speed: 10,
}).setSlots({
	update: function() 
	{	
		var direction = this.thing().groupX() % 2 == 0 ? 1 : -1
		this.object().position.y += direction * this.speed()
		this._t ++	
		this.wrapBounds()
	}
})

Movers.add(XInterleveMover)

YInterleveMover = Mover.clone().newSlots({
	protoType: "YInterleveMover",
	speed: 10,
}).setSlots({
	update: function() 
	{	
		var direction = this.thing().groupY() % 2 == 0 ? 1 : -1
		this.object().position.x += direction * this.speed()
		this._t ++	
		this.wrapBounds()
	}
})

Movers.add(YInterleveMover)

// ------------------------------------------------------------------

/*
JitterMover = Mover.clone().newSlots({
	protoType: "JitterMover",
	amplitude: 3
}).setSlots({
	
	update: function() 
	{	
		if (this._t < 10)
		{
			this.object().position.x = this.thing().groupPos().x + (Math.random() - .5) * this.amplitude()
			this.object().position.y = this.thing().groupPos().y + (Math.random() - .5) * this.amplitude()
			this.object().position.z = this.thing().groupPos().y + (Math.random() - .5) * this.amplitude()
		}
		this._t ++	
	}
})

Movers.add(JitterMover)
*/

// ------------------------------------------------------------------

/*
XRotateMover = Mover.clone().newSlots({
	protoType: "XRotateMover",
	period: 100
}).setSlots({
	update: function(dt) 
	{	
		this.object().rotation.x += dt/this.period()
		this._t ++	
	}
})

Movers.add(XRotateMover)


YRotateMover = Mover.clone().newSlots({
	protoType: "XRotateMover",
	period: 100
}).setSlots({
	update: function(dt) 
	{	
		this.object().rotation.y += dt/this.period()
		this._t ++	
	}
})

Movers.add(YRotateMover)
*/

ZRotateMover = Mover.clone().newSlots({
	protoType: "XRotateMover",
	period: 100
}).setSlots({
	prepareToStop: function()
	{
		this.object().rotation.z = 0;
		return this
	},

	update: function(dt) 
	{	
		this.object().rotation.z += dt/this.period()
		this._t ++	
	}
})

Movers.add(ZRotateMover)

// ------------------------------------------------------------------

WaveMover = Mover.clone().newSlots({
	protoType: "WaveMover",
	amplitude: 200,
	period: 100
}).setSlots({
	update: function() 
	{	
		var x = this.object().position.x
		var y = this.object().position.y
		var r = Math.sqrt(x*x + y*y)
		var tt = r + Math.PI*this._t/this._period
		this.object().position.z = Math.sin(tt) * this._amplitude
		this._t ++	
	}
})

Movers.add(WaveMover)

// ------------------------------------------------------------------

ZoomOutMover = Mover.clone().newSlots({
	protoType: "ZoomOutMover",
	dz: 1
}).setSlots({
	update: function(dt) 
	{	
/*		
		console.log("this._t: " + this._t + " " + this.object().position.z )
		this.object().position.z = this.thing().groupPos().z + this._t
		this._t ++	
*/
		this.object().position.z += this.dz()*10
		this.wrapBounds()
	}
})


Movers.add(ZoomOutMover)
Movers.add(ZoomOutMover.clone().setDz(-1))

// ------------------------------------------------------------------



XScaleMover = Mover.clone().newSlots({
	protoType: "XScaleMover",
	dz: .001
}).setSlots({
	update: function(dt) 
	{	
		this.object().scale.x += this.dz()*10
		
		if (this.object().scale.x > 2 || this.object().scale.x < .01)
		{
			this.setDz(-this.dz())
		}
		this.wrapBounds()
	}
})

Movers.add(XScaleMover)



YScaleMover = Mover.clone().newSlots({
	protoType: "YScaleMover",
	dz: .001
}).setSlots({
	update: function(dt) 
	{	
		this.object().scale.y += this.dz()*10
		
		if (this.object().scale.y > 1.5 || this.object().scale.y < .01)
		{
			this.setDz(-this.dz())
		}
		this.wrapBounds()
	}
})

Movers.add(YScaleMover)

// ------------------------------------------------------------------

WobblyShaderMover = Mover.clone().newSlots({
	protoType: "WobblyShaderMover",
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
		this._object._uniforms.delta.value += 0.1;
		mat.needsUpdate = true
		//this._t ++	
	}
})

Movers.add(WobblyShaderMover)
