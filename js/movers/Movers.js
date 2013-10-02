
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

Movers.add(ColorMover)

// ------------------------------------------------------------------

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

// ------------------------------------------------------------------


JitterMover = Mover.clone().newSlots({
	protoType: "JitterMover",
	amplitude: 3
}).setSlots({
	
	update: function() 
	{	
		this.object().position.x = this.thing().groupPos().x + (Math.random() - .5) * this.amplitude()
		this.object().position.y = this.thing().groupPos().y + (Math.random() - .5) * this.amplitude()
		this._t ++	
	}
})

Movers.add(JitterMover)

// ------------------------------------------------------------------

RotateMover = Mover.clone().newSlots({
	protoType: "RotateMover",
	period: 100
}).setSlots({
	update: function(dt) 
	{	
		//this.object().rotation.z += dt/this.period()
		this._t ++	
	}
})

Movers.add(RotateMover)


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


